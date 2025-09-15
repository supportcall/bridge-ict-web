// Booking utility functions for regional Google Calendar links
import { handleBookingFailure } from './errorHandling';
import { toast } from "sonner";

export const BOOKING_LINKS = {
  SA: 'https://calendar.app.google/BkHkcJArVgXqQFJd8', // South African bookings
  AU: 'https://calendar.app.google/x4RDTFBDNQocWEa56'  // Australian bookings
} as const;

export type Region = keyof typeof BOOKING_LINKS;

// Function to detect region based on phone number or default to showing options
export const detectRegion = (phoneNumber?: string): Region | null => {
  if (!phoneNumber) return null;
  
  if (phoneNumber.includes('+27') || phoneNumber.includes('+27')) return 'SA';
  if (phoneNumber.includes('+61') || phoneNumber.includes('+61')) return 'AU';
  
  return null;
};

/**
 * Determine user's likely region based on timezone
 * Fallback: defaults to SA if timezone detection fails
 */
const detectUserRegion = (): Region => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone.includes('Australia') ? 'AU' : 'SA';
  } catch {
    return 'SA'; // Default fallback
  }
};

/**
 * Opens booking calendar with error handling and fallbacks - no popups
 */
export const openBooking = (preferredRegion?: Region) => {
  try {
    if (preferredRegion) {
      window.open(BOOKING_LINKS[preferredRegion], '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Use toast for region selection instead of confirm popup
    toast.message("Choose your region for booking:", {
      duration: 8000,
      action: {
        label: "Australia (+61)",
        onClick: () => {
          window.open(BOOKING_LINKS.AU, '_blank', 'noopener,noreferrer');
        }
      },
      cancel: {
        label: "South Africa (+27)",
        onClick: () => {
          window.open(BOOKING_LINKS.SA, '_blank', 'noopener,noreferrer');
        }
      }
    });
    
  } catch (error) {
    console.error('Booking system failed:', error);
    
    // Fallback to region detection for error handling
    const region = preferredRegion || detectUserRegion();
    handleBookingFailure(region);
  }
};

// Function for direct booking links (when region is known)
export const getBookingLink = (region: Region): string => {
  return BOOKING_LINKS[region];
};