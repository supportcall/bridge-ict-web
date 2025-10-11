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
$smtpHost = 'mail.supportcall.co.za';
$smtpPort = 465; // Using port 465 with direct SSL/TLS
$smtpUsername = 'sendserver@supportcall.co.za';
$smtpPassword = '74Dhm28#74Dhm28#';
$fromEmail = 'sendserver@supportcall.co.za';
$toEmails = ['info@supportcall.co.za', 'scmyhelp@gmail.com'];

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

// Organize form fields into categories
$contactInfo = [];
$requestDetails = [];
$additionalInfo = [];

foreach ($data as $key => $value) {
    if ($key !== 'subject') {
        $sanitizedKey = sanitize($key);
        $sanitizedValue = is_array($value) ? json_encode($value) : sanitize($value);
        $label = ucfirst(str_replace('_', ' ', $sanitizedKey));
        
        // Categorize fields
        if (in_array($key, ['name', 'email', 'phone', 'company'])) {
            $contactInfo[$label] = $sanitizedValue;
        } elseif (in_array($key, ['service', 'message', 'form_type'])) {
            $requestDetails[$label] = $sanitizedValue;
        } else {
            $additionalInfo[$label] = $sanitizedValue;
        }
    }
}

// Build professional HTML email
$emailBody = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: 600; color: #1e3a8a; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6; }
        .field { margin-bottom: 12px; padding: 12px; background: #f8fafc; border-left: 3px solid #3b82f6; border-radius: 4px; }
        .field-label { font-weight: 600; color: #1e3a8a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .field-value { color: #334155; font-size: 15px; word-wrap: break-word; white-space: pre-wrap; }
        .message-field { background: #eff6ff; border-left-color: #2563eb; padding: 15px; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer p { margin: 5px 0; font-size: 13px; color: #64748b; }
        .timestamp { color: #94a3b8; font-size: 12px; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📨 New Form Submission</h1>
            <p>' . htmlspecialchars($subject) . '</p>
        </div>
        <div class="content">';

// Contact Information Section
if (!empty($contactInfo)) {
    $emailBody .= '
            <div class="section">
                <div class="section-title">👤 Contact Information</div>';
    foreach ($contactInfo as $label => $value) {
        $emailBody .= '
                <div class="field">
                    <div class="field-label">' . htmlspecialchars($label) . '</div>
                    <div class="field-value">' . htmlspecialchars($value) . '</div>
                </div>';
    }
    $emailBody .= '
            </div>';
}

// Request Details Section
if (!empty($requestDetails)) {
    $emailBody .= '
            <div class="section">
                <div class="section-title">📋 Request Details</div>';
    foreach ($requestDetails as $label => $value) {
        $fieldClass = strtolower($label) === 'message' ? 'field message-field' : 'field';
        $emailBody .= '
                <div class="' . $fieldClass . '">
                    <div class="field-label">' . htmlspecialchars($label) . '</div>
                    <div class="field-value">' . nl2br(htmlspecialchars($value)) . '</div>
                </div>';
    }
    $emailBody .= '
            </div>';
}

// Additional Information Section
if (!empty($additionalInfo)) {
    $emailBody .= '
            <div class="section">
                <div class="section-title">ℹ️ Additional Information</div>';
    foreach ($additionalInfo as $label => $value) {
        $emailBody .= '
                <div class="field">
                    <div class="field-label">' . htmlspecialchars($label) . '</div>
                    <div class="field-value">' . htmlspecialchars($value) . '</div>
                </div>';
    }
    $emailBody .= '
            </div>';
}

$emailBody .= '
        </div>
        <div class="footer">
            <p class="timestamp">Submitted on ' . date('l, F j, Y \a\t g:i A') . '</p>
            <p><strong>SupportCALL</strong> | Digital Transformation Partner</p>
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
    
    // Read ALL server greeting lines (220) - some servers send multiple
    do {
        $response = fgets($socket, 1024);
        if ($response === false) {
            throw new Exception("Failed to read server greeting");
        }
        // Continue reading if line starts with "220-" (multiline greeting)
        $continue = (strlen($response) >= 4 && substr($response, 0, 4) === '220-');
    } while ($continue);
    
    // Final line should be "220 " (with space)
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
    
    // RCPT TO - send to both recipients
    foreach ($toEmails as $toEmail) {
        fputs($socket, "RCPT TO:<" . $toEmail . ">\r\n");
        $response = fgets($socket, 1024);
        if (strpos($response, '250') === false) {
            throw new Exception("RCPT TO failed for $toEmail: $response");
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