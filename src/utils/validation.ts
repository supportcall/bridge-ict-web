// Input validation and sanitization utilities

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML tags
    .slice(0, 1000); // Limit length
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 320; // RFC 5321 limit
};

export const validatePhone = (phone: string): boolean => {
  // Remove all non-digits to check length
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check for international format starting with + and country codes
  const internationalRegex = /^\+(?:27|61)[0-9]{8,12}$/;
  
  return internationalRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
  return nameRegex.test(name.trim());
};

export const validateCompany = (company: string): boolean => {
  if (!company.trim()) return true; // Optional field
  const companyRegex = /^[a-zA-Z0-9\s&.,'-]{2,100}$/;
  return companyRegex.test(company.trim());
};

export const validateMessage = (message: string): boolean => {
  const trimmed = message.trim();
  return trimmed.length >= 10 && trimmed.length <= 2000;
};

export const validateFormData = (formData: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}) => {
  const errors: Record<string, string> = {};

  if (!validateName(formData.name)) {
    errors.name = 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateCompany(formData.company)) {
    errors.company = 'Company name contains invalid characters or is too long';
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number starting with +27 (South Africa) or +61 (Australia)';
  }

  if (!formData.service.trim()) {
    errors.service = 'Please select a service';
  }

  if (!validateMessage(formData.message)) {
    errors.message = 'Message must be between 10 and 2000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// XSS prevention
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Rate limiting helper (client-side)
export class RateLimiter {
  private attempts: number[] = [];
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000 // 1 minute
  ) {}

  canAttempt(): boolean {
    const now = Date.now();
    this.attempts = this.attempts.filter(time => now - time < this.windowMs);
    
    if (this.attempts.length >= this.maxAttempts) {
      return false;
    }

    this.attempts.push(now);
    return true;
  }

  getTimeUntilReset(): number {
    if (this.attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...this.attempts);
    const timeUntilReset = this.windowMs - (Date.now() - oldestAttempt);
    
    return Math.max(0, timeUntilReset);
  }
}