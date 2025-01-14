import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { SectionConfig, SectionData } from './types.ts';

export class ContentExtractor {
  private doc: any;
  private headings: Element[];
  private allText: string;
  private mainContent: Element | null;
  
  constructor(html: string) {
    const parser = new DOMParser();
    this.doc = parser.parseFromString(html, 'text/html');
    this.headings = Array.from(this.doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    this.mainContent = this.findMainContent();
    this.allText = this.extractAllText();
    this.removeNoiseElements();
  }

  private removeNoiseElements(): void {
    const noiseSelectors = [
      'script',
      'style',
      'noscript',
      'iframe',
      'img',
      'svg',
      'video',
      'audio',
      '.cookie-notice',
      '.advertisement',
      '.social-share',
      'nav',
      'header',
      'footer'
    ];
    const noiseElements = this.doc.querySelectorAll(noiseSelectors.join(','));
    noiseElements.forEach((el: Element) => el.remove());
  }

  private findMainContent(): Element | null {
    const mainSelectors = [
      'main',
      'article',
      '[role="main"]',
      '#main-content',
      '.main-content',
      '.content',
      '#content',
      '.page-content',
      '.site-content',
      '.entry-content',
      '.post-content',
      '.container',
      '.wrapper'
    ];

    for (const selector of mainSelectors) {
      const element = this.doc.querySelector(selector);
      if (element) {
        return element;
      }
    }

    return this.doc.body;
  }

  private extractAllText(): string {
    if (!this.mainContent) return '';
    return this.mainContent.textContent.replace(/\s+/g, ' ').trim();
  }

  private findSectionByHeading(config: SectionConfig): SectionData | null {
    for (const heading of this.headings) {
      const headingText = heading.textContent?.toLowerCase().trim() || '';
      
      if (config.variations.some(v => headingText.includes(v.toLowerCase()))) {
        let container = this.findRelevantContainer(heading);
        
        if (container) {
          const content = this.extractContentFromContainer(container);
          if (content) {
            return {
              content: this.cleanContent(content),
              confidence: 1,
              source: `heading:${headingText}`,
              position: Array.from(this.headings).indexOf(heading)
            };
          }
        }
      }
    }
    return null;
  }

  private findRelevantContainer(element: Element): Element | null {
    let container = element.parentElement;
    const relevantTags = ['section', 'div', 'article', 'main'];
    
    while (container) {
      if (relevantTags.includes(container.tagName.toLowerCase())) {
        const text = container.textContent?.trim() || '';
        if (text.length > 50) {
          return container;
        }
      }
      container = container.parentElement;
    }
    return element.parentElement;
  }

  private extractContentFromContainer(container: Element): string {
    const textNodes: string[] = [];
    const elements = container.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
    
    elements.forEach((element) => {
      const text = element.textContent?.trim();
      if (text) {
        textNodes.push(text);
      }
    });
    
    return textNodes.join('\n');
  }

  private cleanContent(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
  }

  private findSectionInMainContent(config: SectionConfig): SectionData | null {
    if (!this.mainContent) return null;

    const sections = this.mainContent.querySelectorAll('section, div[class*="section"], div[class*="content"]');
    
    for (const section of sections) {
      const sectionText = section.textContent?.toLowerCase() || '';
      
      for (const variation of config.variations) {
        if (sectionText.includes(variation.toLowerCase())) {
          const content = this.cleanContent(section.textContent || '');
          if (content) {
            return {
              content,
              confidence: 0.8,
              source: 'main-content',
              position: -1
            };
          }
        }
      }

      const keywordMatches = config.keywords.filter(keyword => 
        sectionText.includes(keyword.toLowerCase())
      );

      if (keywordMatches.length >= 2) {
        const content = this.cleanContent(section.textContent || '');
        if (content) {
          return {
            content,
            confidence: 0.6,
            source: `keywords:${keywordMatches.join(',')}`,
            position: -1
          };
        }
      }
    }
    return null;
  }

  private findInMetaTags(config: SectionConfig): SectionData | null {
    const metaTags = this.doc.querySelectorAll('meta[name], meta[property]');
    
    for (const meta of metaTags) {
      const name = (meta.getAttribute('name') || meta.getAttribute('property'))?.toLowerCase();
      if (name && config.variations.some(v => name.includes(v.toLowerCase()))) {
        const content = meta.getAttribute('content')?.trim();
        if (content) {
          return {
            content,
            confidence: 0.7,
            source: `meta:${name}`,
            position: -1
          };
        }
      }
    }
    return null;
  }

  public findSection(config: SectionConfig): SectionData | null {
    console.log(`Searching for section: ${config.name}`);
    
    const headingMatch = this.findSectionByHeading(config);
    if (headingMatch) {
      console.log(`Found ${config.name} by heading:`, headingMatch);
      return headingMatch;
    }
    
    const mainContentMatch = this.findSectionInMainContent(config);
    if (mainContentMatch) {
      console.log(`Found ${config.name} in main content:`, mainContentMatch);
      return mainContentMatch;
    }
    
    const metaMatch = this.findInMetaTags(config);
    if (metaMatch) {
      console.log(`Found ${config.name} in meta tags:`, metaMatch);
      return metaMatch;
    }
    
    console.log(`No content found for ${config.name}`);
    return null;
  }
}