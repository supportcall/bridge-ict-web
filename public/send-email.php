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
    fputs($socket, "Content-Type: text/plain; charset=UTF-8\r\n");
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