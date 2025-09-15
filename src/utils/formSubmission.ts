import { toast } from "sonner";
import { secureFormSubmit, protectSensitiveData } from "./security";
import { validateFormData } from "./validation";

export interface FormSubmissionData {
  formTitle: string;
  userEmail: string;
  formData: Record<string, any>;
  recipients: string[];
  csvData?: Array<Record<string, string>>;
}

export const generateCSV = (data: Array<Record<string, string>>): string => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || '';
        // Escape quotes and wrap in quotes if contains comma, newline, or quote
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  return csvContent;
};

export const formatEmailBody = (formTitle: string, formData: Record<string, any>): string => {
  const timestamp = new Date().toLocaleString();
  
  let body = `
═══════════════════════════════════════════════════════════════
                     SUPPORTCALL WEB FORM
                        ${formTitle.toUpperCase()}
═══════════════════════════════════════════════════════════════

📋 FORM DETAILS:
──────────────────────────────────────────────────────────────
📅 Submitted: ${timestamp}
🌐 Source: SupportCALL Website
🔖 Form Type: ${formTitle}

`;

  // Group data by categories for better formatting
  const userDetails = ['name', 'surname', 'email', 'contact', 'company', 'website', 'location'];
  const surveyQuestions = [
    'satisfaction', 'response_time', 'knowledgeable', 'issue_resolution', 
    'recommendation', 'ease_of_reaching', 'communication_clarity', 
    'professionalism', 'contact_preference'
  ];
  const priceFields = Object.keys(formData).filter(key => key.startsWith('price_'));
  const serviceFields = Object.keys(formData).filter(key => key.startsWith('services[') || key.startsWith('ratings['));

  // User Details Section
  const userInfo = userDetails.filter(key => formData[key]);
  if (userInfo.length > 0) {
    body += `👤 USER DETAILS:
──────────────────────────────────────────────────────────────
`;
    userInfo.forEach(key => {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
      body += `📝 ${label.padEnd(20)}: ${formData[key]}\n`;
    });
    body += '\n';
  }

  // Survey Questions Section
  const surveyData = surveyQuestions.filter(key => formData[key]);
  if (surveyData.length > 0) {
    body += `📊 SURVEY RESPONSES:
──────────────────────────────────────────────────────────────
`;
    surveyData.forEach(key => {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
      body += `🔸 ${label.padEnd(25)}: ${formData[key]}\n`;
    });
    body += '\n';
  }

  // Services Interest Section
  if (serviceFields.length > 0) {
    body += `🔧 SERVICES INTEREST:
──────────────────────────────────────────────────────────────
`;
    serviceFields.forEach(key => {
      if (formData[key]) {
        const serviceName = key.replace(/^(services\[|ratings\[)/, '').replace(/\]$/, '');
        const type = key.startsWith('services[') ? 'Selected' : 'Rating';
        body += `🎯 ${serviceName.padEnd(30)}: ${type} - ${formData[key]}\n`;
      }
    });
    body += '\n';
  }

  // Pricing Section
  if (priceFields.length > 0) {
    body += `💰 PRICING FEEDBACK:
──────────────────────────────────────────────────────────────
`;
    priceFields.forEach(key => {
      if (formData[key]) {
        const label = key.replace('price_', '').replace(/_/g, ' ').toUpperCase();
        body += `💵 ${label.padEnd(40)}: R${formData[key]}\n`;
      }
    });
    body += '\n';
  }

  // Additional Information
  const additionalFields = Object.keys(formData).filter(key => 
    !userDetails.includes(key) && 
    !surveyQuestions.includes(key) && 
    !priceFields.includes(key) && 
    !serviceFields.includes(key) &&
    !['anonymous', 'contact_me', 'local_technician', 'human_verification'].includes(key) &&
    formData[key]
  );

  if (additionalFields.length > 0) {
    body += `📄 ADDITIONAL INFORMATION:
──────────────────────────────────────────────────────────────
`;
    additionalFields.forEach(key => {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
      body += `📋 ${label}:\n${formData[key]}\n\n`;
    });
  }

  // Preferences
  const preferences = [];
  if (formData.anonymous) preferences.push('✅ Remain Anonymous');
  if (formData.contact_me) preferences.push('✅ Wants to be contacted');
  if (formData.local_technician) preferences.push(`✅ Local technician needed: ${formData.local_technician}`);

  if (preferences.length > 0) {
    body += `⚙️ PREFERENCES:
──────────────────────────────────────────────────────────────
${preferences.join('\n')}

`;
  }

  body += `═══════════════════════════════════════════════════════════════
📧 This form was submitted via the SupportCALL website
🔒 All data is handled according to our privacy policy
═══════════════════════════════════════════════════════════════`;

  return body.trim();
};

export const submitFormWithFallback = async (data: FormSubmissionData): Promise<boolean> => {
  const { formTitle, userEmail, formData, recipients, csvData } = data;
  
  try {
    // Security validation first
    const sanitizedData = secureFormSubmit(formData);
    
    // Additional validation for completeness
    const validation = validateFormData({
      name: sanitizedData.name || '',
      email: sanitizedData.email || userEmail,
      company: sanitizedData.company || '',
      phone: sanitizedData.phone || sanitizedData.contact || '',
      service: sanitizedData.service || 'General Inquiry',
      message: sanitizedData.message || 'Web form submission'
    });
    
    if (!validation.isValid) {
      const errorMessages = Object.values(validation.errors).join(', ');
      toast.error(`Form validation failed: ${errorMessages}`);
      return false;
    }
    
    // Format subject and body with sanitized data
    const subject = `SupportCALL Web Form: ${formTitle} | ${protectSensitiveData(userEmail)}`;
    const body = formatEmailBody(formTitle, sanitizedData);
    
    // Create secure mailto link with length validation (use semicolons for Outlook compatibility)
    const mailtoLink = `mailto:${recipients.join(';')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Check if mailto link is too long (most email clients have limits)
    if (mailtoLink.length > 2000) {
      toast.warning("Form data is large, using clipboard fallback for better compatibility");
      return await handleFallbackSubmission(subject, body, recipients, csvData);
    }
    
    // Try to open mailto with modern approach
    window.open(mailtoLink, '_self');
    
    // Set a timeout to check if mailto worked
    const timeoutId = setTimeout(async () => {
      // If we're still here after 3 seconds, mailto likely failed
      toast.info("Opening clipboard fallback for better compatibility");
      await handleFallbackSubmission(subject, body, recipients, csvData);
    }, 3000);
    
    // Clear timeout if page unloads (meaning mailto worked)
    window.addEventListener('beforeunload', () => {
      clearTimeout(timeoutId);
    }, { once: true });
    
    return true;
    
  } catch (error) {
    console.error('Secure form submission error:', protectSensitiveData(error?.toString() || 'Unknown error'));
    toast.error("Form submission failed, trying clipboard fallback");
    
    // Create fallback data for error case
    const subject = `SupportCALL Web Form: ${formTitle} | ${protectSensitiveData(userEmail)}`;
    const body = formatEmailBody(formTitle, formData);
    return await handleFallbackSubmission(subject, body, recipients, csvData);
  }
};

const convertToCSV = (data: Array<Record<string, string>>): string => {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header] || '';
      // Escape quotes and wrap in quotes if contains comma
      return value.includes(',') ? `"${value.replace(/"/g, '""')}"` : value;
    }).join(',')
  );
  
  return [csvHeaders, ...csvRows].join('\n');
};

