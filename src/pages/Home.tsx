import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context';
import { ArrowRight, Globe, Shield, Zap, Target, Play, ChevronLeft, ChevronRight, Maximize2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { lang, settings, businessLines, timeline, news, t, gallery, management } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "AIC HOLDING",
      subtitle: lang === 'id' ? "Electronic-Driven Holding Group Terkemuka" : "Leading Electronic-Driven Holding Group",
      desc: lang === 'id' ? "Menghubungkan sumber daya Indonesia ke pasar global dengan teknologi dan integritas." : "Connecting Indonesia's resources to the global market with technology and integrity.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
    },
    {
      title: "GLOBAL TRADE",
      subtitle: lang === 'id' ? "Ekspor Komoditas Strategis" : "Strategic Commodity Export",
      desc: lang === 'id' ? "Memperluas jangkauan produk unggulan Indonesia ke seluruh penjuru dunia." : "Expanding the reach of Indonesia's superior products to all corners of the world.",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000"
    },
    {
      title: "ENERGY SECTOR",
      subtitle: lang === 'id' ? "Masa Depan Energi & Gas" : "Future of Energy & Gas",
      desc: lang === 'id' ? "Penyediaan solusi energi berkelanjutan untuk mendukung industri nasional." : "Providing sustainable energy solutions to support national industry.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const highlights = [
    { icon: Shield, title: lang === 'id' ? 'Legalitas Kokoh' : 'Solid Legality', desc: t('legal') },
    { icon: Globe, title: lang === 'id' ? 'Jangkauan Global' : 'Global Reach', desc: lang === 'id' ? 'Akses pasar internasional strategis.' : 'Strategic international market access.' },
    { icon: Zap, title: lang === 'id' ? 'Berbasis Teknologi' : 'Technology Driven', desc: lang === 'id' ? 'Electronic-Driven Holding Group.' : 'Electronic-Driven Holding Group.' },
    { icon: Target, title: lang === 'id' ? 'Industri Strategis' : 'Strategic Industry', desc: lang === 'id' ? 'Fokus pada sektor energi dan komoditas.' : 'Focus on energy and commodity sectors.' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden bg-gray-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title} 
              className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/40 to-gray-950/90" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-8"
            >
              {t('tagline')}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter leading-tight"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-2xl md:text-4xl font-bold text-emerald-400 mb-8 tracking-tight"
            >
              {slides[currentSlide].subtitle}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              {slides[currentSlide].desc}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link to="/about" className="btn-primary">
                {lang === 'id' ? 'Jelajahi Perusahaan' : 'Explore Company'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                {lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-16 h-1 rounded-full transition-all duration-700 ${currentSlide === i ? 'bg-emerald-500 w-24' : 'bg-white/20'}`}
            />
          ))}
        </div>

        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all hidden md:flex backdrop-blur-sm"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all hidden md:flex backdrop-blur-sm"
        >
          <ChevronRight size={28} />
        </button>
      </section>

      {/* About Teaser */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                  alt="AIC Office" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 bg-emerald-600 text-white p-12 rounded-2xl shadow-2xl hidden md:block border-8 border-white">
                <div className="text-6xl font-black mb-2">20+</div>
                <div className="text-sm font-bold uppercase tracking-[0.2em] opacity-90 leading-tight">
                  {lang === 'id' ? 'TAHUN\nPENGALAMAN' : 'YEARS OF\nEXPERIENCE'}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                {lang === 'id' ? 'SIAPA KAMI' : 'WHO WE ARE'}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-[1.1]">
                {lang === 'id' ? 'Electronic-Driven Holding Group Terdepan' : 'Leading Electronic-Driven Holding Group'}
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
                {t('description')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {highlights.map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Highlights */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
              {lang === 'id' ? 'BISNIS KAMI' : 'OUR BUSINESS'}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              {lang === 'id' ? 'Lini Bisnis Strategis' : 'Strategic Business Lines'}
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              {lang === 'id' 
                ? 'Kami mengoperasikan berbagai unit bisnis yang terintegrasi untuk mendukung pertumbuhan ekonomi nasional dan global.' 
                : 'We operate various integrated business units to support national and global economic growth.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessLines.map((line, i) => {
              const IconComponent = (Icons as any)[line.icon] || Icons.Briefcase;
              return (
                <motion.div
                  key={line.id}
                  whileHover={{ y: -15, boxShadow: "0 20px 40px rgba(16,185,129,0.15)" }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 group flex flex-col h-full hover:border-emerald-500/30 transition-all duration-500 outline outline-1 outline-transparent hover:outline-emerald-500/10"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={line.image} 
                      alt={line.title_id} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <IconComponent size={28} />
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                      {lang === 'id' ? line.title_id : line.title_en}
                    </h3>
                    <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-6">
                      {line.pt_name}
                    </p>
                    <p className="text-gray-500 mb-10 line-clamp-3 leading-relaxed font-medium">
                      {lang === 'id' ? line.short_desc_id : line.short_desc_en}
                    </p>
                    <div className="mt-auto">
                      <Link 
                        to={`/business#${['trade', 'energy', 'logistics', 'industry'][i] || `business-${line.id}`}`} 
                        className="inline-flex items-center gap-3 text-sm font-black text-gray-900 hover:text-emerald-600 transition-all group/btn uppercase tracking-widest"
                      >
                        {lang === 'id' ? 'Selengkapnya' : 'Read More'}
                        <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                {lang === 'id' ? 'VIDEO PROFIL' : 'COMPANY VIDEO'}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-[1.1]">
                {lang === 'id' ? 'Menyaksikan Perjalanan AIC Holding' : 'Witnessing the AIC Holding Journey'}
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
                {lang === 'id' 
                  ? 'Video profil kami memberikan gambaran mendalam tentang visi, operasional, dan komitmen kami dalam membangun industri strategis di Indonesia.' 
                  : 'Our profile video provides an in-depth look at our vision, operations, and commitment to building strategic industries in Indonesia.'}
              </p>
              <Link to="/media" className="inline-flex items-center gap-4 text-emerald-600 font-black uppercase tracking-[0.2em] hover:gap-6 transition-all text-sm">
                {lang === 'id' ? 'Lihat Galeri Media' : 'View Media Gallery'}
                <ArrowRight size={24} />
              </Link>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-8 border-gray-50">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play size={40} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-400 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-400 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            {/* ... stats ... */}
            <div>
              <div className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">150+</div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                {lang === 'id' ? 'Pelanggan Internasional' : 'International Customers'}
              </div>
            </div>
            <div>
              <div className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">75+</div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                {lang === 'id' ? 'Akses Pasar Strategis' : 'Strategic Market Access'}
              </div>
            </div>
            <div>
              <div className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">4</div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                {lang === 'id' ? 'Lini Bisnis Utama' : 'Core Business Lines'}
              </div>
            </div>
            <div>
              <div className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">1</div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                {lang === 'id' ? 'Visi Holding Terintegrasi' : 'Integrated Holding Vision'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Preview */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
            <div className="max-w-2xl">
              <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                {lang === 'id' ? 'MANAJEMEN' : 'MANAGEMENT'}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                {lang === 'id' ? 'Dipimpin Oleh Para Ahli' : 'Led by Experts'}
              </h2>
            </div>
            <Link to="/management" className="px-10 py-5 bg-gray-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-3 uppercase tracking-widest text-sm">
              {lang === 'id' ? 'Lihat Semua' : 'View All'}
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {management.slice(0, 3).map((member) => (
              <motion.div 
                key={member.id} 
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl mb-8 border-8 border-gray-50">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-black text-xs uppercase tracking-[0.2em]">
                  {lang === 'id' ? member.position_id : member.position_en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
              {lang === 'id' ? 'GALERI MEDIA' : 'MEDIA GALLERY'}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Corporate Visual Showcase</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-xl group relative border-4 border-white"
              >
                <img 
                  src={`https://picsum.photos/seed/aic-gallery-${i}/800/800`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-emerald-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <Maximize2 className="text-white" size={40} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
            <div className="max-w-2xl">
              <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                {lang === 'id' ? 'BERITA TERBARU' : 'LATEST NEWS'}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                {lang === 'id' ? 'Update Dari AIC Holding' : 'Updates From AIC Holding'}
              </h2>
            </div>
            <Link to="/news" className="px-10 py-5 bg-gray-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-3 uppercase tracking-widest text-sm">
              {lang === 'id' ? 'Lihat Semua Berita' : 'View All News'}
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {news.slice(0, 3).map((article) => (
              <article key={article.id} className="group">
                <Link to={`/news/${article.slug}`} className="block relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl mb-8 border-4 border-gray-50">
                  <img 
                    src={article.thumbnail || 'https://images.unsplash.com/photo-1585829365234-781fcdcc481f?auto=format&fit=crop&q=80&w=800'} 
                    alt={article.title_id} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </Link>
                <div className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em] mb-4">{article.category}</div>
                <h3 className="text-2xl font-black text-gray-900 mb-5 leading-tight group-hover:text-emerald-600 transition-colors">
                  <Link to={`/news/${article.slug}`}>
                    {lang === 'id' ? article.title_id : article.title_en}
                  </Link>
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-8 font-medium leading-relaxed">
                  {lang === 'id' ? article.summary_id : article.summary_en}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-32 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200" 
            alt="Partnership" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-black mb-10 leading-[1.1] tracking-tight">
              {lang === 'id' ? 'Siap Berkolaborasi Dengan Kami?' : 'Ready to Collaborate With Us?'}
            </h2>
            <p className="text-2xl text-gray-400 mb-14 leading-relaxed font-medium">
              {lang === 'id' 
                ? 'Hubungi tim kami untuk mendiskusikan peluang kemitraan strategis dan solusi bisnis global.' 
                : 'Contact our team to discuss strategic partnership opportunities and global business solutions.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/contact" className="px-12 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xl transition-all flex items-center justify-center gap-4 shadow-2xl shadow-emerald-600/40 active:scale-95">
                {lang === 'id' ? 'Hubungi Tim Kami' : 'Contact Our Team'}
                <ArrowRight size={24} />
              </Link>
              <a 
                href={`https://wa.me/${settings?.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-12 py-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-black text-xl transition-all flex items-center justify-center gap-4 backdrop-blur-md active:scale-95"
              >
                <MessageCircle size={24} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
