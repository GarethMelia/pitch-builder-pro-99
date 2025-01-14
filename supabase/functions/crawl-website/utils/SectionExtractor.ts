import { Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { SectionConfig, SectionData } from '../types.ts';
import { DOMUtils } from './DOMUtils.ts';

export class SectionExtractor {
  constructor(private doc: any, private mainContent: Element | null) {}

  findSectionByHeading(config: SectionConfig, headings: Element[]): SectionData | null {
    for (const heading of headings) {
      const headingText = heading.textContent?.toLowerCase().trim() || '';
      
      if (config.variations.some(v => headingText.includes(v.toLowerCase()))) {
        const container = this.findRelevantContainer(heading);
        
        if (container) {
          const content = this.extractContentFromContainer(container);
          if (content) {
            return {
              content: DOMUtils.cleanContent(content),
              confidence: 1,
              source: `heading:${headingText}`,
              position: Array.from(headings).indexOf(heading)
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
        if (text.length > 50) return container;
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
      if (text && text.length > 10) {
        textNodes.push(text);
      }
    });
    
    return textNodes.join('\n');
  }

  findSectionInMainContent(config: SectionConfig): SectionData | null {
    if (!this.mainContent) return null;

    const sections = this.mainContent.querySelectorAll('section, div[class*="section"], div[class*="content"]');
    
    for (const section of sections) {
      const sectionText = section.textContent?.toLowerCase() || '';
      
      // Check for exact matches in variations
      for (const variation of config.variations) {
        if (sectionText.includes(variation.toLowerCase())) {
          const content = DOMUtils.cleanContent(section.textContent || '');
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

      // Check for keyword matches
      const keywordMatches = config.keywords.filter(keyword => 
        sectionText.includes(keyword.toLowerCase())
      );

      if (keywordMatches.length >= 2) {
        const content = DOMUtils.cleanContent(section.textContent || '');
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

  findInMetaTags(config: SectionConfig): SectionData | null {
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
}