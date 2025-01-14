export interface CrawlResult {
  success: boolean;
  data?: {
    about_us?: SectionData;
    overview?: SectionData;
    mission?: SectionData;
    vision?: SectionData;
    services?: SectionData;
    products?: SectionData;
    contact?: SectionData;
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