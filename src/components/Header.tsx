import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context';
import { Menu, X, Globe, ChevronDown, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Header() {
  const { lang, setLang, settings, t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { label: lang === 'id' ? 'Beranda' : 'Home', path: '/' },
    {
      label: lang === 'id' ? 'Tentang Kami' : 'About Us',
      path: '/about',
      submenu: [
        { label: lang === 'id' ? 'Deskripsi AIC Holding' : 'AIC Holding Description', path: '/about#description' },
        { label: lang === 'id' ? 'Visi Misi & Nilai' : 'Vision Mission & Values', path: '/about#vision' },
        { label: lang === 'id' ? 'Sejarah' : 'History', path: '/about#history' },
      ]
    },
    {
      label: lang === 'id' ? 'Bisnis Kami' : 'Our Business',
      path: '/business',
      submenu: [
        { label: 'Global Trade & Export', path: '/business#trade' },
        { label: 'Energy Oil & Gas', path: '/business#energy' },
        { label: 'Supplier & Logistics', path: '/business#logistics' },
        { label: 'Contractor & Industry', path: '/business#industry' },
      ]
    },
    { label: lang === 'id' ? 'Manajemen' : 'Management', path: '/management' },
    { label: lang === 'id' ? 'Berita' : 'News', path: '/news' },
    { label: lang === 'id' ? 'Kontak' : 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-emerald-900 text-white py-2 px-4 hidden md:block border-b border-emerald-800/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-medium">
          <span>{t('tagline')}</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone size={12} className="text-emerald-400" /> {settings?.phone}</span>
            <span className="text-emerald-400/50">|</span>
            <span>{settings?.legal_id}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className={cn(
        "transition-all duration-500 px-4 md:px-8",
        isScrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-lg border-b border-gray-100" : "bg-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative w-12 h-12 md:w-14 md:h-14"
            >
              <img 
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200" 
                alt="AIC Logo" 
                className="w-full h-full object-contain drop-shadow-md"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className={cn("font-bold text-xl md:text-2xl tracking-tight leading-none", isScrolled ? "text-gray-900" : "text-white")}>
                AIC HOLDING
              </span>
              <span className={cn("text-[9px] md:text-[10px] font-semibold tracking-[0.15em] uppercase mt-1", isScrolled ? "text-emerald-600" : "text-emerald-400")}>
                Anugerah Insan Cipta
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={cn(
                    "text-[13px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 py-2",
                    isScrolled ? "text-gray-700 hover:text-emerald-600" : "text-white/90 hover:text-white"
                  )}
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>
                {item.submenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 min-w-[280px] overflow-hidden">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-8 py-3 text-sm font-semibold text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 ml-4 pl-10 border-l border-gray-200/20">
              <button
                onClick={() => setLang('id')}
                className={cn(
                  "text-[10px] font-black px-3 py-1.5 rounded-lg transition-all",
                  lang === 'id' 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                    : isScrolled ? "text-gray-400 hover:text-gray-900" : "text-white/50 hover:text-white"
                )}
              >
                ID
              </button>
              <button
                onClick={() => setLang('en')}
                className={cn(
                  "text-[10px] font-black px-3 py-1.5 rounded-lg transition-all",
                  lang === 'en' 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                    : isScrolled ? "text-gray-400 hover:text-gray-900" : "text-white/50 hover:text-white"
                )}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn("lg:hidden p-2 rounded-lg", isScrolled ? "text-gray-900" : "text-white")}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] lg:hidden overflow-y-auto"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">AIC</div>
                  <span className="font-bold text-xl text-gray-900">AIC HOLDING</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400"><X size={32} /></button>
              </div>

              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <div key={item.path} className="flex flex-col gap-4">
                    <Link
                      to={item.path}
                      className="text-2xl font-bold text-gray-900 hover:text-emerald-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div className="flex flex-col gap-3 pl-4 border-l-2 border-emerald-100">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className="text-lg text-gray-500 hover:text-emerald-600"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-12 border-t border-gray-100 flex justify-between items-center">
                <div className="flex gap-4">
                  <button
                    onClick={() => setLang('id')}
                    className={cn("px-4 py-2 rounded-lg font-bold", lang === 'id' ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600")}
                  >
                    INDONESIA
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={cn("px-4 py-2 rounded-lg font-bold", lang === 'en' ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600")}
                  >
                    ENGLISH
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
