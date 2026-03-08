import { Link } from 'react-router-dom';
import { useApp } from '../context';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { settings, lang, t } = useApp();

  const quickLinks = [
    { label: lang === 'id' ? 'Beranda' : 'Home', path: '/' },
    { label: lang === 'id' ? 'Tentang Kami' : 'About Us', path: '/about' },
    { label: lang === 'id' ? 'Bisnis Kami' : 'Our Business', path: '/business' },
    { label: lang === 'id' ? 'Manajemen' : 'Management', path: '/management' },
    { label: lang === 'id' ? 'Berita' : 'News', path: '/news' },
    { label: lang === 'id' ? 'Kontak' : 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-gray-950 text-white pt-32 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-emerald-600/20">AIC</div>
              <span className="font-black text-3xl tracking-tighter">AIC HOLDING</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              {t('description')}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 border border-white/5 hover:border-emerald-500">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-emerald-500">{lang === 'id' ? 'MENU CEPAT' : 'QUICK NAVIGATION'}</h4>
            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 font-bold hover:text-white hover:translate-x-2 transition-all inline-flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-emerald-500">{lang === 'id' ? 'KONTAK' : 'CONTACT'}</h4>
            <ul className="space-y-8">
              {[
                { icon: MapPin, value: settings?.address },
                { icon: Phone, value: settings?.phone },
                { icon: Mail, value: settings?.email },
                { icon: MessageCircle, value: `WhatsApp: ${settings?.whatsapp}` },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <span className="text-gray-400 text-sm font-medium leading-relaxed group-hover:text-gray-200 transition-colors">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Legal */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-emerald-500">{lang === 'id' ? 'LEGALITAS' : 'LEGALITY'}</h4>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium italic">
              {t('legal')}
            </p>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-black block mb-3">Central Business Office</span>
                <span className="text-sm text-gray-300 font-bold">AIC–CBO, Kalimantan Barat, Indonesia</span>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl group-hover:bg-emerald-600/20 transition-all duration-700" />
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-black uppercase tracking-widest text-gray-500">
          <p>© {new Date().getFullYear()} AIC HOLDING (Anugerah Insan Cipta). All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
