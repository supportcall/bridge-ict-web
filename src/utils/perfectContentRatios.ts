// Perfect Content Ratios - Ensures ultimate perfect content balance
// Golden ratio and psychological principles for maximum engagement

export const optimizeContentRatios = () => {
  console.log('📐 Optimizing content ratios for perfect balance...');

  // Golden ratio calculations (1.618:1)
  const GOLDEN_RATIO = 1.618;
  const INVERSE_GOLDEN_RATIO = 0.618;

  // Apply golden ratio to content sections
  const optimizeSectionRatios = () => {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach((section, index) => {
      const element = section as HTMLElement;
      
      // Calculate optimal padding based on golden ratio
      const baseSpacing = 80; // Base spacing in pixels
      const goldenSpacing = Math.round(baseSpacing * GOLDEN_RATIO);
      const inverseSpacing = Math.round(baseSpacing * INVERSE_GOLDEN_RATIO);
      
      // Apply different ratios to create visual rhythm
      if (index % 2 === 0) {
        element.style.paddingTop = `${goldenSpacing}px`;
        element.style.paddingBottom = `${inverseSpacing}px`;
      } else {
        element.style.paddingTop = `${inverseSpacing}px`;
        element.style.paddingBottom = `${goldenSpacing}px`;
      }
      
      // Apply responsive golden ratio
      element.style.setProperty('--section-ratio', `${GOLDEN_RATIO}`);
    });
  };

  // Optimize text content ratios
  const optimizeTextRatios = () => {
    const style = document.createElement('style');
    style.textContent = `
      /* Perfect typography ratios based on golden ratio */
      :root {
        --text-ratio-1: 1em;
        --text-ratio-2: ${GOLDEN_RATIO}em;
        --text-ratio-3: ${GOLDEN_RATIO * GOLDEN_RATIO}em;
        --text-ratio-4: ${Math.pow(GOLDEN_RATIO, 3)}em;
      }
      
      /* Apply perfect spacing ratios */
      h1 {
        font-size: var(--text-ratio-4);
        line-height: ${INVERSE_GOLDEN_RATIO + 0.2};
        margin-bottom: calc(var(--text-ratio-2) * 0.5);
      }
      
      h2 {
        font-size: var(--text-ratio-3);
        line-height: ${INVERSE_GOLDEN_RATIO + 0.3};
        margin-bottom: calc(var(--text-ratio-1) * 0.8);
      }
      
      h3 {
        font-size: var(--text-ratio-2);
        line-height: ${INVERSE_GOLDEN_RATIO + 0.4};
        margin-bottom: calc(var(--text-ratio-1) * 0.6);
      }
      
      p {
        font-size: var(--text-ratio-1);
        line-height: ${GOLDEN_RATIO};
        margin-bottom: calc(var(--text-ratio-1) * 0.8);
      }
      
      /* Perfect content width ratios */
      .content-width {
        max-width: calc(100vw / ${GOLDEN_RATIO});
      }
      
      /* Sidebar to content ratios */
      .sidebar-layout {
        grid-template-columns: ${INVERSE_GOLDEN_RATIO}fr ${GOLDEN_RATIO}fr;
      }
      
      /* Image aspect ratios */
      .hero-image {
        aspect-ratio: ${GOLDEN_RATIO} / 1;
      }
      
      .card-image {
        aspect-ratio: ${INVERSE_GOLDEN_RATIO} / 1;
      }
      
      /* Perfect spacing system */
      .spacing-xs { margin: calc(var(--text-ratio-1) * 0.25); }
      .spacing-sm { margin: calc(var(--text-ratio-1) * 0.5); }
      .spacing-md { margin: var(--text-ratio-1); }
      .spacing-lg { margin: var(--text-ratio-2); }
      .spacing-xl { margin: var(--text-ratio-3); }
      
      /* Responsive golden ratio breakpoints */
      @media (max-width: 768px) {
        :root {
          --text-ratio-1: 0.9em;
          --text-ratio-2: ${GOLDEN_RATIO * 0.9}em;
          --text-ratio-3: ${GOLDEN_RATIO * GOLDEN_RATIO * 0.9}em;
          --text-ratio-4: ${Math.pow(GOLDEN_RATIO, 3) * 0.9}em;
        }
      }
      
      @media (max-width: 480px) {
        :root {
          --text-ratio-1: 0.8em;
          --text-ratio-2: ${GOLDEN_RATIO * 0.8}em;
          --text-ratio-3: ${GOLDEN_RATIO * GOLDEN_RATIO * 0.8}em;
          --text-ratio-4: ${Math.pow(GOLDEN_RATIO, 3) * 0.8}em;
        }
      }
    `;
    document.head.appendChild(style);
  };

  // Optimize visual hierarchy
  const optimizeVisualHierarchy = () => {
    // Apply 60-30-10 color rule for perfect balance
    const colorStyle = document.createElement('style');
    colorStyle.textContent = `
      /* Perfect color balance: 60% primary, 30% secondary, 10% accent */
      .color-balanced {
        background: 
          linear-gradient(
            135deg,
            hsl(var(--background)) 60%,
            hsl(var(--muted)) 30%,
            hsl(var(--accent)) 10%
          );
      }
      
      /* Content balance: 60% content, 40% whitespace */
      .content-balanced {
        padding: calc(40% / 2) 0;
      }
      
      /* Perfect button ratios */
      .btn-perfect {
        padding: calc(var(--text-ratio-1) * 0.6) calc(var(--text-ratio-2) * 0.8);
        border-radius: calc(var(--text-ratio-1) * 0.4);
      }
    `;
    document.head.appendChild(colorStyle);
  };

  // Apply 3-2-1 content priority system
  const applyContentPriority = () => {
    const priorityStyle = document.createElement('style');
    priorityStyle.textContent = `
      /* Content priority system based on visual weight */
      
      /* Priority 1: Hero/CTA - 50% visual weight */
      .priority-1 {
        font-weight: 700;
        font-size: calc(var(--text-ratio-4) * 1.2);
        color: hsl(var(--primary));
        margin: calc(var(--text-ratio-3)) 0;
      }
      
      /* Priority 2: Main content - 30% visual weight */
      .priority-2 {
        font-weight: 600;
        font-size: var(--text-ratio-2);
        color: hsl(var(--foreground));
        margin: calc(var(--text-ratio-2)) 0;
      }
      
      /* Priority 3: Supporting content - 20% visual weight */
      .priority-3 {
        font-weight: 400;
        font-size: var(--text-ratio-1);
        color: hsl(var(--muted-foreground));
        margin: calc(var(--text-ratio-1)) 0;
      }
      
      /* Perfect grid ratios */
      .grid-golden {
        grid-template-columns: repeat(auto-fit, minmax(${300 * INVERSE_GOLDEN_RATIO}px, 1fr));
        gap: calc(var(--text-ratio-2));
      }
      
      /* Perfect card ratios */
      .card-perfect {
        padding: calc(var(--text-ratio-2)) calc(var(--text-ratio-3));
        border-radius: calc(var(--text-ratio-1) * 0.5);
        box-shadow: 0 calc(var(--text-ratio-1) * 0.25) calc(var(--text-ratio-2)) rgba(0,0,0,0.1);
      }
    `;
    document.head.appendChild(priorityStyle);
  };

  // Execute all ratio optimizations
  optimizeSectionRatios();
  optimizeTextRatios();
  optimizeVisualHierarchy();
  applyContentPriority();

  console.log('✅ Perfect content ratios applied - ultimate balance achieved!');
};