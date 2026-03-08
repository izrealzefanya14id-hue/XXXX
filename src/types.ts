export interface Settings {
  company_name: string;
  company_full_name: string;
  tagline_id: string;
  tagline_en: string;
  description_id: string;
  description_en: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  legal_id: string;
  legal_en: string;
  vision_id: string;
  vision_en: string;
}

export interface BusinessLine {
  id: number;
  title_id: string;
  title_en: string;
  pt_name: string;
  icon: string;
  short_desc_id: string;
  short_desc_en: string;
  long_desc_id: string;
  long_desc_en: string;
  image: string;
  sort_order: number;
}

export interface ManagementMember {
  id: number;
  name: string;
  position_id: string;
  position_en: string;
  category: string;
  bio_id: string;
  bio_en: string;
  photo: string;
  sort_order: number;
}

export interface TimelineItem {
  id: number;
  period: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  sort_order: number;
}

export interface NewsArticle {
  id: number;
  title_id: string;
  title_en: string;
  slug: string;
  category: string;
  summary_id: string;
  summary_en: string;
  content_id: string;
  content_en: string;
  thumbnail: string;
  status: string;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  title_id: string;
  title_en: string;
  type: 'image' | 'video';
  url: string;
  sort_order: number;
}

export interface Inquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'in_review' | 'replied' | 'closed';
  created_at: string;
}

export type Language = 'id' | 'en';
