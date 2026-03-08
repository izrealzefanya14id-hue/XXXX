import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Settings, BusinessLine, ManagementMember, TimelineItem, NewsArticle, GalleryItem } from './types';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  settings: Settings | null;
  businessLines: BusinessLine[];
  management: ManagementMember[];
  timeline: TimelineItem[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  loading: boolean;
  refreshData: () => Promise<void>;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'id';
  });
  const [settings, setSettings] = useState<Settings | null>(null);
  const [businessLines, setBusinessLines] = useState<BusinessLine[]>([]);
  const [management, setManagement] = useState<ManagementMember[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [sRes, bRes, mRes, tRes, nRes, gRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/business-lines'),
        fetch('/api/management'),
        fetch('/api/timeline'),
        fetch('/api/news'),
        fetch('/api/gallery'),
      ]);

      if (sRes.ok) setSettings(await sRes.json());
      if (bRes.ok) setBusinessLines(await bRes.json());
      if (mRes.ok) setManagement(await mRes.json());
      if (tRes.ok) setTimeline(await tRes.json());
      if (nRes.ok) setNews(await nRes.json());
      if (gRes.ok) setGallery(await gRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key: string) => {
    if (!settings) return '';
    const localizedKey = `${key}_${lang}`;
    return (settings as any)[localizedKey] || (settings as any)[key] || key;
  };

  return (
    <AppContext.Provider value={{
      lang,
      setLang,
      settings,
      businessLines,
      management,
      timeline,
      news,
      gallery,
      loading,
      refreshData: fetchData,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
