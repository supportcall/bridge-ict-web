# PHP Email Setup Instructions

## Overview
All contact forms now submit to a PHP script (`send-email.php`) that handles email sending via your SMTP server.

## Deployment Steps

### Option 1: Same Server (Recommended)
If your site is hosted on a server with PHP support:
1. The `send-email.php` file is already in the `/public` folder
2. It will automatically be accessible at `https://yourdomain.com/send-email.php`
3. No additional setup needed!

### Option 2: Separate PHP Hosting
If using static hosting (like Netlify, Vercel), you need to host the PHP file separately:

1. **Get Free PHP Hosting** (choose one):
   - InfinityFree: https://infinityfree.com (100% free)
   - 000webhost: https://www.000webhost.com (free tier available)
   - Awardspace: https://www.awardspace.com (free tier available)

2. **Upload the PHP File**:
   - Upload `public/send-email.php` to your PHP hosting
   - Note the URL (e.g., `https://yourphphost.com/send-email.php`)

3. **Update the Form Configuration**:
   - Open `src/utils/phpFormSubmission.ts`
   - Change line 9 from:
     ```typescript
     const phpEndpoint = `${window.location.origin}/send-email.php`;
     ```
     To:
     ```typescript
     const phpEndpoint = 'https://yourphphost.com/send-email.php';
     ```

## SMTP Configuration
The PHP script is already configured with your SMTP settings:
- **Host**: supportcall.com.au
- **Port**: 465 (SSL/TLS)
- **Username**: info@supportcall.com.au
- **From Email**: info@supportcall.com.au
- **Recipients**: info@supportcall.com.au, info@supportcall.co.za, scmyhelp@gmail.com

## Testing
1. Visit your contact form
2. Fill out and submit
3. Check all three recipient emails for the submission
4. If it fails, check your PHP hosting error logs

## Security Note
Your SMTP password is in the PHP file. Since PHP executes server-side, the password is NOT visible to website visitors. However, make sure:
- The PHP file is never in a public GitHub repo
- Your hosting has proper file permissions set

## Troubleshooting
- **CORS Errors**: The PHP script includes CORS headers. If still getting errors, ensure your PHP host allows cross-origin requests.
- **No Email Received**: Check your SMTP credentials and ensure port 465 is not blocked by your hosting provider.
- **500 Error**: Check PHP error logs on your hosting panel for specific error messages.
