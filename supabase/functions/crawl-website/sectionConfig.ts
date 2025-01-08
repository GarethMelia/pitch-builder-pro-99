import { SectionConfig } from './types.ts';

export const SECTION_CONFIGS: SectionConfig[] = [
  {
    name: 'about_us',
    variations: ['about', 'about us', 'about-us', 'who we are', 'our story', 'company', 'background', 'history'],
    keywords: ['company', 'organization', 'team', 'founded', 'established', 'history', 'background', 'experience']
  },
  {
    name: 'overview',
    variations: ['overview', 'introduction', 'summary', 'what we do', 'services', 'solutions', 'offerings'],
    keywords: ['provide', 'deliver', 'service', 'solution', 'product', 'offering', 'specialize', 'focus']
  },
  {
    name: 'mission',
    variations: ['mission', 'our mission', 'mission statement', 'purpose', 'why we exist', 'what drives us'],
    keywords: ['mission', 'purpose', 'aim', 'goal', 'commitment', 'dedicated', 'strive', 'achieve']
  },
  {
    name: 'vision',
    variations: ['vision', 'our vision', 'vision statement', 'future', 'where we\'re going', 'goals'],
    keywords: ['vision', 'future', 'aspire', 'believe', 'dream', 'imagine', 'transform', 'impact']
  }
];