// Modern clipboard handling without popups or deprecated APIs
const handleFallbackSubmission = async (subject: string, body: string, recipients: string[], csvData?: Array<Record<string, string>>): Promise<boolean> => {
  const emailContent = `To: ${recipients.join('; ')}
Subject: ${subject}

${body}${csvData ? `\n\nForm Data (CSV):\n${convertToCSV(csvData)}` : ''}`;
  
  try {
    // Modern clipboard API with proper error handling
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(emailContent);
      toast.success("✅ Email content copied to clipboard! Please paste into your email client.", {
        duration: 5000,
        description: "Your form data is ready to send"
      });
      
      // Log securely without sensitive data
      console.log('✅ Form submission prepared for email client');
      return true;
    } else {
      // Fallback for non-secure contexts or older browsers
      return await legacyClipboardCopy(emailContent);
    }
  } catch (error) {
    console.error('Clipboard operation failed:', protectSensitiveData(error?.toString() || 'Unknown error'));
    return await legacyClipboardCopy(emailContent);
  }
};

// Legacy clipboard fallback without deprecated execCommand
const legacyClipboardCopy = async (content: string): Promise<boolean> => {
  try {
    // Create temporary text area for modern selection
    const textarea = document.createElement('textarea');
    textarea.value = content;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';  
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);
    
    // Select and focus
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    // Try modern copy first, fallback to legacy if needed
    let success = false;
    try {
      if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        success = document.execCommand('copy');
      }
    } catch (execError) {
      console.warn('Legacy copy method failed:', execError);
    }
    
    // Clean up
    document.body.removeChild(textarea);
    
    if (success) {
      toast.success("📋 Form content selected! Please paste into your email client.", {
        duration: 5000,
        description: "Your form data is ready to send"
      });
      return true;
    } else {
      // Final fallback - instruct user manually
      toast.error("Unable to copy automatically. Please check browser console for email content.", {
        duration: 7000,
        description: "Form data logged for manual copying"
      });
      console.log('📧 Manual copy required - Email content:', content);
      return false;
    }
  } catch (error) {
    toast.error("Form submission requires manual handling. Check console for details.", {
      duration: 7000
    });
    console.error('All clipboard methods failed:', protectSensitiveData(error?.toString() || 'Unknown error'));
    console.log('📧 Email content for manual handling:', content);
    return false;
  }
};