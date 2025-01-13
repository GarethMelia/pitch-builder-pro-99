import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { SectionConfig, SectionData } from './types.ts';

export class ContentExtractor {
  private doc: any;
  private headings: Element[];
  private allText: string;
  
  constructor(html: string) {
    const parser = new DOMParser();
    this.doc = parser.parseFromString(html, 'text/html');
    this.headings = Array.from(this.doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    this.allText = this.extractAllText();
  }

  private extractAllText(): string {
    // Remove script and style elements
    const scripts = this.doc.querySelectorAll('script, style');
    scripts.forEach((script: Element) => script.remove());
    
    // Get text content from main content areas
    const mainContent = this.doc.querySelector('main, article, [role="main"]');
    if (mainContent) {
      return mainContent.textContent.replace(/\s+/g, ' ').trim();
    }
    
    // Fallback to body if no main content area found
    return this.doc.body?.textContent.replace(/\s+/g, ' ').trim() || '';
  }

  private findSectionByHeading(config: SectionConfig): SectionData | null {
    for (const heading of this.headings) {
      const headingText = heading.textContent?.toLowerCase() || '';
      
      if (config.variations.some(v => headingText.includes(v.toLowerCase()))) {
        // Get the parent section or div
        let container = heading.parentElement;
        while (container && !['section', 'div', 'article'].includes(container.tagName.toLowerCase())) {
          container = container.parentElement;
        }
        
        if (container) {
          // Get all text content after the heading but within the container
          const content = Array.from(container.childNodes)
            .filter(node => node !== heading)
            .map(node => node.textContent?.trim())
            .filter(Boolean)
            .join(' ')
            .trim();
            
          if (content) {
            return {
              content,
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

  private findSectionInMainContent(config: SectionConfig): SectionData | null {
    const mainContent = this.doc.querySelector('main, article, [role="main"]');
    if (!mainContent) return null;

    const sections = mainContent.querySelectorAll('section, div[class*="section"], div[class*="about"], div[class*="hero"]');
    
    for (const section of sections) {
      const sectionText = section.textContent?.toLowerCase() || '';
      
      for (const variation of config.variations) {
        if (sectionText.includes(variation.toLowerCase())) {
          const content = section.textContent?.trim();
          if (content) {
            return {
              content,
              confidence: 1,
              source: 'main-content',
              position: -1
            };
          }
        }
      }
    }
    return null;
  }

  public findSection(config: SectionConfig): SectionData | null {
    console.log(`Searching for section: ${config.name}`);
    
    // First try to find by heading
    const headingMatch = this.findSectionByHeading(config);
    if (headingMatch) {
      console.log(`Found ${config.name} by heading:`, headingMatch.content);
      return headingMatch;
    }
    
    // Then try to find in main content areas
    const mainContentMatch = this.findSectionInMainContent(config);
    if (mainContentMatch) {
      console.log(`Found ${config.name} in main content:`, mainContentMatch.content);
      return mainContentMatch;
    }
    
    // Finally, try to find in meta tags
    const metaTags = this.doc.querySelectorAll('meta[name], meta[property]');
    for (const meta of metaTags) {
      const name = (meta.getAttribute('name') || meta.getAttribute('property'))?.toLowerCase();
      if (name && config.variations.some(v => name.includes(v.toLowerCase()))) {
        const content = meta.getAttribute('content')?.trim();
        if (content) {
          console.log(`Found ${config.name} in meta tag:`, content);
          return {
            content,
            confidence: 0.8,
            source: `meta:${name}`,
            position: -1
          };
        }
      }
    }
    
    console.log(`No content found for ${config.name}`);
    return null;
  }
}