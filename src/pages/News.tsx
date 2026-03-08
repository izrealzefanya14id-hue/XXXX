import { motion } from 'motion/react';
import { useApp } from '../context';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { formatDate } from '../lib/utils';

export default function News() {
  const { lang, news } = useApp();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] bg-gray-900 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000" 
            alt="News Hero" 
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
            {lang === 'id' ? 'Berita &\nArtikel' : 'News &\nArticles'}
          </motion.h1>
          <p className="text-xl text-emerald-400 font-black uppercase tracking-[0.5em]">
            LATEST UPDATES FROM AIC HOLDING
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {['All', 'Corporate', 'Business', 'Energy', 'Global Trade'].map(cat => (
                <button key={cat} className="px-6 py-2 rounded-full bg-gray-100 text-gray-600 font-bold text-sm whitespace-nowrap hover:bg-emerald-600 hover:text-white transition-all">
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder={lang === 'id' ? 'Cari berita...' : 'Search news...'}
                className="w-full pl-12 pr-6 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <div className="text-gray-400 mb-4">No news articles found.</div>
              <p className="text-sm text-gray-500">Check back later for updates from AIC Holding.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {news.map((article) => (
                <motion.article
                  key={article.id}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100"
                >
                  <Link to={`/news/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={article.thumbnail || 'https://images.unsplash.com/photo-1585829365234-781fcdcc481f?auto=format&fit=crop&q=80&w=800'} 
                      alt={article.title_id} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {article.category}
                    </div>
                  </Link>
                  <div className="p-8">
                    <div className="flex items-center gap-6 text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-2"><Calendar size={14} className="text-emerald-600" /> {formatDate(article.created_at, lang)}</span>
                      <span className="flex items-center gap-2"><User size={14} className="text-emerald-600" /> AIC Admin</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                      <Link to={`/news/${article.slug}`}>
                        {lang === 'id' ? article.title_id : article.title_en}
                      </Link>
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8">
                      {lang === 'id' ? article.summary_id : article.summary_en}
                    </p>
                    <Link 
                      to={`/news/${article.slug}`} 
                      className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-emerald-600 transition-colors group/btn"
                    >
                      {lang === 'id' ? 'Baca Selengkapnya' : 'Read More'}
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
