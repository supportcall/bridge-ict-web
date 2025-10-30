<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// SMTP Configuration - Port 465 with SSL/TLS (Secure Recommended)
$smtpHost = 'supportcall.com.au';
$smtpPort = 465; // Using port 465 with direct SSL/TLS
$smtpUsername = 'info@supportcall.com.au';
$smtpPassword = '74Dhm28#74Dhm28#';
$fromEmail = 'info@supportcall.com.au';
$toEmails = ['info@supportcall.com.au', 'info@supportcall.co.za', 'scmyhelp@gmail.com'];

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON data']);
    exit;
}

// Sanitize inputs
function sanitize($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

// Build email content
$subject = isset($data['subject']) ? sanitize($data['subject']) : 'New Form Submission';

// Categorize fields for better organization
$contactInfo = [];
$requestDetails = [];
$additionalInfo = [];

foreach ($data as $key => $value) {
    if ($key !== 'subject' && $key !== 'form_type' && $key !== 'submitted_at') {
        $sanitizedKey = sanitize($key);
        $sanitizedValue = is_array($value) ? json_encode($value) : sanitize($value);
        $fieldLabel = ucfirst(str_replace('_', ' ', $sanitizedKey));
        
        // Categorize fields
        if (in_array($key, ['name', 'email', 'phone', 'contact', 'company', 'location'])) {
            $contactInfo[$fieldLabel] = $sanitizedValue;
        } elseif (in_array($key, ['message', 'service', 'budget', 'timeline', 'audience', 'currency'])) {
            $requestDetails[$fieldLabel] = $sanitizedValue;
        } else {
            $additionalInfo[$fieldLabel] = $sanitizedValue;
        }
    }
}

// Build professional HTML email
$emailBody = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: #ffffff; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px 20px; }
        .section { margin-bottom: 25px; }
        .section-title { color: #1e40af; font-size: 18px; font-weight: 600; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6; }
        .field-row { background: #f8fafc; padding: 12px 15px; margin-bottom: 8px; border-radius: 4px; border-left: 3px solid #3b82f6; }
        .field-label { font-weight: 600; color: #1e40af; display: inline-block; min-width: 120px; }
        .field-value { color: #334155; display: inline-block; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .timestamp { background: #eff6ff; padding: 12px; text-align: center; color: #1e40af; font-weight: 500; border-radius: 4px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>' . htmlspecialchars($subject) . '</h1>
        </div>
        <div class="content">';

if (!empty($contactInfo)) {
    $emailBody .= '<div class="section">
                <div class="section-title">Contact Information</div>';
    foreach ($contactInfo as $label => $value) {
        $emailBody .= '<div class="field-row">
                    <span class="field-label">' . htmlspecialchars($label) . ':</span>
                    <span class="field-value">' . htmlspecialchars($value) . '</span>
                </div>';
    }
    $emailBody .= '</div>';
}

if (!empty($requestDetails)) {
    $emailBody .= '<div class="section">
                <div class="section-title">Request Details</div>';
    foreach ($requestDetails as $label => $value) {
        $emailBody .= '<div class="field-row">
                    <span class="field-label">' . htmlspecialchars($label) . ':</span>
                    <span class="field-value">' . htmlspecialchars($value) . '</span>
                </div>';
    }
    $emailBody .= '</div>';
}

if (!empty($additionalInfo)) {
    $emailBody .= '<div class="section">
                <div class="section-title">Additional Information</div>';
    foreach ($additionalInfo as $label => $value) {
        $emailBody .= '<div class="field-row">
                    <span class="field-label">' . htmlspecialchars($label) . ':</span>
                    <span class="field-value">' . htmlspecialchars($value) . '</span>
                </div>';
    }
    $emailBody .= '</div>';
}

$emailBody .= '    <div class="timestamp">
                Submitted: ' . date('l, F j, Y \a\t g:i A') . '
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from the SupportCALL website contact form.</p>
            <p>&copy; ' . date('Y') . ' SupportCALL. All rights reserved.</p>
        </div>
    </div>
</body>
</html>';

// Create email headers
$headers = [
    'From: ' . $fromEmail,
    'Reply-To: ' . (isset($data['email']) ? sanitize($data['email']) : $fromEmail),
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8'
];

// Send via SMTP using fsockopen with direct SSL/TLS (port 465)
try {
    // Connect with SSL/TLS directly on port 465
    $socket = fsockopen('ssl://' . $smtpHost, $smtpPort, $errno, $errstr, 30);
    
    if (!$socket) {
        throw new Exception("Could not connect to SMTP server: $errstr ($errno)");
    }
    
    // Set timeout
    stream_set_timeout($socket, 30);
    
    // Read ALL server greeting lines (220) - some servers send multiple lines
    do {
        $response = fgets($socket, 1024);
        if ($response === false) {
            throw new Exception("Failed to read server greeting");
        }
        // Continue reading while we get 220 response codes with continuation (-)
        $continue = (strlen($response) >= 4 && substr($response, 0, 3) === '220' && $response[3] === '-');
    } while ($continue);
    
    // Verify final greeting line starts with 220
    if (strpos($response, '220') === false) {
        throw new Exception("Invalid server greeting: $response");
    }
    
    // Send EHLO
    fputs($socket, "EHLO " . $smtpHost . "\r\n");
    // Read multiline EHLO response
    do {
        $response = fgets($socket, 1024);
        $continue = (strlen($response) >= 4 && $response[3] === '-');
    } while ($continue);
    
    if (strpos($response, '250') === false) {
        throw new Exception("EHLO failed: $response");
    }
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 1024);
    if (strpos($response, '334') === false) {
        throw new Exception("AUTH LOGIN not accepted: $response");
    }
    
    // Send username (base64 encoded)
    fputs($socket, base64_encode($smtpUsername) . "\r\n");
    $response = fgets($socket, 1024);
    if (strpos($response, '334') === false) {
        throw new Exception("Username not accepted: $response");
    }
    
    // Send password (base64 encoded)
    fputs($socket, base64_encode($smtpPassword) . "\r\n");
    $response = fgets($socket, 1024);
    if (strpos($response, '235') === false) {
        throw new Exception("Authentication failed: $response");
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM:<" . $fromEmail . ">\r\n");
    $response = fgets($socket, 1024);
    if (strpos($response, '250') === false) {
        throw new Exception("MAIL FROM failed: $response");
    }
    
    // RCPT TO - send to multiple recipients
    foreach ($toEmails as $recipient) {
        fputs($socket, "RCPT TO:<" . $recipient . ">\r\n");
        $response = fgets($socket, 1024);
        if (strpos($response, '250') === false) {
            throw new Exception("RCPT TO failed for $recipient: $response");
        }
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 1024);
    if (strpos($response, '354') === false) {
        throw new Exception("DATA command failed: $response");
    }
    
    // Email headers and body
    fputs($socket, "From: " . $fromEmail . "\r\n");
    fputs($socket, "To: " . implode(', ', $toEmails) . "\r\n");
    fputs($socket, "Reply-To: " . (isset($data['email']) ? sanitize($data['email']) : $fromEmail) . "\r\n");
    fputs($socket, "Subject: " . $subject . "\r\n");
    fputs($socket, "MIME-Version: 1.0\r\n");
    fputs($socket, "Content-Type: text/html; charset=UTF-8\r\n");
    fputs($socket, "X-Mailer: PHP/" . phpversion() . "\r\n");
    fputs($socket, "\r\n");
    fputs($socket, $emailBody . "\r\n");
    fputs($socket, ".\r\n");
    $response = fgets($socket, 1024);
    if (strpos($response, '250') === false) {
        throw new Exception("Email sending failed: $response");
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fgets($socket, 1024);
    fclose($socket);
    
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    
} catch (Exception $e) {
    if (isset($socket) && is_resource($socket)) {
        fclose($socket);
    }
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>