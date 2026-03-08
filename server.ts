import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import mysql from "mysql2/promise";
import fs from "fs";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'aic-holding-secret-key-2024';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database Abstraction
interface DB {
  query: (sql: string, params?: any[]) => Promise<any[]>;
  get: (sql: string, params?: any[]) => Promise<any>;
  run: (sql: string, params?: any[]) => Promise<{ lastID?: number; changes?: number }>;
  exec: (sql: string) => Promise<void>;
}

let db: DB;

const setupDatabase = async () => {
  const dbType = process.env.DB_TYPE || 'sqlite';

  if (dbType === 'mysql') {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'aicholding',
      port: parseInt(process.env.DB_PORT || '3306'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    db = {
      query: async (sql, params) => {
        const [rows] = await pool.execute(sql, params);
        return rows as any[];
      },
      get: async (sql, params) => {
        const [rows] = await pool.execute(sql, params);
        return (rows as any[])[0];
      },
      run: async (sql, params) => {
        const [result] = await pool.execute(sql, params);
        const res = result as any;
        return { lastID: res.insertId, changes: res.affectedRows };
      },
      exec: async (sql) => {
        // MySQL execute doesn't support multiple statements easily in one call without special config
        // But for initialization, we can split by semicolon if needed, or just run it.
        // For simplicity in this app, we'll assume the init script is handled.
        const statements = sql.split(';').filter(s => s.trim());
        for (const s of statements) {
          await pool.execute(s);
        }
      }
    };
  } else {
    const sqlite = new Database("database.sqlite");
    db = {
      query: async (sql, params) => sqlite.prepare(sql).all(params || []),
      get: async (sql, params) => sqlite.prepare(sql).get(params || []),
      run: async (sql, params) => {
        const res = sqlite.prepare(sql).run(params || []);
        return { lastID: res.lastInsertRowid as number, changes: res.changes };
      },
      exec: async (sql) => {
        sqlite.exec(sql);
      }
    };
  }

  // Initialize Tables
  const initSql = `
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(255) PRIMARY KEY,
      \`value\` TEXT
    );

    CREATE TABLE IF NOT EXISTS business_lines (
      id INTEGER PRIMARY KEY ${dbType === 'mysql' ? 'AUTO_INCREMENT' : 'AUTOINCREMENT'},
      title_id TEXT,
      title_en TEXT,
      pt_name TEXT,
      icon TEXT,
      short_desc_id TEXT,
      short_desc_en TEXT,
      long_desc_id TEXT,
      long_desc_en TEXT,
      image TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS management (
      id INTEGER PRIMARY KEY ${dbType === 'mysql' ? 'AUTO_INCREMENT' : 'AUTOINCREMENT'},
      name TEXT,
      position_id TEXT,
      position_en TEXT,
      category TEXT,
      bio_id TEXT,
      bio_en TEXT,
      photo TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY ${dbType === 'mysql' ? 'AUTO_INCREMENT' : 'AUTOINCREMENT'},
      title_id TEXT,
      title_en TEXT,
      slug VARCHAR(255) UNIQUE,
      category TEXT,
      summary_id TEXT,
      summary_en TEXT,
      content_id TEXT,
      content_en TEXT,
      thumbnail TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS timeline (
      id INTEGER PRIMARY KEY ${dbType === 'mysql' ? 'AUTO_INCREMENT' : 'AUTOINCREMENT'},
      period TEXT,
      title_id TEXT,
      title_en TEXT,
      description_id TEXT,
      description_en TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY ${dbType === 'mysql' ? 'AUTO_INCREMENT' : 'AUTOINCREMENT'},
      title_id TEXT,
      title_en TEXT,
      type TEXT,
      url TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY ${dbType === 'mysql' ? 'AUTO_INCREMENT' : 'AUTOINCREMENT'},
      name TEXT,
      company TEXT,
      email TEXT,
      phone TEXT,
      subject TEXT,
      message TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY ${dbType === 'mysql' ? 'AUTO_INCREMENT' : 'AUTOINCREMENT'},
      username VARCHAR(255) UNIQUE,
      password TEXT
    );
  `;

  await db.exec(initSql);

  // Seed initial data if empty
  const settingsCount = await db.get("SELECT COUNT(*) as count FROM settings");
  if (settingsCount.count === 0) {
    const initialSettings = [
      ['company_name', 'AIC HOLDING'],
      ['company_full_name', 'AIC HOLDING (Anugerah Insan Cipta)'],
      ['tagline_id', "MENGHUBUNGKAN SUMBER DAYA INDONESIA KE PASAR GLOBAL"],
      ['tagline_en', "CONNECTING INDONESIA'S RESOURCES TO GLOBAL MARKET"],
      ['description_id', 'AIC HOLDING (Anugerah Insan Cipta) bukan sekadar perusahaan induk; kami adalah Electronic-Driven Holding Group yang berdiri di garda depan industri strategis Indonesia.'],
      ['description_en', 'AIC HOLDING (Anugerah Insan Cipta) is not just a holding company; we are an Electronic-Driven Holding Group standing at the forefront of Indonesia\'s strategic industries.'],
      ['address', 'Central Business Office (AIC–CBO), Kalimantan Barat'],
      ['phone', '+62 813-6666-775'],
      ['whatsapp', '08136666775'],
      ['email', 'info@aicholding.com'],
      ['legal_id', 'SK Notaris No: 021/DSN/N/SKVI/2023'],
      ['legal_en', 'Notary Decree No: 021/DSN/N/SKVI/2023'],
      ['vision_id', 'Menjadi perusahaan induk global yang memimpin transformasi di sektor komoditas dan energi melalui sinergi strategis, inovasi berkelanjutan, dan integritas yang tidak tergoyahkan.'],
      ['vision_en', 'To be a global holding company leading transformation in the commodity and energy sectors through strategic synergy, sustainable innovation, and unwavering integrity.'],
    ];
    
    for (const [key, value] of initialSettings) {
      await db.run("INSERT INTO settings (\`key\`, \`value\`) VALUES (?, ?)", [key, value]);
    }

    // Seed Business Lines
    const businessLines = [
      ['GLOBAL TRADE & EXPORT', 'GLOBAL TRADE & EXPORT', 'PT. NASYINDO GOLDEN AGRI', 'Globe', 'Solusi perdagangan global dan ekspor komoditas.', 'Global trade and commodity export solutions.', 'Berfokus pada perdagangan global dan ekspor komoditas, dengan orientasi pasar nasional dan internasional serta penguatan akses pasar jangka panjang.', 'Focusing on global trade and commodity exports, with national and international market orientation and strengthening long-term market access.', 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800', 1],
      ['ENERGI OIL & GAS', 'ENERGY OIL & GAS', 'PT. PETROLEUM CAPSOIL PACIFIC', 'Fuel', 'Distribusi dan pengembangan bisnis energi, minyak, dan gas.', 'Distribution and development of energy, oil, and gas businesses.', 'Bergerak di sektor energi, minyak, dan gas untuk mendukung kebutuhan distribusi, operasional, dan pengembangan bisnis energi strategis.', 'Operating in the energy, oil, and gas sectors to support distribution, operational needs, and strategic energy business development.', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800', 2],
      ['SUPPLIER & LOGISTIK', 'SUPPLIER & LOGISTICS', 'PT. AMARCOM QATARIUM CAPSOIL', 'Truck', 'Layanan rantai pasok, distribusi, dan logistik.', 'Supply chain, distribution, and logistics services.', 'Melayani kebutuhan rantai pasok, distribusi, perdagangan domestik, serta dukungan logistik untuk memperkuat stabilitas dan efisiensi operasional.', 'Serving supply chain, distribution, domestic trade, and logistics support needs to strengthen operational stability and efficiency.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800', 3],
      ['KONTRAKTOR & INDUSTRI', 'CONTRACTOR & INDUSTRY', 'PT. ANUGERAH INSAN CIPTA', 'HardHat', 'Spesialisasi konstruksi, industri, dan proyek strategis.', 'Specializing in construction, industry, and strategic projects.', 'Berfokus pada konstruksi, pengembangan industri, dan proyek strategis yang mendukung pertumbuhan infrastruktur dan energi masa depan.', 'Focusing on construction, industrial development, and strategic projects that support future infrastructure and energy growth.', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', 4],
    ];
    for (const b of businessLines) {
      await db.run("INSERT INTO business_lines (title_id, title_en, pt_name, icon, short_desc_id, short_desc_en, long_desc_id, long_desc_en, image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", b);
    }

    // Seed Management
    const management = [
      ['Syarif Effendie Noor', 'Chairman & Chief Executive Officer', 'Chairman & Chief Executive Officer', 'Executive', 'Pendiri dan pemimpin utama AIC Holding, berpengalaman lebih dari dua dekade dalam industri konstruksi, komoditas, dan energi.', 'Founder and main leader of AIC Holding, with over two decades of experience in the construction, commodity, and energy industries.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400', 1],
      ['Syarif Axln Djoe Noor', 'Administrative Shareholder & Corporate Strategy', 'Administrative Shareholder & Corporate Strategy', 'Strategy', 'Bertanggung jawab atas pengendalian strategis dan administrasi pemegang saham.', 'Responsible for strategic control and shareholder administration.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', 2],
      ['Syarif Amar Coverfill Noor', 'Administrative Shareholder & Proxy', 'Administrative Shareholder & Proxy', 'Strategy', 'Mendukung tata kelola perusahaan dan representasi strategis.', 'Supporting corporate governance and strategic representation.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', 3],
      ['Fery Ferdinan', 'Legal Owner & Proxy', 'Legal Owner & Proxy', 'Legal', 'Mengawasi aspek legalitas dan kepatuhan perusahaan.', 'Overseeing legality and corporate compliance aspects.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 4],
      ['Mr. Oii Kick Lee', 'Commercial Management & International Documentation', 'Commercial Management & International Documentation', 'Operations', 'Ahli dalam manajemen komersial dan dokumentasi perdagangan internasional.', 'Expert in commercial management and international trade documentation.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', 5],
    ];
    for (const m of management) {
      await db.run("INSERT INTO management (name, position_id, position_en, category, bio_id, bio_en, photo, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", m);
    }

    // Seed Timeline
    const timeline = [
      ['2005 – 2010', 'Fondasi Keunggulan', 'The Foundation of Excellence', 'Fokus awal pada konstruksi infrastruktur, pekerjaan sipil, pembangunan jembatan, dan struktur baja.', 'Initial focus on infrastructure construction, civil works, bridge building, and steel structures.', 1],
      ['2010 – 2020', 'Ekspansi Pasar Global', 'Global Market Expansion', 'Ekspansi ke pasar internasional melalui ekspor komoditas kelapa sawit.', 'Expansion into international markets through palm oil commodity exports.', 2],
      ['2020 – 2023', 'Pertumbuhan Strategis & Diversifikasi', 'Strategic Growth & Diversification', 'Pendirian PT. AMARCOM QATARIUM CAPSOIL dan PT. NASYINDO GOLDEN AGRI.', 'Establishment of PT. AMARCOM QATARIUM CAPSOIL and PT. NASYINDO GOLDEN AGRI.', 3],
      ['2023 – Present', 'Konsolidasi & Energi Masa Depan', 'Consolidation & Future Energy', 'Konsolidasi seluruh unit bisnis di bawah AIC HOLDING dan berdirinya PT. PETROLEUM CAPSOIL PACIFIC.', 'Consolidation of all business units under AIC HOLDING and the establishment of PT. PETROLEUM CAPSOIL PACIFIC.', 4],
    ];
    for (const t of timeline) {
      await db.run("INSERT INTO timeline (period, title_id, title_en, description_id, description_en, sort_order) VALUES (?, ?, ?, ?, ?, ?)", t);
    }

    // Seed Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['admin', hashedPassword]);
  }
};

// Validation Schemas
const InquirySchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().max(100).optional(),
  email: z.string().email(),
  phone: z.string().min(5).max(20),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
});

const LoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

// Authentication Middleware
const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.cookies.admin_token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired session" });
    }
    (req as any).user = user;
    next();
  });
};

