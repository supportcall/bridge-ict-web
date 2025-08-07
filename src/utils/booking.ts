// Booking utility functions for self-contained contact system

export const BOOKING_CONTACTS = {
  SA: { phone: '+27-87-822-2380', email: 'sa@supportcall.co.za', region: 'South Africa' },
  AU: { phone: '+61-2-9876-5432', email: 'au@supportcall.co.za', region: 'Australia' }
} as const;

export type Region = keyof typeof BOOKING_CONTACTS;

// Function to detect region based on phone number or default to showing options
export const detectRegion = (phoneNumber?: string): Region | null => {
  if (!phoneNumber) return null;
  
  if (phoneNumber.includes('+27') || phoneNumber.includes('+27')) return 'SA';
  if (phoneNumber.includes('+61') || phoneNumber.includes('+61')) return 'AU';
  
  return null;
};

// Function to open self-contained booking contact with region selection
export const openBooking = (preferredRegion?: Region) => {
  if (preferredRegion) {
    const contact = BOOKING_CONTACTS[preferredRegion];
    // Create self-contained contact dialog
    alert(`Contact ${contact.region} Office:\n\nPhone: ${contact.phone}\nEmail: ${contact.email}\n\nOr use the contact form on this website.`);
    return;
  }
  
  // Show region selection dialog
  const region = window.confirm(
    'Choose your region:\n\nOK = Australia (+61)\nCancel = South Africa (+27)'
  );
  
  const selectedRegion = region ? 'AU' : 'SA';
  const contact = BOOKING_CONTACTS[selectedRegion];
  alert(`Contact ${contact.region} Office:\n\nPhone: ${contact.phone}\nEmail: ${contact.email}\n\nOr use the contact form on this website.`);
};

// Function for direct booking contact info (when region is known)
export const getBookingContact = (region: Region) => {
  return BOOKING_CONTACTS[region];
};