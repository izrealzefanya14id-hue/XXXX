import { motion } from 'motion/react';
import { useApp } from '../context';
import { Play, Image as ImageIcon, Maximize2 } from 'lucide-react';

export default function Media() {
  const { lang, gallery } = useApp();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000" 
            alt="Media Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-gray-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            {lang === 'id' ? 'Galeri Media' : 'Media Gallery'}
          </motion.h1>
          <p className="text-xl text-emerald-400 font-bold uppercase tracking-[0.3em]">
            VISUAL CORPORATE JOURNEY
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {gallery.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="group relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 shadow-xl border-4 border-white outline outline-1 outline-gray-100 hover:outline-emerald-500/30 transition-all">
                  <img 
                    src={`https://picsum.photos/seed/aic-${i}/800/800`} 
                    alt="Gallery Placeholder" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-emerald-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 mb-4 scale-50 group-hover:scale-100 transition-transform">
                      <Maximize2 size={24} />
                    </div>
                    <h4 className="text-white font-black text-lg">Corporate Visual {i}</h4>
                    <p className="text-emerald-200 text-xs mt-2 uppercase tracking-widest">AIC Holding Activity</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {gallery.map((item) => (
                <motion.div 
                  key={item.id} 
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(16,185,129,0.15)" }}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-2xl border-8 border-gray-50 outline outline-1 outline-gray-100 hover:outline-emerald-500/30 transition-all"
                >
                  <img 
                    src={item.url} 
                    alt={item.title_id} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-emerald-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-10 text-center backdrop-blur-[2px]">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white mb-6 scale-50 group-hover:scale-100 transition-all duration-500 backdrop-blur-md">
                      {item.type === 'video' ? <Play size={32} /> : <Maximize2 size={32} />}
                    </div>
                    <h4 className="text-white font-black text-2xl leading-tight">{lang === 'id' ? item.title_id : item.title_en}</h4>
                    <p className="text-emerald-200 text-[10px] font-black uppercase tracking-[0.2em] mt-4">AIC Holding Activity</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
              {lang === 'id' ? 'VIDEO PROFIL' : 'COMPANY VIDEO'}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Watch Our Corporate Story</h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-8 border-white"
          >
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
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <h3 className="text-4xl font-black mb-2 tracking-tight">AIC Holding Corporate Profile</h3>
              <p className="text-gray-300 font-medium text-lg">Strategic Operations & Global Vision</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
