import { motion } from 'motion/react';
import { useApp } from '../context';
import { Target, Shield, Zap, Award, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function About() {
  const { lang, t, timeline, settings } = useApp();

  const missions = [
    { title: lang === 'id' ? 'Keunggulan Operasional' : 'Operational Excellence', desc: lang === 'id' ? 'Menjalankan standar tertinggi dalam setiap aspek operasional bisnis.' : 'Maintaining the highest standards in every aspect of business operations.' },
    { title: lang === 'id' ? 'Sinergi Grup Terintegrasi' : 'Integrated Group Synergy', desc: lang === 'id' ? 'Membangun kolaborasi kuat antar unit bisnis untuk nilai tambah maksimal.' : 'Building strong collaboration between business units for maximum added value.' },
    { title: lang === 'id' ? 'Tanggung Jawab & Keberlanjutan' : 'Responsibility & Sustainability', desc: lang === 'id' ? 'Berkomitmen pada praktik bisnis yang etis dan ramah lingkungan.' : 'Committed to ethical and environmentally friendly business practices.' },
    { title: lang === 'id' ? 'Kemitraan Strategis Global' : 'Global Strategic Partnership', desc: lang === 'id' ? 'Memperluas jaringan distribusi dan akses pasar internasional.' : 'Expanding distribution networks and international market access.' },
  ];

  const values = [
    { icon: Shield, title: 'Integrity', desc: lang === 'id' ? 'Kejujuran dan transparansi dalam setiap tindakan.' : 'Honesty and transparency in every action.' },
    { icon: Award, title: 'Professionalism', desc: lang === 'id' ? 'Dedikasi tinggi dan standar kualitas terbaik.' : 'High dedication and the best quality standards.' },
    { icon: Zap, title: 'Innovation', desc: lang === 'id' ? 'Terus beradaptasi dengan teknologi dan tren global.' : 'Continuously adapting to technology and global trends.' },
    { icon: Target, title: 'Synergy', desc: lang === 'id' ? 'Kekuatan dalam kolaborasi dan visi bersama.' : 'Strength in collaboration and shared vision.' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000" 
            alt="About Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 to-gray-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            {lang === 'id' ? 'Tentang Kami' : 'About Us'}
          </motion.h1>
          <p className="text-xl text-emerald-400 font-bold uppercase tracking-[0.3em]">
            AIC HOLDING (Anugerah Insan Cipta)
          </p>
        </div>
      </section>

      {/* Description */}
      <section id="description" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                {lang === 'id' ? 'PROFIL PERUSAHAAN' : 'COMPANY PROFILE'}
              </span>
              <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
                {lang === 'id' ? 'Menghubungkan Indonesia ke Panggung Dunia' : 'Connecting Indonesia to the World Stage'}
              </h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="mb-6 leading-relaxed">
                  {t('description')}
                </p>
                <p className="leading-relaxed">
                  {lang === 'id' 
                    ? 'Kami mengintegrasikan teknologi, sumber daya manusia unggul, dan jaringan distribusi yang presisi untuk menciptakan ekosistem bisnis yang dinamis dan kompetitif. Dengan kantor pusat di Kalimantan Barat, kami siap melayani kebutuhan pasar global dengan integritas tinggi.'
                    : 'We integrate technology, superior human resources, and precise distribution networks to create a dynamic and competitive business ecosystem. With our headquarters in West Kalimantan, we are ready to serve global market needs with high integrity.'}
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50 outline outline-1 outline-gray-100 group-hover:outline-emerald-500/20 transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Team" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div className="font-black text-gray-900">Certified Excellence</div>
                  <div className="text-xs text-gray-500">{settings?.legal_id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Vision */}
            <div className="bg-emerald-900 text-white p-12 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden outline outline-1 outline-white/10 shadow-emerald-500/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] -mr-32 -mt-32" />
              <div className="relative z-10">
                <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em] mb-6 block">
                  {lang === 'id' ? 'VISI KAMI' : 'OUR VISION'}
                </span>
                <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight italic drop-shadow-lg">
                  "{t('vision')}"
                </h3>
              </div>
            </div>

            {/* Mission */}
            <div>
              <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em] mb-6 block">
                {lang === 'id' ? 'MISI KAMI' : 'OUR MISSION'}
              </span>
              <div className="space-y-8">
                {missions.map((m, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{m.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">
              {lang === 'id' ? 'NILAI-NILAI KAMI' : 'OUR VALUES'}
            </span>
            <h2 className="text-4xl font-black text-gray-900">Core Values of AIC Holding</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="p-10 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group outline outline-1 outline-transparent hover:outline-emerald-500/20">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-lg mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors outline outline-1 outline-gray-100">
                  <v.icon size={32} />
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-4">{v.title}</h4>
                <p className="text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History / Timeline */}
      <section id="history" className="py-24 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em] mb-4 block">
              {lang === 'id' ? 'SEJARAH KAMI' : 'OUR HISTORY'}
            </span>
            <h2 className="text-4xl font-black">A Journey of Continuous Evolution</h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-emerald-500/30 hidden md:block" />

            <div className="space-y-20">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-12",
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="flex-1 text-center md:text-right">
                    {i % 2 === 0 ? (
                      <>
                        <div className="text-emerald-400 font-black text-2xl mb-2">{item.period}</div>
                        <h4 className="text-2xl font-bold mb-4">{lang === 'id' ? item.title_id : item.title_en}</h4>
                        <p className="text-gray-400 leading-relaxed">{lang === 'id' ? item.description_id : item.description_en}</p>
                      </>
                    ) : null}
                  </div>

                  <div className="relative z-10 w-12 h-12 rounded-full bg-emerald-600 border-4 border-gray-950 flex items-center justify-center font-black shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    {i + 1}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    {i % 2 !== 0 ? (
                      <>
                        <div className="text-emerald-400 font-black text-2xl mb-2">{item.period}</div>
                        <h4 className="text-2xl font-bold mb-4">{lang === 'id' ? item.title_id : item.title_en}</h4>
                        <p className="text-gray-400 leading-relaxed">{lang === 'id' ? item.description_id : item.description_en}</p>
                      </>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
