import { motion } from 'motion/react';
import { useApp } from '../context';
import { Linkedin, Mail } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';

export default function Management() {
  const { lang, management } = useApp();

  const categories = [
    { id: 'Executive', label: lang === 'id' ? 'Kepemimpinan Utama' : 'Main Leadership' },
    { id: 'Strategy', label: lang === 'id' ? 'Tata Kelola & Strategi' : 'Governance & Strategy' },
    { id: 'Operations', label: lang === 'id' ? 'Komersial & Operasional' : 'Commercial & Operations' },
    { id: 'Legal', label: lang === 'id' ? 'Hukum & Kepatuhan' : 'Legal & Compliance' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] bg-gray-900 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000" 
            alt="Management Hero" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-gray-900/60 to-gray-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-[10vw] font-black text-white mb-8 tracking-tighter uppercase leading-[0.85]"
          >
            {lang === 'id' ? 'Manajemen\nKami' : 'Our\nManagement'}
          </motion.h1>
          <p className="text-xl text-emerald-400 font-black uppercase tracking-[0.5em]">
            LEADERSHIP & GOVERNANCE
          </p>
        </div>
      </section>

      {/* Management Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {categories.map((cat) => {
            const members = management.filter(m => m.category === cat.id);
            if (members.length === 0) return null;

            return (
              <div key={cat.id} className="mb-24 last:mb-0">
                <div className="flex items-center gap-6 mb-12">
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-widest">{cat.label}</h2>
                  <div className="flex-1 h-[1px] bg-gray-100" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                  {members.map((member) => (
                    <motion.div
                      key={member.id}
                      whileHover={{ y: -15, boxShadow: "0 20px 40px rgba(16,185,129,0.15)" }}
                      className="group"
                    >
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl mb-8 border-8 border-gray-50 outline outline-1 outline-gray-100 group-hover:outline-emerald-500/20 transition-all">
                        <img 
                          src={member.photo} 
                          alt={member.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-8 left-8 right-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 font-medium">
                            {lang === 'id' ? member.bio_id : member.bio_en}
                          </p>
                        </div>
                        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-4 group-hover:translate-y-0 duration-500">
                          <a href="#" className="w-12 h-12 rounded-xl bg-white text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-2xl">
                            <Linkedin size={20} />
                          </a>
                          <a href="#" className="w-12 h-12 rounded-xl bg-white text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-2xl">
                            <Mail size={20} />
                          </a>
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em]">
                        {lang === 'id' ? member.position_id : member.position_en}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-32 bg-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                {lang === 'id' ? 'TATA KELOLA' : 'GOVERNANCE'}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight">
                {lang === 'id' ? 'Komitmen Terhadap Integritas & Transparansi' : 'Commitment to Integrity & Transparency'}
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
                {lang === 'id' 
                  ? 'AIC Holding menerapkan standar tata kelola perusahaan yang ketat untuk memastikan setiap keputusan diambil dengan integritas tertinggi dan berorientasi pada nilai jangka panjang bagi seluruh pemangku kepentingan.'
                  : 'AIC Holding applies strict corporate governance standards to ensure every decision is made with the highest integrity and oriented toward long-term value for all stakeholders.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['Ethical Leadership', 'Strategic Oversight', 'Risk Management', 'Stakeholder Value'].map((item) => (
                  <div key={item} className="flex items-center gap-4 font-black text-gray-900 uppercase tracking-widest text-xs">
                    <div className="w-3 h-3 rounded-full bg-emerald-600 shadow-lg shadow-emerald-600/40" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-16 rounded-2xl shadow-2xl border border-gray-100 relative outline outline-1 outline-transparent hover:outline-emerald-500/10 transition-all"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-2xl outline outline-4 outline-white/20">
                <Icons.ShieldCheck size={64} />
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Corporate Integrity</h4>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  {lang === 'id' 
                    ? 'Kami percaya bahwa keberhasilan bisnis yang berkelanjutan hanya dapat dicapai melalui kepercayaan dan kepatuhan terhadap nilai-nilai etika.'
                    : 'We believe that sustainable business success can only be achieved through trust and adherence to ethical values.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
