// Perfect Content Ratios Based on Golden Ratio and Psychological Principles
// Optimizes content hierarchy and visual rhythm for maximum user engagement

// Golden ratio constant (φ = 1.618)
const GOLDEN_RATIO = 1.618;

// 1. Optimize section ratios using golden ratio
const optimizeSectionRatios = () => {
  const sections = document.querySelectorAll('section[id]');
  sections.forEach((section, index) => {
    const element = section as HTMLElement;
    
    // Apply golden ratio padding for visual rhythm
    const basePadding = 80; // 5rem in pixels
    const padding = Math.round(basePadding * Math.pow(GOLDEN_RATIO, index % 3 - 1));
    
    element.style.setProperty('--section-padding-y', `${Math.max(padding, 40)}px`);
    element.style.setProperty('--section-padding-x', `${Math.max(padding * 0.6, 24)}px`);
    
    // Set CSS variables for perfect content width ratios
    element.style.setProperty('--content-width', '65ch'); // Optimal reading width
    element.style.setProperty('--content-max-width', `${Math.round(1200 / GOLDEN_RATIO)}px`);
  });
};

// 2. Optimize text ratios for perfect readability
const optimizeTextRatios = () => {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      /* Perfect typography ratios based on golden ratio */
      --text-scale-ratio: ${GOLDEN_RATIO};
      --text-base-size: 1rem;
      --text-small: calc(var(--text-base-size) / var(--text-scale-ratio));
      --text-large: calc(var(--text-base-size) * var(--text-scale-ratio));
      --text-xl: calc(var(--text-large) * var(--text-scale-ratio));
      --text-xxl: calc(var(--text-xl) * var(--text-scale-ratio));
      
      /* Perfect content width ratios */
      --content-narrow: 45ch;
      --content-optimal: 65ch;
      --content-wide: 85ch;
      
      /* Perfect layout grid ratios */
      --grid-narrow: 320px;
      --grid-medium: calc(320px * var(--text-scale-ratio));
      --grid-wide: calc(320px * var(--text-scale-ratio) * var(--text-scale-ratio));
      
      /* Perfect aspect ratios */
      --aspect-golden: ${GOLDEN_RATIO}/1;
      --aspect-card: 3/4;
      --aspect-hero: 16/9;
      
      /* Perfect spacing ratios */
      --space-xs: 0.25rem;
      --space-sm: calc(var(--space-xs) * var(--text-scale-ratio));
      --space-md: calc(var(--space-sm) * var(--text-scale-ratio));
      --space-lg: calc(var(--space-md) * var(--text-scale-ratio));
      --space-xl: calc(var(--space-lg) * var(--text-scale-ratio));
      --space-xxl: calc(var(--space-xl) * var(--text-scale-ratio));
    }
    
    /* Apply perfect ratios to content elements */
    .perfect-content-width {
      max-width: var(--content-optimal);
      margin-left: auto;
      margin-right: auto;
    }
    
    .perfect-text-hierarchy h1 {
      font-size: var(--text-xxl);
      line-height: calc(1 / var(--text-scale-ratio) + 1);
      margin-bottom: var(--space-lg);
    }
    
    .perfect-text-hierarchy h2 {
      font-size: var(--text-xl);
      line-height: calc(1 / var(--text-scale-ratio) + 1.1);
      margin-bottom: var(--space-md);
    }
    
    .perfect-text-hierarchy h3 {
      font-size: var(--text-large);
      line-height: calc(1 / var(--text-scale-ratio) + 1.2);
      margin-bottom: var(--space-sm);
    }
    
    .perfect-text-hierarchy p {
      font-size: var(--text-base-size);
      line-height: var(--text-scale-ratio);
      margin-bottom: var(--space-md);
    }
    
    /* Responsive adjustments maintaining ratios */
    @media (max-width: 768px) {
      :root {
        --text-base-size: 0.875rem;
      }
      
      .perfect-content-width {
        max-width: var(--content-narrow);
        padding-left: var(--space-md);
        padding-right: var(--space-md);
      }
    }
    
    @media (max-width: 480px) {
      :root {
        --text-base-size: 0.8125rem;
      }
    }
  `;
  document.head.appendChild(style);
};

// 3. Optimize visual hierarchy using 60-30-10 rule and golden ratio
const optimizeVisualHierarchy = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Perfect 60-30-10 color distribution for visual hierarchy */
    .perfect-60-30-10 {
      /* 60% - Primary content area */
      --primary-area: 60%;
      /* 30% - Secondary elements */
      --secondary-area: 30%;
      /* 10% - Accent elements */
      --accent-area: 10%;
    }
    
    /* Perfect content-to-whitespace ratio (golden ratio) */
    .perfect-whitespace {
      --content-ratio: ${100 / GOLDEN_RATIO}%;
      --whitespace-ratio: ${100 - (100 / GOLDEN_RATIO)}%;
    }
    
    /* Perfect button ratios */
    .perfect-button {
      padding: calc(var(--space-sm) * var(--text-scale-ratio)) calc(var(--space-md) * var(--text-scale-ratio));
      border-radius: calc(var(--space-xs) * var(--text-scale-ratio));
      font-size: var(--text-base-size);
      line-height: 1;
    }
    
    .perfect-button-large {
      padding: calc(var(--space-md) * var(--text-scale-ratio)) calc(var(--space-lg) * var(--text-scale-ratio));
      font-size: var(--text-large);
    }
  `;
  document.head.appendChild(style);
};

// 4. Apply content priority using 3-2-1 system
const applyContentPriority = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Perfect 3-2-1 content priority system */
    .content-priority-1 {
      /* Highest priority - 3x visual weight */
      font-weight: 700;
      font-size: var(--text-xxl);
      color: hsl(var(--foreground));
      margin-bottom: var(--space-xl);
    }
    
    .content-priority-2 {
      /* Medium priority - 2x visual weight */
      font-weight: 600;
      font-size: var(--text-xl);
      color: hsl(var(--foreground) / 0.9);
      margin-bottom: var(--space-lg);
    }
    
    .content-priority-3 {
      /* Lower priority - 1x visual weight */
      font-weight: 400;
      font-size: var(--text-base-size);
      color: hsl(var(--muted-foreground));
      margin-bottom: var(--space-md);
    }
    
    /* Perfect grid layouts using golden ratio */
    .perfect-grid-2 {
      display: grid;
      grid-template-columns: ${GOLDEN_RATIO}fr 1fr;
      gap: var(--space-lg);
    }
    
    .perfect-grid-3 {
      display: grid;
      grid-template-columns: ${GOLDEN_RATIO}fr 1fr ${GOLDEN_RATIO}fr;
      gap: var(--space-md);
    }
    
    /* Perfect card ratios */
    .perfect-card {
      aspect-ratio: var(--aspect-card);
      padding: var(--space-lg);
      border-radius: calc(var(--radius) / var(--text-scale-ratio));
    }
    
    .perfect-card-golden {
      aspect-ratio: var(--aspect-golden);
    }
  `;
  document.head.appendChild(style);
};

// Master function to apply all perfect content ratios
export const optimizeContentRatios = () => {
  optimizeSectionRatios();
  optimizeTextRatios();
  optimizeVisualHierarchy();
  applyContentPriority();
};