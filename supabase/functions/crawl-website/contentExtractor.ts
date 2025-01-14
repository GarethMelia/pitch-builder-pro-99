import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { SectionConfig, SectionData } from './types.ts';
import { DOMUtils } from './utils/DOMUtils.ts';
import { SectionExtractor } from './utils/SectionExtractor.ts';

export class ContentExtractor {
  private doc: any;
  private headings: Element[];
  private mainContent: Element | null;
  private sectionExtractor: SectionExtractor;
  
  constructor(html: string) {
    const parser = new DOMParser();
    this.doc = parser.parseFromString(html, 'text/html');
    DOMUtils.removeNoiseElements(this.doc);
    this.headings = Array.from(this.doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    this.mainContent = DOMUtils.findMainContent(this.doc);
    this.sectionExtractor = new SectionExtractor(this.doc, this.mainContent);
  }

  public findSection(config: SectionConfig): SectionData | null {
    console.log(`Searching for section: ${config.name}`);
    
    // Try finding by heading first
    const headingMatch = this.sectionExtractor.findSectionByHeading(config, this.headings);
    if (headingMatch) {
      console.log(`Found ${config.name} by heading with confidence ${headingMatch.confidence}`);
      return headingMatch;
    }
    
    // Try finding in main content
    const mainContentMatch = this.sectionExtractor.findSectionInMainContent(config);
    if (mainContentMatch) {
      console.log(`Found ${config.name} in main content with confidence ${mainContentMatch.confidence}`);
      return mainContentMatch;
    }
    
    // Try finding in meta tags
    const metaMatch = this.sectionExtractor.findInMetaTags(config);
    if (metaMatch) {
      console.log(`Found ${config.name} in meta tags with confidence ${metaMatch.confidence}`);
      return metaMatch;
    }
    
    console.log(`No content found for ${config.name}`);
    return null;
  }
}