async function startServer() {
  await setupDatabase();
  
  const app = express();
  const PORT = 3000;

  // Trust proxy is required for express-rate-limit to work correctly behind nginx
  app.set('trust proxy', 1);

  // Security Middlewares
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for development with Vite
  }));
  
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: "Too many requests from this IP, please try again later." },
    validate: { xForwardedForHeader: false },
  });

  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/", apiLimiter);

  // API Routes
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await db.query("SELECT * FROM settings");
      const settingsMap = settings.reduce((acc: any, s: any) => {
        acc[s.key] = s.value;
        return acc;
      }, {});
      res.json(settingsMap);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const updates = req.body;
      for (const [key, value] of Object.entries(updates)) {
        // Use REPLACE for MySQL/SQLite compatibility for simple key-value
        await db.run("REPLACE INTO settings (\`key\`, \`value\`) VALUES (?, ?)", [key, value]);
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  app.get("/api/business-lines", async (req, res) => {
    try {
      const lines = await db.query("SELECT * FROM business_lines ORDER BY sort_order ASC");
      res.json(lines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch business lines" });
    }
  });

  app.get("/api/management", async (req, res) => {
    try {
      const members = await db.query("SELECT * FROM management ORDER BY sort_order ASC");
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch management" });
    }
  });

  app.get("/api/timeline", async (req, res) => {
    try {
      const items = await db.query("SELECT * FROM timeline ORDER BY sort_order ASC");
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch timeline" });
    }
  });

  app.get("/api/news", async (req, res) => {
    try {
      const articles = await db.query("SELECT * FROM news ORDER BY created_at DESC");
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:slug", async (req, res) => {
    try {
      const article = await db.get("SELECT * FROM news WHERE slug = ?", [req.params.slug]);
      if (article) {
        res.json(article);
      } else {
        res.status(404).json({ error: "Article not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.get("/api/gallery", async (req, res) => {
    try {
      const items = await db.query("SELECT * FROM gallery ORDER BY sort_order ASC");
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = InquirySchema.parse(req.body);
      const { name, company, email, phone, subject, message } = validatedData;
      
      await db.run(
        "INSERT INTO inquiries (name, company, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, company || '', email, phone, subject, message, 'new']
      );
      
      res.json({ success: true, message: "Inquiry submitted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.issues });
      }
      console.error(error);
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  app.get("/api/inquiries", authenticateToken, async (req, res) => {
    try {
      const list = await db.query("SELECT * FROM inquiries ORDER BY created_at DESC");
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = LoginSchema.parse(req.body);
      
      const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
      
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.cookie('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 8 * 60 * 60 * 1000 // 8 hours
      });

      res.json({ 
        success: true, 
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input data", details: error.issues });
      }
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/logout", (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true });
  });

  app.get("/api/auth/check", authenticateToken, (req, res) => {
    res.json({ success: true, user: (req as any).user });
  });

  app.post("/api/admin/update-credentials", authenticateToken, async (req, res) => {
    try {
      const { currentUsername, newUsername, currentPassword, newPassword } = req.body;
      
      // Verify current credentials
      const user = await db.get("SELECT * FROM users WHERE username = ?", [currentUsername]);
      
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid current credentials" });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid current credentials" });
      }

      // Update credentials
      const finalUsername = newUsername || currentUsername;
      const finalPassword = newPassword ? await bcrypt.hash(newPassword, 10) : user.password;

      await db.run("UPDATE users SET username = ?, password = ? WHERE id = ?", [finalUsername, finalPassword, user.id]);
      
      res.json({ success: true, message: "Credentials updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update credentials" });
    }
  });

  // Generic CRUD for CMS
  const entities = ['business_lines', 'management', 'news', 'timeline', 'gallery'];
  
  entities.forEach(entity => {
    // Create
    app.post(`/api/${entity}`, authenticateToken, async (req, res) => {
      try {
        const data = req.body;
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map(() => '?').join(', ');
        const sql = `INSERT INTO ${entity} (${keys.join(', ')}) VALUES (${placeholders})`;
        const result = await db.run(sql, values);
        res.json({ success: true, id: result.lastID });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Failed to create ${entity}` });
      }
    });

    // Update
    app.put(`/api/${entity}/:id`, authenticateToken, async (req, res) => {
      try {
        const data = req.body;
        const id = req.params.id;
        const keys = Object.keys(data);
        const values = Object.values(data);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const sql = `UPDATE ${entity} SET ${setClause} WHERE id = ?`;
        await db.run(sql, [...values, id]);
        res.json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Failed to update ${entity}` });
      }
    });

    // Delete
    app.delete(`/api/${entity}/:id`, authenticateToken, async (req, res) => {
      try {
        await db.run(`DELETE FROM ${entity} WHERE id = ?`, [req.params.id]);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: `Failed to delete from ${entity}` });
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
