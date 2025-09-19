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
      
      // High-value engagement milestones - only if gtag is available
      if (typeof gtag !== 'undefined') {
        if (scrollPercent === 25) gtag('event', 'scroll_25_percent');
        if (scrollPercent === 50) gtag('event', 'scroll_50_percent');
        if (scrollPercent === 75) gtag('event', 'scroll_75_percent');
        if (scrollPercent === 100) gtag('event', 'scroll_complete');
      }
    }
  };
  
  // Track time on page
  const trackTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (typeof gtag !== 'undefined') {
      if (timeSpent === 30) gtag('event', 'engaged_30_seconds');
      if (timeSpent === 60) gtag('event', 'engaged_1_minute');
      if (timeSpent === 180) gtag('event', 'engaged_3_minutes');
      if (timeSpent === 300) gtag('event', 'highly_engaged_5_minutes');
    }
  };
  
  // Track interaction patterns
  const trackInteractions = (event: string, element: string) => {
    engagementScore += 10;
    if (typeof gtag !== 'undefined') {
      gtag('event', 'user_interaction', {
        interaction_type: event,
        element_type: element,
        engagement_score: engagementScore
      });
    }
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

// Exit intent tracking removed - no popups as per user request

export const optimizeCallsToAction = () => {
  // Dynamically enhance CTAs based on user behavior
  const ctaButtons = document.querySelectorAll('[data-cta], .cta-glow, button[variant="premium"]');
  
  ctaButtons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_hover', {
          cta_text: button.textContent?.trim() || 'unknown'
        });
      }
    });
    
    button.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
          cta_text: button.textContent?.trim() || 'unknown',
          cta_location: window.location.pathname
        });
      }
    });
  });
  
  // Urgency indicators removed - no additional UI elements as per user request
};

export const initializeMarketingOptimizations = () => {
  // Only initialize if gtag is available
  if (typeof gtag !== 'undefined') {
    trackUserEngagement();
    optimizeCallsToAction();
    
    gtag('event', 'marketing_optimizations_loaded');
  }
};

// Make gtag available globally if not already
declare global {
  function gtag(...args: any[]): void;
}