// Advanced Marketing & Conversion Optimization
// Maximizes client acquisition and lead generation

export const trackUserEngagement = () => {
  let engagementScore = 0;
  const startTime = Date.now();
  
  // Track scroll depth
  let maxScroll = 0;
  const trackScroll = () => {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // High-value engagement milestones
      if (scrollPercent === 25) gtag('event', 'scroll_25_percent');
      if (scrollPercent === 50) gtag('event', 'scroll_50_percent');
      if (scrollPercent === 75) gtag('event', 'scroll_75_percent');
      if (scrollPercent === 100) gtag('event', 'scroll_complete');
    }
  };
  
  // Track time on page
  const trackTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (timeSpent === 30) gtag('event', 'engaged_30_seconds');
    if (timeSpent === 60) gtag('event', 'engaged_1_minute');
    if (timeSpent === 180) gtag('event', 'engaged_3_minutes');
    if (timeSpent === 300) gtag('event', 'highly_engaged_5_minutes');
  };
  
  // Track interaction patterns
  const trackInteractions = (event: string, element: string) => {
    engagementScore += 10;
    gtag('event', 'user_interaction', {
      interaction_type: event,
      element_type: element,
      engagement_score: engagementScore
    });
  };
  
  // Event listeners
  window.addEventListener('scroll', trackScroll, { passive: true });
  setInterval(trackTimeOnPage, 10000); // Check every 10 seconds
  
  // Track clicks on important elements
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('button, a, [data-track]')) {
      trackInteractions('click', target.tagName.toLowerCase());
    }
  });
  
  return { engagementScore, maxScroll };
};

export const implementExitIntentCapture = () => {
  let exitIntentShown = false;
  
  const showExitIntent = () => {
    if (!exitIntentShown) {
      exitIntentShown = true;
      gtag('event', 'exit_intent_triggered');
      
      // Create exit intent popup (subtle, professional)
      const exitPopup = document.createElement('div');
      exitPopup.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        ">
          <div style="
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          ">
            <h3 style="color: #0080CC; margin-bottom: 1rem; font-size: 1.5rem;">Wait! Don't Miss Your FREE Consultation</h3>
            <p style="color: #333; margin-bottom: 1.5rem;">Get a FREE ICT security assessment worth $500 before you go!</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
              <button onclick="this.closest('div').remove(); window.location.hash='contact';" style="
                background: #0080CC;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
              ">Get My FREE Assessment</button>
              <button onclick="this.closest('div').remove();" style="
                background: transparent;
                color: #666;
                border: 1px solid #ddd;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
              ">Maybe Later</button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(exitPopup);
      
      // Auto-remove after 30 seconds
      setTimeout(() => {
        if (exitPopup.parentNode) {
          exitPopup.remove();
        }
      }, 30000);
    }
  };
  
  // Desktop exit intent
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) {
      showExitIntent();
    }
  });
  
  // Mobile scroll-up detection
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY < lastScrollY && window.scrollY > 100) {
      showExitIntent();
    }
    lastScrollY = window.scrollY;
  }, { passive: true });
};

export const optimizeCallsToAction = () => {
  // Dynamically enhance CTAs based on user behavior
  const ctaButtons = document.querySelectorAll('[data-cta], .cta-glow, button[variant="premium"]');
  
  ctaButtons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gtag('event', 'cta_hover', {
        cta_text: button.textContent?.trim() || 'unknown'
      });
    });
    
    button.addEventListener('click', () => {
      gtag('event', 'cta_click', {
        cta_text: button.textContent?.trim() || 'unknown',
        cta_location: window.location.pathname
      });
    });
  });
  
  // Add urgency indicators to CTAs after 2 minutes
  setTimeout(() => {
    ctaButtons.forEach((button) => {
      if (button.textContent?.includes('FREE')) {
        const urgencyBadge = document.createElement('span');
        urgencyBadge.innerHTML = '🔥 Limited Time';
        urgencyBadge.style.cssText = `
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff4444;
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          animation: pulse 2s infinite;
        `;
        
        if (button.parentElement) {
          button.parentElement.style.position = 'relative';
          button.parentElement.appendChild(urgencyBadge);
        }
      }
    });
  }, 120000); // 2 minutes
};

export const initializeMarketingOptimizations = () => {
  // Only initialize if gtag is available
  if (typeof gtag !== 'undefined') {
    trackUserEngagement();
    implementExitIntentCapture();
    optimizeCallsToAction();
    
    gtag('event', 'marketing_optimizations_loaded');
  }
};

// Make gtag available globally if not already
declare global {
  function gtag(...args: any[]): void;
}