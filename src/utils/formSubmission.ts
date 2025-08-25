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
      
      // Fallback: Show user the formatted email content to copy/paste
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
    // Show fallback immediately on error
    showFallbackDialog(subject, body, recipients, csvData);
    return false;
  }
};

const showFallbackDialog = (subject: string, body: string, recipients: string[], csvData?: Array<Record<string, string>>) => {
  // Create a modal with the email content for user to copy
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    border-radius: 8px;
    padding: 30px;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    color: #333;
  `;
  
  // Generate CSV download link if CSV data exists
  let csvDownloadHtml = '';
  if (csvData && csvData.length > 0) {
    const csvContent = generateCSV(csvData);
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    csvDownloadHtml = `
      <div style="margin: 20px 0; padding: 15px; background: #f0f9ff; border-radius: 6px;">
        <h4 style="margin: 0 0 10px 0; color: #0369a1;">📊 CSV Data Available</h4>
        <a href="${csvUrl}" download="supportcall-form-data.csv" 
           style="display: inline-block; padding: 8px 16px; background: #0369a1; color: white; text-decoration: none; border-radius: 4px; font-weight: 500;">
          📥 Download CSV Data
        </a>
      </div>
    `;
  }
  
  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 25px;">
      <h2 style="color: #dc2626; margin: 0 0 10px 0;">⚠️ Email Client Issue</h2>
      <p style="margin: 0; color: #666;">Your email client didn't open. Please copy the information below and email it manually.</p>
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3 style="margin: 0 0 10px 0; color: #0369a1;">📧 Email Recipients:</h3>
      <div style="background: #f8fafc; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 14px;">
        ${recipients.join(', ')}
      </div>
      <button onclick="navigator.clipboard.writeText('${recipients.join(', ')}')" 
              style="margin-top: 8px; padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
        📋 Copy Recipients
      </button>
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3 style="margin: 0 0 10px 0; color: #0369a1;">📝 Subject Line:</h3>
      <div style="background: #f8fafc; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 14px;">
        ${subject}
      </div>
      <button onclick="navigator.clipboard.writeText('${subject.replace(/'/g, "\\'")}')" 
              style="margin-top: 8px; padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
        📋 Copy Subject
      </button>
    </div>
    
    <div style="margin-bottom: 25px;">
      <h3 style="margin: 0 0 10px 0; color: #0369a1;">📄 Email Body:</h3>
      <textarea readonly style="width: 100%; height: 250px; padding: 12px; border: 2px solid #e5e7eb; border-radius: 6px; font-family: monospace; font-size: 12px; background: #f8fafc; resize: vertical;">${body}</textarea>
      <button onclick="navigator.clipboard.writeText(this.previousElementSibling.value)" 
              style="margin-top: 8px; padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
        📋 Copy Email Body
      </button>
    </div>
    
    ${csvDownloadHtml}
    
    <div style="text-align: center; margin-top: 25px;">
      <button onclick="this.closest('[style*=\"fixed\"]').remove()" 
              style="padding: 12px 24px; background: #dc2626; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer;">
        ✖️ Close
      </button>
    </div>
  `;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  // Close on background click
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  };
};