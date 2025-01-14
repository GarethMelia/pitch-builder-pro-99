export interface CrawlResult {
  success: boolean;
  data?: {
    about_us?: SectionData;
    mission?: SectionData;
    vision?: SectionData;
    services?: SectionData;
    products?: SectionData;
    testimonials?: SectionData;
    contact?: SectionData;
    values?: SectionData;
    leadership?: SectionData;
  };
  error?: string;
  details?: string;
}

export interface SectionData {
  content: string;
  confidence: number;
  source: string;
  position: number;
}

export interface SectionConfig {
  name: string;
  variations: string[];
  keywords: string[];
}