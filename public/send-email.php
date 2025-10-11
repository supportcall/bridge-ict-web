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
$formType = isset($data['form_type']) ? sanitize($data['form_type']) : 'Contact Form';

// Create HTML email body
$emailBody = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: #ffffff; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px 20px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 16px; font-weight: 600; color: #1e40af; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
        .field { margin-bottom: 15px; padding: 12px; background: #f9fafb; border-left: 3px solid #3b82f6; border-radius: 4px; }
        .field-label { font-weight: 600; color: #4b5563; margin-bottom: 4px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        .field-value { color: #1f2937; font-size: 15px; word-wrap: break-word; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 ' . htmlspecialchars($formType) . '</h1>
        </div>
        <div class="content">';

// Contact Information Section
$contactFields = ['name', 'email', 'phone', 'company'];
$hasContactInfo = false;
foreach ($contactFields as $field) {
    if (isset($data[$field]) && !empty($data[$field])) {
        $hasContactInfo = true;
        break;
    }
}

if ($hasContactInfo) {
    $emailBody .= '<div class="section"><div class="section-title">Contact Information</div>';
    foreach ($contactFields as $field) {
        if (isset($data[$field]) && !empty($data[$field])) {
            $label = ucfirst(str_replace('_', ' ', $field));
            $value = sanitize($data[$field]);
            $emailBody .= '<div class="field"><div class="field-label">' . $label . '</div><div class="field-value">' . $value . '</div></div>';
        }
    }
    $emailBody .= '</div>';
}

// Service/Request Information Section
$serviceFields = ['service', 'message', 'details', 'description'];
$hasServiceInfo = false;
foreach ($serviceFields as $field) {
    if (isset($data[$field]) && !empty($data[$field])) {
        $hasServiceInfo = true;
        break;
    }
}

if ($hasServiceInfo) {
    $emailBody .= '<div class="section"><div class="section-title">Request Details</div>';
    foreach ($serviceFields as $field) {
        if (isset($data[$field]) && !empty($data[$field])) {
            $label = ucfirst(str_replace('_', ' ', $field));
            $value = sanitize($data[$field]);
            $emailBody .= '<div class="field"><div class="field-label">' . $label . '</div><div class="field-value">' . nl2br($value) . '</div></div>';
        }
    }
    $emailBody .= '</div>';
}

// Additional Information Section (all other fields)
$skipFields = array_merge(['subject', 'form_type', 'submitted_at'], $contactFields, $serviceFields);
$hasAdditionalInfo = false;
foreach ($data as $key => $value) {
    if (!in_array($key, $skipFields) && !empty($value)) {
        $hasAdditionalInfo = true;
        break;
    }
}

if ($hasAdditionalInfo) {
    $emailBody .= '<div class="section"><div class="section-title">Additional Information</div>';
    foreach ($data as $key => $value) {
        if (!in_array($key, $skipFields) && !empty($value)) {
            $label = ucfirst(str_replace('_', ' ', $key));
            $sanitizedValue = is_array($value) ? implode(', ', array_map('sanitize', $value)) : sanitize($value);
            $emailBody .= '<div class="field"><div class="field-label">' . $label . '</div><div class="field-value">' . nl2br($sanitizedValue) . '</div></div>';
        }
    }
    $emailBody .= '</div>';
}

$emailBody .= '
        </div>
        <div class="footer">
            <p><strong>Submitted:</strong> ' . date('l, F j, Y \a\t g:i A') . '</p>
            <p>This email was automatically generated from your website contact form.</p>
        </div>
    </div>
</body>
</html>';

// Create email headers for HTML
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