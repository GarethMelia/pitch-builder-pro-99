import { SectionConfig } from './types.ts';

export const SECTION_CONFIGS: SectionConfig[] = [
  {
    name: 'about_us',
    variations: [
      'about', 'about us', 'about-us', 'who we are', 'our story', 
      'company', 'background', 'history', 'about company', 
      'about the company', 'our company', 'company profile'
    ],
    keywords: [
      'company', 'organization', 'team', 'founded', 'established', 
      'history', 'background', 'experience', 'journey', 'story',
      'inception', 'began', 'started', 'created', 'founded'
    ]
  },
  {
    name: 'overview',
    variations: [
      'overview', 'introduction', 'summary', 'what we do', 
      'services', 'solutions', 'offerings', 'company overview',
      'business overview', 'at a glance'
    ],
    keywords: [
      'provide', 'deliver', 'service', 'solution', 'product', 
      'offering', 'specialize', 'focus', 'expertise', 'industry',
      'market', 'customer', 'client', 'business'
    ]
  },
  {
    name: 'mission',
    variations: [
      'mission', 'our mission', 'mission statement', 'purpose',
      'why we exist', 'what drives us', 'our purpose',
      'company mission', 'core mission'
    ],
    keywords: [
      'mission', 'purpose', 'aim', 'goal', 'commitment', 
      'dedicated', 'strive', 'achieve', 'promise', 'pledge',
      'objective', 'aspiration', 'drive'
    ]
  },
  {
    name: 'vision',
    variations: [
      'vision', 'our vision', 'vision statement', 'future',
      'where we\'re going', 'goals', 'company vision',
      'future vision', 'long-term vision'
    ],
    keywords: [
      'vision', 'future', 'aspire', 'believe', 'dream', 
      'imagine', 'transform', 'impact', 'change', 'innovation',
      'tomorrow', 'ahead', 'forward'
    ]
  }
];