// Booking utility functions for regional Google Calendar links

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

// Function to open booking with region selection dialog
export const openBooking = (preferredRegion?: Region) => {
  if (preferredRegion) {
    window.open(BOOKING_LINKS[preferredRegion], '_blank');
    return;
  }
  
  // Show region selection dialog
  const region = window.confirm(
    'Choose your region:\n\nOK = Australia (+61)\nCancel = South Africa (+27)'
  );
  
  const selectedRegion = region ? 'AU' : 'SA';
  window.open(BOOKING_LINKS[selectedRegion], '_blank');
};

// Function for direct booking links (when region is known)
export const getBookingLink = (region: Region): string => {
  return BOOKING_LINKS[region];
};