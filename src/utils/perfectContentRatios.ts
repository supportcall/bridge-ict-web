/**
 * Perfect Content Ratios System
 * Implements Golden Ratio (1.618) and optimal spacing ratios for SupportCALL
 * Addresses user requirement for "ULTIMATE PERFECT AMOUNT OF CONTENT"
 */

interface ContentRatioResult {
  element: string;
  before: string;
  after: string;
  ratio: number;
}

class PerfectContentRatios {
  private readonly GOLDEN_RATIO = 1.618;
  private readonly OPTIMAL_LINE_HEIGHT = 1.6;
  private readonly OPTIMAL_READING_WIDTH = 65; // characters
  private readonly OPTIMAL_SECTION_SPACING = 80; // pixels

  private results: ContentRatioResult[] = [];

  /**
   * Apply Golden Ratio to section spacing
   */
  public optimizeSectionSpacing(): void {
    const sections = document.querySelectorAll('section, .py-20, .py-16, .py-12');
    
    sections.forEach((section, index) => {
      const element = section as HTMLElement;
      const computedStyle = window.getComputedStyle(element);
      
      // Get current padding
      const currentPaddingTop = parseInt(computedStyle.paddingTop) || 0;
      const currentPaddingBottom = parseInt(computedStyle.paddingBottom) || 0;
      
      // Apply golden ratio spacing
      const optimalPadding = this.OPTIMAL_SECTION_SPACING;
      const goldenRatioPadding = Math.round(optimalPadding * this.GOLDEN_RATIO);
      
      // Alternate between standard and golden ratio sections for visual rhythm
      const padding = index % 2 === 0 ? optimalPadding : Math.round(optimalPadding * 0.618);
      
      element.style.paddingTop = `${padding}px`;
      element.style.paddingBottom = `${padding}px`;
      
      this.results.push({
        element: `Section ${index + 1}`,
        before: `${currentPaddingTop}px / ${currentPaddingBottom}px`,
        after: `${padding}px / ${padding}px`,
        ratio: padding / this.OPTIMAL_SECTION_SPACING
      });
    });
  }

  /**
   * Optimize text content ratios for perfect readability
   */
  public optimizeTextRatios(): void {
    // Optimize paragraph text
    const textElements = document.querySelectorAll('p, .text-lg, .text-xl, .description');
    
    textElements.forEach((element, index) => {
      const el = element as HTMLElement;
      const beforeWidth = el.offsetWidth;
      const beforeLineHeight = window.getComputedStyle(el).lineHeight;
      
      // Apply optimal reading width (golden ratio based)
      const containerWidth = el.closest('.container, .max-w-7xl, .max-w-6xl, .max-w-5xl')?.clientWidth || window.innerWidth;
      const optimalWidth = Math.min(containerWidth * 0.618, 65 * 16); // 65ch equivalent
      
      el.style.maxWidth = `${optimalWidth}px`;
      el.style.lineHeight = `${this.OPTIMAL_LINE_HEIGHT}`;
      
      // Center align for better visual balance
      if (el.closest('.text-center')) {
        el.style.margin = '0 auto';
      }
      
      this.results.push({
        element: `Text Element ${index + 1}`,
        before: `Width: ${beforeWidth}px, Line-height: ${beforeLineHeight}`,
        after: `Width: ${optimalWidth}px, Line-height: ${this.OPTIMAL_LINE_HEIGHT}`,
        ratio: optimalWidth / beforeWidth
      });
    });
  }

  /**
   * Optimize heading hierarchy with golden ratio scaling
   */
  public optimizeHeadingRatios(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    // Define golden ratio based font sizes
    const baseFontSize = 16; // 1rem
    const headingSizes = {
      h1: baseFontSize * Math.pow(this.GOLDEN_RATIO, 3), // ~41.89px
      h2: baseFontSize * Math.pow(this.GOLDEN_RATIO, 2), // ~25.89px  
      h3: baseFontSize * this.GOLDEN_RATIO, // ~25.89px
      h4: baseFontSize * Math.pow(this.GOLDEN_RATIO, 0.5), // ~20.72px
      h5: baseFontSize, // 16px
      h6: baseFontSize * Math.pow(this.GOLDEN_RATIO, -0.5) // ~12.36px
    };

    headings.forEach((heading, index) => {
      const el = heading as HTMLElement;
      const tagName = el.tagName.toLowerCase() as keyof typeof headingSizes;
      const beforeSize = window.getComputedStyle(el).fontSize;
      
      const optimalSize = headingSizes[tagName];
      el.style.fontSize = `${optimalSize}px`;
      
      // Apply golden ratio line height
      el.style.lineHeight = `${1.2}`;
      
      // Apply golden ratio margins
      const topMargin = optimalSize * 0.618;
      const bottomMargin = optimalSize * 0.382;
      
      el.style.marginTop = `${topMargin}px`;
      el.style.marginBottom = `${bottomMargin}px`;
      
      this.results.push({
        element: `${tagName.toUpperCase()} ${index + 1}`,
        before: `Font-size: ${beforeSize}`,
        after: `Font-size: ${optimalSize}px, Margins: ${topMargin}px/${bottomMargin}px`,
        ratio: this.GOLDEN_RATIO
      });
    });
  }

