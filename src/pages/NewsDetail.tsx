import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

export default function NewsDetail() {
  const { slug } = useParams();
  const { news, lang } = useApp();
  
  const article = news.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">404</h1>
          <p className="text-gray-500 mb-8">Article not found.</p>
          <Link to="/news" className="text-emerald-600 font-bold hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={18} /> Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden group">
        <img 
          src={article.thumbnail || 'https://images.unsplash.com/photo-1585829365234-781fcdcc481f?auto=format&fit=crop&q=80&w=2000'} 
          alt={article.title_id} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-full mb-6 shadow-[0_0_15px_rgba(16,185,129,0.5)] outline outline-1 outline-white/20">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                {lang === 'id' ? article.title_id : article.title_en}
              </h1>
              <div className="flex flex-wrap gap-6 text-gray-300 text-sm font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-emerald-500" />
                  {new Date(article.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-emerald-500" />
                  AIC Admin
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-img:rounded-3xl prose-a:text-emerald-600">
              <ReactMarkdown>
                {lang === 'id' ? article.content_id : article.content_en}
              </ReactMarkdown>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                  <Share2 size={20} />
                </button>
              </div>
              <Link to="/news" className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 hover:text-emerald-600 transition-colors">
                <ArrowLeft size={18} /> {lang === 'id' ? 'Kembali ke Berita' : 'Back to News'}
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-32 space-y-12">
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">
                  {lang === 'id' ? 'Berita Terkait' : 'Related News'}
                </h3>
                <div className="space-y-6">
                  {news.filter(a => a.id !== article.id).slice(0, 3).map(related => (
                    <Link key={related.id} to={`/news/${related.slug}`} className="group block">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <img src={related.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" loading="lazy" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {lang === 'id' ? related.title_id : related.title_en}
                          </h4>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 block">
                            {new Date(related.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-emerald-900 rounded-3xl text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20 outline outline-1 outline-white/10">
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-4 tracking-tight">Newsletter</h3>
                  <p className="text-sm text-emerald-200 mb-6 font-medium">Dapatkan update terbaru dari AIC Holding langsung di email Anda.</p>
                  <input 
                    type="email" 
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm mb-4 outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  />
                  <button className="w-full py-4 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg active:scale-95">
                    Subscribe Now
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/20 rounded-full -mr-12 -mt-12 blur-2xl" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
