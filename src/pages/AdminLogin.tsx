import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        // Token is now handled via HttpOnly cookie
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 outline outline-1 outline-white/5"
      >
        <div className="text-center mb-12">
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [3, 0, 3]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400/30"
          >
            <Lock size={40} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </motion.div>
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight drop-shadow-md">AIC CMS</h1>
          <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">CENTRAL MANAGEMENT SYSTEM</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-4 text-red-400 text-sm font-medium shadow-[0_0_20px_rgba(239,68,68,0.1)]"
          >
            <ShieldAlert size={20} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Access Identity</label>
            <div className="relative group">
              <input 
                required
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium shadow-inner group-hover:border-white/20"
                placeholder="Username"
              />
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors drop-shadow-[0_0_8px_rgba(16,185,129,0)] group-focus-within:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" size={24} />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Secure Key</label>
            <div className="relative group">
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium shadow-inner group-hover:border-white/20"
                placeholder="Password"
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors drop-shadow-[0_0_8px_rgba(16,185,129,0)] group-focus-within:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" size={24} />
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 text-white rounded-2xl font-black text-xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-4 active:scale-95 border border-emerald-400/20"
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Authorize Access
                <ShieldAlert size={24} className="animate-pulse" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest transition-all hover:tracking-[0.2em]"
          >
            ← Return to Portal
          </button>
        </div>
      </motion.div>
    </div>
  );
}
