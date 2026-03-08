-- AIC Holding Database Schema (MySQL Compatible)

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(255) PRIMARY KEY,
  `value` TEXT
);

-- Business Lines Table
CREATE TABLE IF NOT EXISTS business_lines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_id TEXT,
  title_en TEXT,
  pt_name TEXT,
  icon TEXT,
  short_desc_id TEXT,
  short_desc_en TEXT,
  long_desc_id TEXT,
  long_desc_en TEXT,
  image TEXT,
  sort_order INT DEFAULT 0
);

-- Management Table
CREATE TABLE IF NOT EXISTS management (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  position_id TEXT,
  position_en TEXT,
  category TEXT,
  bio_id TEXT,
  bio_en TEXT,
  photo TEXT,
  sort_order INT DEFAULT 0
);

-- News Table
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
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

-- Timeline Table
CREATE TABLE IF NOT EXISTS timeline (
  id INT AUTO_INCREMENT PRIMARY KEY,
  period TEXT,
  title_id TEXT,
  title_en TEXT,
  description_id TEXT,
  description_en TEXT,
  sort_order INT DEFAULT 0
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_id TEXT,
  title_en TEXT,
  type TEXT,
  url TEXT,
  sort_order INT DEFAULT 0
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password TEXT
);

-- Initial Data Seeding
INSERT IGNORE INTO settings (`key`, `value`) VALUES 
('company_name', 'AIC HOLDING'),
('company_full_name', 'AIC HOLDING (Anugerah Insan Cipta)'),
('tagline_id', 'MENGHUBUNGKAN SUMBER DAYA INDONESIA KE PASAR GLOBAL'),
('tagline_en', "CONNECTING INDONESIA'S RESOURCES TO GLOBAL MARKET"),
('description_id', 'AIC HOLDING (Anugerah Insan Cipta) bukan sekadar perusahaan induk; kami adalah Electronic-Driven Holding Group yang berdiri di garda depan industri strategis Indonesia.'),
('description_en', "AIC HOLDING (Anugerah Insan Cipta) is not just a holding company; we are an Electronic-Driven Holding Group standing at the forefront of Indonesia's strategic industries."),
('address', 'Central Business Office (AIC–CBO), Kalimantan Barat'),
('phone', '+62 813-6666-775'),
('whatsapp', '08136666775'),
('email', 'info@aicholding.com');

INSERT IGNORE INTO users (username, password) VALUES ('admin', 'admin123');
