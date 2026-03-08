import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Contact() {
  const { lang, settings } = useApp();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', company: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setFormState('error');
      }
    } catch (error) {
      setFormState('error');
    }
  };

  const subjects = [
    'General Inquiry',
    'Partnership',
    'Investor Relations',
    'Media & PR',
    'Vendor / Procurement',
    'Career / Recruitment'
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] bg-gray-900 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000" 
            alt="Contact Hero" 
            className="w-full h-full object-cover opacity-40 animate-slow-zoom"
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
            {lang === 'id' ? 'Hubungi\nKami' : 'Contact\nUs'}
          </motion.h1>
          <p className="text-xl text-emerald-400 font-black uppercase tracking-[0.5em]">
            GET IN TOUCH WITH OUR TEAM
          </p>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-6 block">
                {lang === 'id' ? 'INFORMASI KONTAK' : 'CONTACT INFORMATION'}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight">
                {lang === 'id' ? 'Kami Siap Mendengar Dari Anda' : 'We Are Ready to Hear From You'}
              </h2>
              <p className="text-xl text-gray-600 mb-16 leading-relaxed font-medium">
                {lang === 'id' 
                  ? 'Apakah Anda memiliki pertanyaan tentang layanan kami atau ingin menjajaki peluang kemitraan? Tim kami siap membantu Anda.'
                  : 'Do you have questions about our services or want to explore partnership opportunities? Our team is ready to assist you.'}
              </p>

              <div className="space-y-0 border-t border-gray-900">
                <div className="flex gap-8 group py-10 border-b border-gray-900">
                  <div className="w-16 h-16 bg-gray-900 rounded-none flex items-center justify-center text-white shrink-0 group-hover:bg-emerald-600 transition-all duration-300">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">{lang === 'id' ? 'Kantor Pusat' : 'Headquarters'}</h4>
                    <p className="text-xl font-black text-gray-900 leading-relaxed uppercase">{settings?.address}</p>
                  </div>
                </div>

                <div className="flex gap-8 group py-10 border-b border-gray-900">
                  <div className="w-16 h-16 bg-gray-900 rounded-none flex items-center justify-center text-white shrink-0 group-hover:bg-emerald-600 transition-all duration-300">
                    <Phone size={32} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">{lang === 'id' ? 'Telepon & WhatsApp' : 'Phone & WhatsApp'}</h4>
                    <p className="text-xl font-black text-gray-900 leading-relaxed">{settings?.phone}</p>
                    <a 
                      href={`https://wa.me/${settings?.whatsapp}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 font-black mt-4 inline-flex items-center gap-2 hover:gap-4 transition-all text-xs uppercase tracking-[0.2em]"
                    >
                      <MessageCircle size={18} /> Chat via WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex gap-8 group py-10 border-b border-gray-900">
                  <div className="w-16 h-16 bg-gray-900 rounded-none flex items-center justify-center text-white shrink-0 group-hover:bg-emerald-600 transition-all duration-300">
                    <Mail size={32} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">{lang === 'id' ? 'Email Resmi' : 'Official Email'}</h4>
                    <p className="text-xl font-black text-gray-900 leading-relaxed uppercase">{settings?.email}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-2xl shadow-2xl border border-gray-100 relative"
            >
              {formState === 'success' ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-10">
                    <CheckCircle2 size={56} />
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
                    {lang === 'id' ? 'Pesan Terkirim!' : 'Message Sent!'}
                  </h3>
                  <p className="text-xl text-gray-500 mb-12 font-medium">
                    {lang === 'id' 
                      ? 'Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.' 
                      : 'Thank you for contacting us. Our team will respond to your message shortly.'}
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="px-12 py-6 bg-emerald-600 text-white rounded-xl font-black text-xl shadow-2xl shadow-emerald-600/40 active:scale-95 transition-all"
                  >
                    {lang === 'id' ? 'Kirim Pesan Lain' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{lang === 'id' ? 'Nama Lengkap' : 'Full Name'}</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{lang === 'id' ? 'Perusahaan' : 'Company'}</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{lang === 'id' ? 'Nomor Telepon' : 'Phone Number'}</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="+62..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{lang === 'id' ? 'Subjek Inquiry' : 'Inquiry Subject'}</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                    >
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{lang === 'id' ? 'Pesan' : 'Message'}</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                      placeholder={lang === 'id' ? 'Tuliskan pesan Anda di sini...' : 'Write your message here...'}
                    />
                  </div>

                  <button 
                    disabled={formState === 'submitting'}
                    type="submit" 
                    className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-400 text-white rounded-xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20"
                  >
                    {formState === 'submitting' ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        {lang === 'id' ? 'Kirim Pesan' : 'Send Message'}
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[500px] bg-gray-100 relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8181!2d109.3333!3d-0.0263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDEnMzQuNyJTIDEwOcKwMTknNTkuOSJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
          className="w-full h-full border-0 grayscale"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-10 left-10 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 hidden md:block">
          <div className="font-black text-gray-900 mb-2">AIC Holding CBO</div>
          <div className="text-xs text-gray-500 max-w-[200px]">Central Business Office, Kalimantan Barat, Indonesia</div>
        </div>
      </section>
    </div>
  );
}