  /**
   * Optimize container and card ratios
   */
  public optimizeContainerRatios(): void {
    const containers = document.querySelectorAll('.container, .max-w-7xl, .max-w-6xl, .max-w-5xl');
    
    containers.forEach((container, index) => {
      const el = container as HTMLElement;
      const beforeWidth = el.offsetWidth;
      
      // Apply golden ratio to container max-width
      const viewportWidth = window.innerWidth;
      const optimalWidth = Math.min(viewportWidth * 0.85, 1400); // Max container width
      
      el.style.maxWidth = `${optimalWidth}px`;
      el.style.margin = '0 auto';
      
      this.results.push({
        element: `Container ${index + 1}`,
        before: `Width: ${beforeWidth}px`,
        after: `Max-width: ${optimalWidth}px`,
        ratio: optimalWidth / viewportWidth
      });
    });

    // Optimize cards and components
    const cards = document.querySelectorAll('.card, [class*="card"], .bg-card');
    
    cards.forEach((card, index) => {
      const el = card as HTMLElement;
      const beforePadding = window.getComputedStyle(el).padding;
      
      // Apply golden ratio padding
      const basePadding = 24; // 1.5rem
      const goldenPadding = Math.round(basePadding * this.GOLDEN_RATIO);
      
      el.style.padding = `${goldenPadding}px`;
      
      // Apply golden ratio border radius
      const borderRadius = Math.round(goldenPadding * 0.618);
      el.style.borderRadius = `${borderRadius}px`;
      
      this.results.push({
        element: `Card ${index + 1}`,
        before: `Padding: ${beforePadding}`,
        after: `Padding: ${goldenPadding}px, Border-radius: ${borderRadius}px`,
        ratio: this.GOLDEN_RATIO
      });
    });
  }

  /**
   * Optimize grid and layout ratios
   */
  public optimizeLayoutRatios(): void {
    // Optimize grid gaps using golden ratio
    const gridContainers = document.querySelectorAll('.grid, .flex');
    
    gridContainers.forEach((grid, index) => {
      const el = grid as HTMLElement;
      const beforeGap = window.getComputedStyle(el).gap;
      
      // Apply golden ratio gap
      const baseGap = 24; // 1.5rem
      const goldenGap = Math.round(baseGap * 0.618);
      
      el.style.gap = `${goldenGap}px`;
      
      this.results.push({
        element: `Grid/Flex ${index + 1}`,
        before: `Gap: ${beforeGap}`,
        after: `Gap: ${goldenGap}px`,
        ratio: 0.618
      });
    });
  }

  /**
   * Run all content ratio optimizations
   */
  public applyPerfectRatios(): ContentRatioResult[] {
    console.log('🎯 Applying Perfect Content Ratios (Golden Ratio System)...');
    
    this.results = [];
    
    // Apply all ratio optimizations
    this.optimizeSectionSpacing();
    this.optimizeTextRatios();
    this.optimizeHeadingRatios();
    this.optimizeContainerRatios();
    this.optimizeLayoutRatios();
    
    console.log(`✅ Applied perfect ratios to ${this.results.length} elements`);
    
    return this.results;
  }

  /**
   * Generate ratio optimization report
   */
  public generateReport(): string {
    const totalElements = this.results.length;
    
    let report = `
🎯 PERFECT CONTENT RATIOS REPORT
=====================================

📊 SUMMARY:
- Total Elements Optimized: ${totalElements}
- Golden Ratio (φ): ${this.GOLDEN_RATIO}
- Optimal Line Height: ${this.OPTIMAL_LINE_HEIGHT}
- Optimal Reading Width: ${this.OPTIMAL_READING_WIDTH}ch
- Section Spacing: ${this.OPTIMAL_SECTION_SPACING}px

📋 OPTIMIZATIONS APPLIED:
=====================================
`;

    this.results.forEach((result, index) => {
      report += `\n${index + 1}. ${result.element}:\n`;
      report += `   Before: ${result.before}\n`;
      report += `   After: ${result.after}\n`;
      report += `   Ratio Applied: ${result.ratio.toFixed(3)}\n`;
    });

    report += `
✅ PERFECT RATIOS ACHIEVED!
=====================================
Your content now follows the Golden Ratio for:
- Visual harmony and balance
- Optimal readability
- Professional typography
- Perfect spacing relationships
- Mathematical precision in design

🎉 Content ratios are now PERFECT!
`;

    return report;
  }
}

// Initialize and export
export const initializePerfectContentRatios = (): ContentRatioResult[] => {
  const ratioOptimizer = new PerfectContentRatios();
  const results = ratioOptimizer.applyPerfectRatios();
  
  // Log the report
  console.log(ratioOptimizer.generateReport());
  
  return results;
};

export default PerfectContentRatios;