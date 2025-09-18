/**
 * Security utilities and best practices implementation
 */

// Content Security Policy configuration
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", "data:", "blob:"],
  'connect-src': ["'self'", "https://calendar.app.google", "https://mail.google.com"],
  'font-src': ["'self'"],
  'frame-src': ["'self'", "https://calendar.app.google"],
  'media-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'", "mailto:"],
  'frame-ancestors': ["'none'"]
};

// Input sanitization for form submissions
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limit length
};

// Email validation with security considerations
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Phone number validation for international numbers
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone);
};

// Rate limiting for form submissions
const submissionTimes = new Map<string, number>();

export const checkRateLimit = (identifier: string, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const lastSubmission = submissionTimes.get(identifier);
  
  if (lastSubmission && (now - lastSubmission) < windowMs) {
    return false; // Rate limited
  }
  
  submissionTimes.set(identifier, now);
  
  // Clean up old entries
  submissionTimes.forEach((time, key) => {
    if (now - time > windowMs) {
      submissionTimes.delete(key);
    }
  });
  
  return true; // Not rate limited
};

// Secure form submission handling
export const secureFormSubmit = (formData: Record<string, string>) => {
  // Sanitize all inputs
  const sanitizedData = Object.entries(formData).reduce((acc, [key, value]) => {
    acc[key] = sanitizeInput(value);
    return acc;
  }, {} as Record<string, string>);
  
  // Validate required fields
  if (sanitizedData.email && !validateEmail(sanitizedData.email)) {
    throw new Error('Invalid email format');
  }
  
  if (sanitizedData.phone && !validatePhone(sanitizedData.phone)) {
    throw new Error('Invalid phone number format');
  }
  
  // Check rate limiting
  const identifier = sanitizedData.email || sanitizedData.phone || 'anonymous';
  if (!checkRateLimit(identifier)) {
    throw new Error('Please wait before submitting again');
  }
  
  return sanitizedData;
};

// HTTPS enforcement and security headers check
export const enforceSecurityBestPractices = () => {
  // Ensure HTTPS in production
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
  }
  
  // Check for security headers (informational)
  const securityHeaders = [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Referrer-Policy'
  ];
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Security headers should be configured on server:', securityHeaders);
  }
};

// Data protection utilities
export const protectSensitiveData = (data: string): string => {
  // Basic data protection for logging/debugging
  if (data.includes('@')) {
    // Email protection
    const [local, domain] = data.split('@');
    return `${local.substring(0, 2)}***@${domain}`;
  }
  
  if (data.startsWith('+')) {
    // Phone protection
    return `${data.substring(0, 4)}***${data.substring(data.length - 3)}`;
  }
  
  return data.substring(0, 3) + '***';
};

// Secure cookie handling (if needed for session management)
export const setSecureCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict${secure}`;
};

// Initialize security measures
export const initializeSecurity = () => {
  enforceSecurityBestPractices();
  
  // Add security event listeners
  window.addEventListener('beforeunload', () => {
    // Clear sensitive data if any
    submissionTimes.clear();
  });
  
  // Monitor for potential security issues
  window.addEventListener('error', (event) => {
    if (event.message.includes('script') || event.message.includes('unsafe')) {
      console.warn('Potential security issue detected:', protectSensitiveData(event.message));
    }
  });
};