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

// SMTP Configuration
$smtpHost = 'mail.supportcall.co.za';
$smtpPort = 465;
$smtpUsername = 'sendserver@supportcall.co.za';
$smtpPassword = '74Dhm28#74Dhm28#';
$fromEmail = 'sendserver@supportcall.co.za';
$toEmail = 'info@supportcall.co.za';

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
$emailBody = "New form submission received:\n\n";

foreach ($data as $key => $value) {
    if ($key !== 'subject') {
        $sanitizedKey = sanitize($key);
        $sanitizedValue = is_array($value) ? json_encode($value) : sanitize($value);
        $emailBody .= ucfirst(str_replace('_', ' ', $sanitizedKey)) . ": " . $sanitizedValue . "\n";
    }
}

$emailBody .= "\n---\nSubmitted: " . date('Y-m-d H:i:s') . "\n";

// Create email headers
$headers = [
    'From: ' . $fromEmail,
    'Reply-To: ' . (isset($data['email']) ? sanitize($data['email']) : $fromEmail),
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8'
];

// Send via SMTP using PHPMailer-like approach with fsockopen
try {
    $socket = fsockopen('ssl://' . $smtpHost, $smtpPort, $errno, $errstr, 30);
    
    if (!$socket) {
        throw new Exception("Could not connect to SMTP server: $errstr ($errno)");
    }
    
    // Read server response
    fgets($socket, 512);
    
    // Send EHLO
    fputs($socket, "EHLO " . $_SERVER['SERVER_NAME'] . "\r\n");
    fgets($socket, 512);
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    fgets($socket, 512);
    
    fputs($socket, base64_encode($smtpUsername) . "\r\n");
    fgets($socket, 512);
    
    fputs($socket, base64_encode($smtpPassword) . "\r\n");
    $authResponse = fgets($socket, 512);
    
    if (strpos($authResponse, '235') === false) {
        throw new Exception("SMTP authentication failed");
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <" . $fromEmail . ">\r\n");
    fgets($socket, 512);
    
    // RCPT TO
    fputs($socket, "RCPT TO: <" . $toEmail . ">\r\n");
    fgets($socket, 512);
    
    // DATA
    fputs($socket, "DATA\r\n");
    fgets($socket, 512);
    
    // Email headers and body
    fputs($socket, implode("\r\n", $headers) . "\r\n");
    fputs($socket, "Subject: " . $subject . "\r\n\r\n");
    fputs($socket, $emailBody . "\r\n");
    fputs($socket, ".\r\n");
    fgets($socket, 512);
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>