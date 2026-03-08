import { motion } from 'motion/react';
import { useApp } from '../context';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';

export default function Business() {
  const { lang, businessLines } = useApp();

  const businessAnchors = ['trade', 'energy', 'logistics', 'industry'];

  const businessConfigs = [
    { 
      id: 'trade', 
      accent: 'from-blue-600 to-emerald-600', 
      bg: 'bg-blue-50/30',
      iconBg: 'bg-blue-600',
      tag: lang === 'id' ? 'GLOBAL CONNECTIVITY' : 'GLOBAL CONNECTIVITY'
    },
    { 
      id: 'energy', 
      accent: 'from-orange-600 to-red-600', 
      bg: 'bg-orange-50/30',
      iconBg: 'bg-orange-600',
      tag: lang === 'id' ? 'STRATEGIC ENERGY' : 'STRATEGIC ENERGY'
    },
    { 
      id: 'logistics', 
      accent: 'from-emerald-600 to-blue-600', 
      bg: 'bg-emerald-50/30',
      iconBg: 'bg-emerald-600',
      tag: lang === 'id' ? 'SUPPLY CHAIN' : 'SUPPLY CHAIN'
    },
    { 
      id: 'industry', 
      accent: 'from-slate-700 to-slate-900', 
      bg: 'bg-slate-100/50',
      iconBg: 'bg-slate-800',
      tag: lang === 'id' ? 'INDUSTRIAL POWER' : 'INDUSTRIAL POWER'
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-40 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=2000" 
            alt="Business Hero" 
            className="w-full h-full object-cover animate-slow-zoom"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/40 to-gray-950" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
          >
            {lang === 'id' ? 'Bisnis Kami' : 'Our Business'}
          </motion.h1>
          <p className="text-xl text-emerald-400 font-black uppercase tracking-[0.4em]">
            STRATEGIC BUSINESS ECOSYSTEM
          </p>
        </div>
      </section>

      {/* Business Sections */}
      <div className="space-y-0">
        {businessLines.map((line, i) => {
          const IconComponent = (Icons as any)[line.icon] || Icons.Briefcase;
          const config = businessConfigs[i] || businessConfigs[0];
          const anchor = businessAnchors[i] || `business-${line.id}`;

          return (
            <section key={line.id} id={anchor} className={cn("py-32 scroll-mt-20", config.bg)}>
              <div className="max-w-7xl mx-auto px-6">
                <div className={cn(
                  "flex flex-col lg:flex-row gap-24 items-center",
                  i % 2 !== 0 ? "lg:flex-row-reverse" : ""
                )}>
                  {/* Visual */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex-1 relative w-full"
                  >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white outline outline-1 outline-gray-100">
                      <img 
                        src={line.image} 
                        alt={line.title_id} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className={cn(
                      "absolute -top-10 -right-10 w-48 h-48 rounded-2xl flex flex-col items-center justify-center text-white shadow-2xl hidden md:flex p-6 text-center outline outline-4 outline-white/20",
                      config.iconBg
                    )}>
                      <IconComponent size={56} className="mb-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{config.tag}</span>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex-1"
                  >
                    <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                      {line.pt_name}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight">
                      {lang === 'id' ? line.title_id : line.title_en}
                    </h2>
                    <div className="text-gray-600 mb-12 max-w-none">
                      <p className="mb-8 leading-relaxed font-bold text-gray-900 text-xl border-l-4 border-emerald-500 pl-6">
                        {lang === 'id' ? line.short_desc_id : line.short_desc_en}
                      </p>
                      <p className="leading-relaxed text-lg font-medium text-gray-500">
                        {lang === 'id' ? line.long_desc_id : line.long_desc_en}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center gap-4 text-gray-800 font-bold group">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform", config.iconBg)}>
                            <CheckCircle2 size={18} />
                          </div>
                          <span className="text-sm uppercase tracking-widest">{lang === 'id' ? `Layanan Unggulan ${item}` : `Premium Service ${item}`}</span>
                        </div>
                      ))}
                    </div>

                    <button className={cn(
                      "px-12 py-6 text-white rounded-xl font-black text-lg transition-all flex items-center gap-4 group shadow-2xl active:scale-95 outline outline-1 outline-white/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
                      config.iconBg
                    )}>
                      {lang === 'id' ? 'Konsultasi Bisnis' : 'Business Consultation'}
                      <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Partnership CTA */}
      <section className="py-24 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            {lang === 'id' ? 'Bangun Masa Depan Bersama Kami' : 'Build the Future With Us'}
          </h2>
          <p className="text-xl text-emerald-200 mb-12 max-w-3xl mx-auto">
            {lang === 'id' 
              ? 'Kami selalu terbuka untuk kolaborasi strategis yang saling menguntungkan di seluruh lini bisnis kami.' 
              : 'We are always open to mutually beneficial strategic collaborations across all our business lines.'}
          </p>
          <div className="flex justify-center">
            <button className="px-12 py-6 bg-white text-emerald-900 rounded-2xl font-black text-xl hover:bg-emerald-100 transition-all shadow-2xl">
              {lang === 'id' ? 'Ajukan Kemitraan' : 'Apply for Partnership'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
