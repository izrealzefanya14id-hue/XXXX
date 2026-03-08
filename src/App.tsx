import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Business from './pages/Business';
import Management from './pages/Management';
import Contact from './pages/Contact';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Media from './pages/Media';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import WhatsAppButton from './components/WhatsAppButton';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash && hash !== '#') {
      const id = hash.startsWith('#') ? hash.substring(1) : hash;
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/business" element={<PublicLayout><Business /></PublicLayout>} />
          <Route path="/management" element={<PublicLayout><Management /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
          <Route path="/news/:slug" element={<PublicLayout><NewsDetail /></PublicLayout>} />
          <Route path="/media" element={<PublicLayout><Media /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
