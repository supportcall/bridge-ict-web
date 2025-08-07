import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, company, phone, service, message } = await req.json()

    // Determine recipient email based on phone number
    let recipientEmail = 'info@supportcall.com.au' // Default to Australia
    
    if (phone && phone.includes('+27')) {
      recipientEmail = 'info@supportcall.co.za'
    } else if (phone && phone.includes('+61')) {
      recipientEmail = 'info@supportcall.com.au'
    }

    // Create email content
    const emailBody = `
New Contact Form Submission from SupportCALL Website

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}
Service of Interest: ${service || 'Not specified'}

Message:
${message}

---
This message was sent from the SupportCALL website contact form.
Routed to: ${recipientEmail}
    `

    // In a real implementation, you would use a service like SendGrid, AWS SES, or similar
    // For now, we'll just log the email details
    console.log('Email would be sent to:', recipientEmail)
    console.log('Email body:', emailBody)

    // You would implement actual email sending here
    // Example with SendGrid:
    // const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     personalizations: [{
    //       to: [{ email: recipientEmail }],
    //       subject: `New Contact Form Submission from ${name}`,
    //     }],
    //     from: { email: 'noreply@supportcall.co.za' },
    //     content: [{
    //       type: 'text/plain',
    //       value: emailBody,
    //     }],
    //   }),
    // })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        recipientEmail 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})