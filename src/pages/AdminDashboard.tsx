import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Settings as SettingsIcon, 
  Briefcase, 
  Users, 
  Clock, 
  Newspaper, 
  Image as ImageIcon, 
  Mail, 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  Edit3,
  Globe,
  CheckCircle2,
  XCircle,
  Phone,
  ArrowRight,
  X,
  Shield,
  Key,
  User,
  Lock
} from 'lucide-react';
import { useApp } from '../context';
import { cn } from '../lib/utils';
import { Inquiry } from '../types';

export default function AdminDashboard() {
  const { settings, businessLines, management, timeline, news, gallery, refreshData } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [editingSettings, setEditingSettings] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [securitySettings, setSecuritySettings] = useState({
    currentUsername: '',
    newUsername: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) {
          navigate('/admin/login');
        } else {
          fetchInquiries();
        }
      } catch (err) {
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    if (settings) setEditingSettings({ ...settings });
  }, [settings]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        setInquiries(await res.json());
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/admin/login');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const entityMap: any = {
      'business': 'business_lines',
      'management': 'management',
      'timeline': 'timeline',
      'news': 'news',
      'gallery': 'gallery'
    };

    try {
      const res = await fetch(`/api/${entityMap[activeTab]}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshData();
      }
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem({});
    setIsModalOpen(true);
  };

  const saveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const entityMap: any = {
      'business': 'business_lines',
      'management': 'management',
      'timeline': 'timeline',
      'news': 'news',
      'gallery': 'gallery'
    };

    const entity = entityMap[activeTab];
    const isUpdate = !!editingItem.id;
    const url = isUpdate ? `/api/${entity}/${editingItem.id}` : `/api/${entity}`;
    const method = isUpdate ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (res.ok) {
        await refreshData();
        setIsModalOpen(false);
        setEditingItem(null);
      } else {
        alert('Error saving item');
      }
    } catch (err) {
      alert('Error saving item');
    } finally {
      setIsSaving(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSettings)
      });
      await refreshData();
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securitySettings.newPassword && securitySettings.newPassword !== securitySettings.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/update-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(securitySettings)
      });
      const data = await res.json();
      if (data.success) {
        alert('Credentials updated successfully! Please login again.');
        handleLogout();
      } else {
        alert(data.message || 'Error updating credentials');
      }
    } catch (err) {
      alert('Error updating credentials');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'settings', label: 'Site Settings', icon: SettingsIcon },
    { id: 'business', label: 'Business Lines', icon: Briefcase },
    { id: 'management', label: 'Management', icon: Users },
    { id: 'timeline', label: 'History Timeline', icon: Clock },
    { id: 'news', label: 'News & Articles', icon: Newspaper },
    { id: 'gallery', label: 'Media Gallery', icon: ImageIcon },
    { id: 'inquiries', label: 'Inquiries', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0a0b0d] text-white flex flex-col shrink-0 border-r border-white/5 relative z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400/30">AIC</div>
            <div>
              <span className="font-black text-lg tracking-tight block leading-none">ADMIN CMS</span>
              <span className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.3em] mt-1 block">Control Center</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="px-4 py-2 mb-2">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Main Navigation</span>
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all group relative overflow-hidden",
                activeTab === tab.id 
                  ? "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                  : "text-gray-500 hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              <tab.icon size={16} className={cn("transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]", activeTab === tab.id ? "text-emerald-400" : "text-gray-600")} />
              {tab.label}
              {activeTab === tab.id && (
                <>
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="mb-4 px-4 py-3 bg-white/5 rounded-2xl flex items-center gap-3 border border-white/5">
            <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center text-emerald-500 font-black text-xs">AD</div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-black text-white truncate">Administrator</div>
              <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest truncate">System Root</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all group border border-transparent hover:border-red-500/20"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Logout System
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#f8f9fa]">
        <div className="p-10 max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-12 bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] outline outline-1 outline-gray-100">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Operational Status: Active</span>
              </div>
              <h1 className="text-4xl font-black text-gray-900 capitalize tracking-tight leading-none drop-shadow-sm">
                {activeTab.replace('-', ' ')}
              </h1>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => window.open('/', '_blank')}
                className="px-8 py-4 bg-white border border-gray-100 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-3 shadow-sm hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] active:scale-95"
              >
                <Globe size={16} className="text-emerald-600" />
                Live Preview
              </button>
              {(activeTab === 'settings' || activeTab === 'security') && (
                <button 
                  onClick={activeTab === 'settings' ? saveSettings : handleUpdateSecurity}
                  disabled={isSaving}
                  className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] disabled:opacity-50 active:scale-95 border border-emerald-400/20"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {activeTab === 'security' ? 'Update Credentials' : 'Commit Changes'}
                </button>
              )}
            </div>
          </header>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden outline outline-1 outline-gray-50"
          >
            <div className="p-10">
              {activeTab === 'dashboard' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-emerald-500/30 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] outline outline-1 outline-transparent hover:outline-emerald-500/10">
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <Mail size={20} />
                          </div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Customer Inquiries</span>
                        </div>
                        <div className="text-gray-900 font-black text-5xl mb-1 tracking-tighter drop-shadow-sm">{inquiries.length}</div>
                        <div className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                          <Plus size={10} /> 12% from last week
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-blue-500/30 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] outline outline-1 outline-transparent hover:outline-blue-500/10">
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <Newspaper size={20} />
                          </div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Published Articles</span>
                        </div>
                        <div className="text-gray-900 font-black text-5xl mb-1 tracking-tighter drop-shadow-sm">{news.length}</div>
                        <div className="text-blue-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                          <Plus size={10} /> 2 new this month
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-purple-500/30 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] outline outline-1 outline-transparent hover:outline-purple-500/10">
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <ImageIcon size={20} />
                          </div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Media Assets</span>
                        </div>
                        <div className="text-gray-900 font-black text-5xl mb-1 tracking-tighter drop-shadow-sm">{gallery.length}</div>
                        <div className="text-purple-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                          <Plus size={10} /> 5 recently added
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Recent System Activity</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Latest customer interactions</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('inquiries')} 
                        className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-gray-900/10"
                      >
                        View All Inquiries
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-5 font-black text-gray-400 uppercase tracking-widest text-[9px]">Timestamp</th>
                            <th className="pb-5 font-black text-gray-400 uppercase tracking-widest text-[9px]">Origin</th>
                            <th className="pb-5 font-black text-gray-400 uppercase tracking-widest text-[9px]">Subject Matter</th>
                            <th className="pb-5 font-black text-gray-400 uppercase tracking-widest text-[9px]">Status</th>
                            <th className="pb-5 font-black text-gray-400 uppercase tracking-widest text-[9px] text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {inquiries.slice(0, 5).map((inq) => (
                            <tr key={inq.id} className="hover:bg-gray-50/50 transition-colors group">
                              <td className="py-5 text-[11px] text-gray-500 font-bold uppercase tracking-wider">{new Date(inq.created_at).toLocaleDateString()}</td>
                              <td className="py-5">
                                <div className="text-xs font-black text-gray-900">{inq.name}</div>
                                <div className="text-[10px] text-gray-400 font-medium">{inq.company}</div>
                              </td>
                              <td className="py-5 text-xs text-gray-600 font-bold">{inq.subject}</td>
                              <td className="py-5">
                                <span className={cn(
                                  "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider",
                                  inq.status === 'new' ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                                )}>
                                  {inq.status}
                                </span>
                              </td>
                              <td className="py-5 text-right">
                                <button 
                                  onClick={() => setActiveTab('inquiries')}
                                  className="p-2.5 bg-white border border-gray-100 text-gray-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:text-emerald-600 hover:border-emerald-500/30 shadow-sm"
                                >
                                  <ArrowRight size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && editingSettings && (
                <div className="space-y-12 max-w-4xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                          <Globe size={16} />
                        </div>
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">General Identity</h3>
                      </div>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Company Name</label>
                          <input 
                            type="text" 
                            value={editingSettings.company_name}
                            onChange={(e) => setEditingSettings({...editingSettings, company_name: e.target.value})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Entity Name</label>
                          <input 
                            type="text" 
                            value={editingSettings.company_full_name}
                            onChange={(e) => setEditingSettings({...editingSettings, company_full_name: e.target.value})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Tagline (ID)</label>
                            <input 
                              type="text" 
                              value={editingSettings.tagline_id}
                              onChange={(e) => setEditingSettings({...editingSettings, tagline_id: e.target.value})}
                              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Tagline (EN)</label>
                            <input 
                              type="text" 
                              value={editingSettings.tagline_en}
                              onChange={(e) => setEditingSettings({...editingSettings, tagline_en: e.target.value})}
                              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                          <Mail size={16} />
                        </div>
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Contact Details</h3>
                      </div>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Primary Email</label>
                          <input 
                            type="email" 
                            value={editingSettings.email}
                            onChange={(e) => setEditingSettings({...editingSettings, email: e.target.value})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Phone</label>
                            <input 
                              type="text" 
                              value={editingSettings.phone}
                              onChange={(e) => setEditingSettings({...editingSettings, phone: e.target.value})}
                              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">WhatsApp</label>
                            <input 
                              type="text" 
                              value={editingSettings.whatsapp}
                              onChange={(e) => setEditingSettings({...editingSettings, whatsapp: e.target.value})}
                              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Headquarters Address</label>
                          <textarea 
                            rows={3}
                            value={editingSettings.address}
                            onChange={(e) => setEditingSettings({...editingSettings, address: e.target.value})}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                      <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                        <Edit3 size={16} />
                      </div>
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Corporate Narrative</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Description (ID)</label>
                        <textarea 
                          rows={6}
                          value={editingSettings.description_id}
                          onChange={(e) => setEditingSettings({...editingSettings, description_id: e.target.value})}
                          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Description (EN)</label>
                        <textarea 
                          rows={6}
                          value={editingSettings.description_en}
                          onChange={(e) => setEditingSettings({...editingSettings, description_en: e.target.value})}
                          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {['business', 'management', 'timeline', 'news', 'gallery'].includes(activeTab) && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 capitalize tracking-tight">Manage {activeTab}</h3>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Total {
                        activeTab === 'business' ? businessLines.length :
                        activeTab === 'management' ? management.length :
                        activeTab === 'timeline' ? timeline.length :
                        activeTab === 'news' ? news.length : gallery.length
                      } items registered</p>
                    </div>
                    <button 
                      onClick={handleAddNew}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-gray-900/10"
                    >
                      <Plus size={14} />
                      Add New {activeTab}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {activeTab === 'business' && businessLines.map(line => (
                      <div key={line.id} className="p-5 bg-white rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-emerald-500/30 transition-all shadow-sm">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border-2 border-white">
                            <img src={line.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 text-sm">{line.title_id}</h4>
                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-0.5">{line.pt_name}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button onClick={() => handleEdit(line)} className="p-2.5 bg-gray-50 text-blue-600 rounded-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={16} /></button>
                          <button onClick={() => handleDelete(line.id)} className="p-2.5 bg-gray-50 text-red-600 rounded-lg border border-gray-100 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}

                    {activeTab === 'management' && management.map(member => (
                      <div key={member.id} className="p-5 bg-white rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-emerald-500/30 transition-all shadow-sm">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border-2 border-white">
                            <img src={member.photo} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 text-sm">{member.name}</h4>
                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-0.5">{member.position_id}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button onClick={() => handleEdit(member)} className="p-2.5 bg-gray-50 text-blue-600 rounded-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={16} /></button>
                          <button onClick={() => handleDelete(member.id)} className="p-2.5 bg-gray-50 text-red-600 rounded-lg border border-gray-100 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}

                    {activeTab === 'news' && news.map(article => (
                      <div key={article.id} className="p-5 bg-white rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-emerald-500/30 transition-all shadow-sm">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border-2 border-white">
                            <img src={article.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 text-sm line-clamp-1">{article.title_id}</h4>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{article.category} • {new Date(article.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button onClick={() => handleEdit(article)} className="p-2.5 bg-gray-50 text-blue-600 rounded-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={16} /></button>
                          <button onClick={() => handleDelete(article.id)} className="p-2.5 bg-gray-50 text-red-600 rounded-lg border border-gray-100 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}

                    {activeTab === 'timeline' && timeline.map(item => (
                      <div key={item.id} className="p-5 bg-white rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-emerald-500/30 transition-all shadow-sm">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-black text-xs shadow-md border-2 border-white">
                            {item.period}
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 text-sm">{item.title_id}</h4>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Historical Milestone</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button onClick={() => handleEdit(item)} className="p-2.5 bg-gray-50 text-blue-600 rounded-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={16} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2.5 bg-gray-50 text-red-600 rounded-lg border border-gray-100 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}

                    {activeTab === 'gallery' && gallery.map(item => (
                      <div key={item.id} className="p-5 bg-white rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-emerald-500/30 transition-all shadow-sm">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border-2 border-white">
                            <img src={item.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 text-sm">{item.title_id || 'Media Asset'}</h4>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{item.type} • Asset ID: {item.id}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button onClick={() => handleEdit(item)} className="p-2.5 bg-gray-50 text-blue-600 rounded-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={16} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2.5 bg-gray-50 text-red-600 rounded-lg border border-gray-100 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-10 text-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 text-gray-400">
                    <p className="font-black uppercase tracking-[0.2em] text-[10px]">System ready for content updates</p>
                    <p className="text-[9px] mt-2 font-medium">Use the "Add New" button to expand your corporate presence.</p>
                  </div>
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">Customer Inquiries</h3>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Manage incoming communications</p>
                    </div>
                    <button 
                      onClick={fetchInquiries}
                      className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                      <Clock size={14} />
                      Refresh Feed
                    </button>
                  </div>

                  <div className="space-y-6">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm group hover:border-emerald-500/30 transition-all">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-2xl font-black text-gray-900 tracking-tight">{inq.name}</h4>
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider",
                                inq.status === 'new' ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                              )}>
                                {inq.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                              <div className="flex items-center gap-2"><Users size={14} className="text-emerald-500" /> {inq.company}</div>
                              <div className="flex items-center gap-2"><Mail size={14} className="text-emerald-500" /> {inq.email}</div>
                              <div className="flex items-center gap-2"><Phone size={14} className="text-emerald-500" /> {inq.phone}</div>
                            </div>
                          </div>
                          <div className="text-left md:text-right shrink-0">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Inquiry Subject</div>
                            <div className="text-sm font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl inline-block">{inq.subject}</div>
                          </div>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 leading-relaxed italic text-lg font-medium relative">
                          <span className="absolute -top-4 -left-2 text-6xl text-gray-200 font-serif opacity-50">"</span>
                          {inq.message}
                          <span className="absolute -bottom-10 -right-2 text-6xl text-gray-200 font-serif opacity-50">"</span>
                        </div>
                        <div className="mt-10 flex flex-wrap gap-4">
                          <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20">
                            <CheckCircle2 size={14} /> Resolve Ticket
                          </button>
                          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2">
                            <Mail size={14} /> Send Response
                          </button>
                          <button className="px-6 py-3 bg-white border border-gray-200 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all flex items-center gap-2 ml-auto">
                            <Trash2 size={14} /> Archive
                          </button>
                        </div>
                      </div>
                    ))}
                    {inquiries.length === 0 && (
                      <div className="text-center py-24 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                        <Mail className="mx-auto text-gray-200 mb-6" size={64} />
                        <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Inbox is currently empty</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-12 max-w-2xl">
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                      <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <Shield size={16} />
                      </div>
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Account Security</h3>
                    </div>
                    
                    <form onSubmit={handleUpdateSecurity} className="space-y-8">
                      <div className="space-y-6">
                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-6 shadow-inner">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                              <User size={16} className="text-emerald-600" />
                            </div>
                            <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Username Management</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Username</label>
                              <input 
                                type="text" 
                                required
                                value={securitySettings.currentUsername}
                                onChange={(e) => setSecuritySettings({...securitySettings, currentUsername: e.target.value})}
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm shadow-sm hover:border-emerald-500/30"
                                placeholder="Enter current username"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Username (Optional)</label>
                              <input 
                                type="text" 
                                value={securitySettings.newUsername}
                                onChange={(e) => setSecuritySettings({...securitySettings, newUsername: e.target.value})}
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm shadow-sm hover:border-emerald-500/30"
                                placeholder="Leave blank to keep current"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-6 shadow-inner">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                              <Key size={16} className="text-emerald-600" />
                            </div>
                            <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Password Management</span>
                          </div>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
                              <div className="relative group">
                                <input 
                                  type="password" 
                                  required
                                  value={securitySettings.currentPassword}
                                  onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                                  className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm shadow-sm hover:border-emerald-500/30"
                                  placeholder="Enter current password"
                                />
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                                <input 
                                  type="password" 
                                  value={securitySettings.newPassword}
                                  onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm shadow-sm hover:border-emerald-500/30"
                                  placeholder="Enter new password"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                <input 
                                  type="password" 
                                  value={securitySettings.confirmPassword}
                                  onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm shadow-sm hover:border-emerald-500/30"
                                  placeholder="Confirm new password"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Entity Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  {editingItem?.id ? 'Edit' : 'Add New'} {activeTab}
                </h3>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Content Management System</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100 shadow-sm hover:shadow-md"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveItem} className="p-8 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 gap-6">
                {activeTab === 'business' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title (ID)</label>
                        <input type="text" required value={editingItem.title_id || ''} onChange={e => setEditingItem({...editingItem, title_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title (EN)</label>
                        <input type="text" required value={editingItem.title_en || ''} onChange={e => setEditingItem({...editingItem, title_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">PT Name</label>
                        <input type="text" required value={editingItem.pt_name || ''} onChange={e => setEditingItem({...editingItem, pt_name: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Icon (Lucide Name)</label>
                        <input type="text" required value={editingItem.icon || 'Globe'} onChange={e => setEditingItem({...editingItem, icon: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Short Desc (ID)</label>
                        <input type="text" required value={editingItem.short_desc_id || ''} onChange={e => setEditingItem({...editingItem, short_desc_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Short Desc (EN)</label>
                        <input type="text" required value={editingItem.short_desc_en || ''} onChange={e => setEditingItem({...editingItem, short_desc_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Long Description (ID)</label>
                      <textarea rows={3} required value={editingItem.long_desc_id || ''} onChange={e => setEditingItem({...editingItem, long_desc_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Long Description (EN)</label>
                      <textarea rows={3} required value={editingItem.long_desc_en || ''} onChange={e => setEditingItem({...editingItem, long_desc_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                        <input type="text" required value={editingItem.image || ''} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sort Order</label>
                        <input type="number" required value={editingItem.sort_order || 0} onChange={e => setEditingItem({...editingItem, sort_order: parseInt(e.target.value)})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'management' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input type="text" required value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                        <select value={editingItem.category || 'Executive'} onChange={e => setEditingItem({...editingItem, category: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm">
                          <option value="Executive">Executive</option>
                          <option value="Strategy">Strategy</option>
                          <option value="Operations">Operations</option>
                          <option value="Legal">Legal</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Position (ID)</label>
                        <input type="text" required value={editingItem.position_id || ''} onChange={e => setEditingItem({...editingItem, position_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Position (EN)</label>
                        <input type="text" required value={editingItem.position_en || ''} onChange={e => setEditingItem({...editingItem, position_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bio (ID)</label>
                      <textarea rows={3} required value={editingItem.bio_id || ''} onChange={e => setEditingItem({...editingItem, bio_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bio (EN)</label>
                      <textarea rows={3} required value={editingItem.bio_en || ''} onChange={e => setEditingItem({...editingItem, bio_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Photo URL</label>
                        <input type="text" required value={editingItem.photo || ''} onChange={e => setEditingItem({...editingItem, photo: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sort Order</label>
                        <input type="number" required value={editingItem.sort_order || 0} onChange={e => setEditingItem({...editingItem, sort_order: parseInt(e.target.value)})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'news' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title (ID)</label>
                        <input type="text" required value={editingItem.title_id || ''} onChange={e => setEditingItem({...editingItem, title_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title (EN)</label>
                        <input type="text" required value={editingItem.title_en || ''} onChange={e => setEditingItem({...editingItem, title_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Slug</label>
                        <div className="flex gap-2">
                          <input type="text" required value={editingItem.slug || ''} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                          <button 
                            type="button"
                            onClick={() => {
                              const slug = (editingItem.title_id || '')
                                .toLowerCase()
                                .replace(/[^\w\s-]/g, '')
                                .replace(/[\s_-]+/g, '-')
                                .replace(/^-+|-+$/g, '');
                              setEditingItem({...editingItem, slug});
                            }}
                            className="px-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            Gen
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                        <input type="text" required value={editingItem.category || ''} onChange={e => setEditingItem({...editingItem, category: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Summary (ID)</label>
                        <textarea rows={2} required value={editingItem.summary_id || ''} onChange={e => setEditingItem({...editingItem, summary_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Summary (EN)</label>
                        <textarea rows={2} required value={editingItem.summary_en || ''} onChange={e => setEditingItem({...editingItem, summary_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Content (ID) - Markdown Supported</label>
                      <textarea rows={8} required value={editingItem.content_id || ''} onChange={e => setEditingItem({...editingItem, content_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm font-mono" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Content (EN) - Markdown Supported</label>
                      <textarea rows={8} required value={editingItem.content_en || ''} onChange={e => setEditingItem({...editingItem, content_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Thumbnail URL</label>
                        <input type="text" required value={editingItem.thumbnail || ''} onChange={e => setEditingItem({...editingItem, thumbnail: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                        <select value={editingItem.status || 'published'} onChange={e => setEditingItem({...editingItem, status: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm">
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'timeline' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Period</label>
                        <input type="text" required value={editingItem.period || ''} onChange={e => setEditingItem({...editingItem, period: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sort Order</label>
                        <input type="number" required value={editingItem.sort_order || 0} onChange={e => setEditingItem({...editingItem, sort_order: parseInt(e.target.value)})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title (ID)</label>
                        <input type="text" required value={editingItem.title_id || ''} onChange={e => setEditingItem({...editingItem, title_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title (EN)</label>
                        <input type="text" required value={editingItem.title_en || ''} onChange={e => setEditingItem({...editingItem, title_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description (ID)</label>
                      <textarea rows={3} required value={editingItem.description_id || ''} onChange={e => setEditingItem({...editingItem, description_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description (EN)</label>
                      <textarea rows={3} required value={editingItem.description_en || ''} onChange={e => setEditingItem({...editingItem, description_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm resize-none" />
                    </div>
                  </>
                )}

                {activeTab === 'gallery' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title (ID)</label>
                        <input type="text" required value={editingItem.title_id || ''} onChange={e => setEditingItem({...editingItem, title_id: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title (EN)</label>
                        <input type="text" required value={editingItem.title_en || ''} onChange={e => setEditingItem({...editingItem, title_en: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                        <select value={editingItem.type || 'image'} onChange={e => setEditingItem({...editingItem, type: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm">
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sort Order</label>
                        <input type="number" required value={editingItem.sort_order || 0} onChange={e => setEditingItem({...editingItem, sort_order: parseInt(e.target.value)})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL</label>
                      <input type="text" required value={editingItem.url || ''} onChange={e => setEditingItem({...editingItem, url: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-sm" />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-10 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="flex-[2] px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-600/30 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
