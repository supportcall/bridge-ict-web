import { useToast } from "@/hooks/use-toast";

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
  
  // Format subject and body
  const subject = `SupportCALL Web Form: ${formTitle} | ${userEmail}`;
  const body = formatEmailBody(formTitle, formData);
  
  // Create mailto link
  const mailtoLink = `mailto:${recipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  try {
    // Try to open mailto
    const beforeUnload = () => {
      // This will be called if user navigates away (which happens when mailto opens successfully)
      window.removeEventListener('beforeunload', beforeUnload);
      return null;
    };
    
    window.addEventListener('beforeunload', beforeUnload);
    
    // Set a flag to track if mailto was likely cancelled
    let mailtoFailed = false;
    
    // Set a timeout to check if we're still on the page (meaning mailto likely failed)
    const timeoutId = setTimeout(() => {
      window.removeEventListener('beforeunload', beforeUnload);
      mailtoFailed = true;
      
      // Fallback: Copy email content to clipboard instead of popup
      showFallbackDialog(subject, body, recipients, csvData);
    }, 2000); // Wait 2 seconds
    
    // Try to trigger mailto
    window.location.href = mailtoLink;
    
    // Clear timeout if page unloads (meaning mailto worked)
    window.addEventListener('unload', () => {
      clearTimeout(timeoutId);
    });
    
    return true;
  } catch (error) {
    console.error('Error with mailto:', error);
    // Copy to clipboard immediately on error instead of popup
    showFallbackDialog(subject, body, recipients, csvData);
    return false;
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

const showFallbackDialog = (subject: string, body: string, recipients: string[], csvData?: Array<Record<string, string>>) => {
  // Instead of popup, use browser's built-in copy functionality and console log
  const emailContent = `
To: ${recipients.join(', ')}
Subject: ${subject}

${body}

${csvData ? `\n\nForm Data (CSV):\n${convertToCSV(csvData)}` : ''}
  `;
  
  // Try to copy to clipboard
  navigator.clipboard.writeText(emailContent).then(() => {
    console.log('✅ Email content copied to clipboard:', emailContent);
    alert('Email content copied to clipboard! Please paste into your email client.');
  }).catch((err) => {
    console.error('Failed to copy to clipboard:', err);
    console.log('📧 Email content for manual copying:', emailContent);
    // Fallback: Create a temporary text area for selection
    const textarea = document.createElement('textarea');
    textarea.value = emailContent;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Email content selected. Please check console or clipboard.');
  });
};