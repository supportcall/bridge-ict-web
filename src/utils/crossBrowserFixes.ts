// ESSENTIAL CROSS-BROWSER COMPATIBILITY FIXES
// Minimal CSS fallbacks and browser-specific fixes

export const applyCrossBrowserFixes = (): void => {
  try {
    // Only apply if fixes don't already exist
    if (document.querySelector('#cross-browser-fixes')) return;

    const style = document.createElement('style');
    style.id = 'cross-browser-fixes';
    style.textContent = `
      /* ESSENTIAL CROSS-BROWSER COMPATIBILITY */
      
      /* Box sizing reset for all browsers */
      *, *::before, *::after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      
      /* Flexbox fallbacks for older browsers */
      .flex {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
      
      /* Grid fallbacks */
      .grid {
        display: -ms-grid;
        display: grid;
      }
      
      /* Smooth scrolling for all browsers */
      html {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Transform optimization */
      .transform {
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
      }
      
      /* Font smoothing for better text rendering */
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
      
      /* Input/button appearance reset */
      input, textarea, button, select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      
      /* iOS specific fixes */
      @supports (-webkit-overflow-scrolling: touch) {
        body {
          -webkit-text-size-adjust: 100%;
        }
        
        input[type="text"], input[type="email"], textarea {
          border-radius: 0;
        }
      }
      
      /* Focus management for accessibility */
      *:focus {
        outline-offset: 2px;
      }
      
      /* Prevent zoom on input focus (mobile) */
      @media screen and (max-width: 768px) {
        input, textarea, select {
          font-size: 16px;
        }
      }
    `;
    
    document.head.appendChild(style);
    console.log('✅ Cross-browser compatibility fixes applied');
    
  } catch (error) {
    console.warn('⚠️ Cross-browser fixes failed (non-critical):', error);
  }
};

export default applyCrossBrowserFixes;