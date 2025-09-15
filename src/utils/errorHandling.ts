/**
 * Error handling utilities for external services and self-contained operation
 */

import { toast } from "sonner";

// Fallback contact information when external services fail
export const FALLBACK_CONTACT = {
  SA: {
    phone: '+27 (0)87 822 2380',
    email: 'info@supportcall.co.za',
    address: 'Coordination Centre: Durban, South Africa'
  },
  AU: {
    phone: '+61 (0)4 9933 5679', 
    email: 'info@supportcall.com.au',
    address: 'Coordination Centre: Launceston, Australia'
  }
};

// Check if external service is available
export const checkServiceAvailability = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { 
      method: 'HEAD', 
      mode: 'no-cors',
      cache: 'no-cache'
    });
    return true;
  } catch (error) {
    console.warn(`External service unavailable: ${url}`);
    return false;
  }
};

// Graceful degradation for booking systems
export const handleBookingFailure = (region: 'SA' | 'AU') => {
  const contact = FALLBACK_CONTACT[region];
  const message = `Booking system temporarily unavailable.

Please contact us directly:
Phone: ${contact.phone}
Email: ${contact.email}

We'll get back to you within 24 hours to schedule your consultation.`;
  
  // Use toast instead of alert popup
  toast.error("Booking system unavailable", {
    description: message,
    duration: 10000,
    action: {
      label: "Copy Contact",
      onClick: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`${contact.phone} | ${contact.email}`).catch(() => {});
        }
      }
    }
  });
};

// Handle external link failures gracefully
export const safeExternalLink = (url: string, fallbackAction?: () => void) => {
  try {
    // Try to open the link
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.warn(`Failed to open external link: ${url}`);
    
    if (fallbackAction) {
      fallbackAction();
    } else {
      // Fallback: copy URL to clipboard and notify user with toast
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          toast.success("Link copied to clipboard!", {
            description: `Please paste this into your browser: ${url}`,
            duration: 5000
          });
        }).catch(() => {
          toast.info("Please visit manually", {
            description: url,
            duration: 5000
          });
        });
      } else {
        toast.info("Please visit manually", {
          description: url,
          duration: 5000
        });
      }
    }
  }
};

// Offline detection and messaging
export const handleOfflineMode = () => {
  if (!navigator.onLine) {
    const offlineMessage = `
You appear to be offline. 

Core site functionality is available, but some features requiring internet connectivity may be limited:
- External links and forms
- Google Calendar booking
- Live maps

Contact us directly:
SA: ${FALLBACK_CONTACT.SA.phone}
AU: ${FALLBACK_CONTACT.AU.phone}
    `.trim();
    
    console.warn('Offline mode detected');
    return offlineMessage;
  }
  return null;
};

// Initialize error handling
export const initializeErrorHandling = () => {
  // Handle offline/online events
  window.addEventListener('offline', () => {
    console.warn('Application is now offline');
  });
  
  window.addEventListener('online', () => {
    console.log('Application is back online');
  });
  
  // Global error handler for unhandled promises
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault(); // Prevent browser console error
  });
  
  // Global error handler
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });
};