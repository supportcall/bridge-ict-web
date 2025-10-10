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

// SMTP Configuration - Try port 587 with STARTTLS (more reliable)
$smtpHost = 'mail.supportcall.co.za';
$smtpPort = 587; // Using port 587 with STARTTLS
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

// Send via SMTP using fsockopen with STARTTLS
try {
    // Connect without SSL first (for STARTTLS)
    $socket = fsockopen($smtpHost, $smtpPort, $errno, $errstr, 30);
    
    if (!$socket) {
        throw new Exception("Could not connect to SMTP server: $errstr ($errno)");
    }
    
    // Set timeout
    stream_set_timeout($socket, 30);
    
    // Read initial server greeting
    $response = fgets($socket, 512);
    if (strpos($response, '220') === false) {
        throw new Exception("Invalid server greeting: $response");
    }
    
    // Send EHLO
    fputs($socket, "EHLO " . $smtpHost . "\r\n");
    $response = fgets($socket, 512);
    // Read multiline EHLO response
    while (strpos($response, '-') !== false) {
        $response = fgets($socket, 512);
    }
    
    // Send STARTTLS
    fputs($socket, "STARTTLS\r\n");
    $response = fgets($socket, 512);
    if (strpos($response, '220') === false) {
        throw new Exception("STARTTLS failed: $response");
    }
    
    // Enable crypto
    if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        throw new Exception("Failed to enable TLS encryption");
    }
    
    // Send EHLO again after STARTTLS
    fputs($socket, "EHLO " . $smtpHost . "\r\n");
    $response = fgets($socket, 512);
    while (strpos($response, '-') !== false) {
        $response = fgets($socket, 512);
    }
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    if (strpos($response, '334') === false) {
        throw new Exception("AUTH LOGIN not accepted: $response");
    }
    
    // Send username
    fputs($socket, base64_encode($smtpUsername) . "\r\n");
    $response = fgets($socket, 512);
    if (strpos($response, '334') === false) {
        throw new Exception("Username not accepted: $response");
    }
    
    // Send password
    fputs($socket, base64_encode($smtpPassword) . "\r\n");
    $response = fgets($socket, 512);
    if (strpos($response, '235') === false) {
        throw new Exception("Authentication failed. Check username and password: $response");
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <" . $fromEmail . ">\r\n");
    $response = fgets($socket, 512);
    if (strpos($response, '250') === false) {
        throw new Exception("MAIL FROM failed: $response");
    }
    
    // RCPT TO
    fputs($socket, "RCPT TO: <" . $toEmail . ">\r\n");
    $response = fgets($socket, 512);
    if (strpos($response, '250') === false) {
        throw new Exception("RCPT TO failed: $response");
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    if (strpos($response, '354') === false) {
        throw new Exception("DATA command failed: $response");
    }
    
    // Email headers and body
    fputs($socket, "From: " . $fromEmail . "\r\n");
    fputs($socket, "To: " . $toEmail . "\r\n");
    fputs($socket, "Reply-To: " . (isset($data['email']) ? sanitize($data['email']) : $fromEmail) . "\r\n");
    fputs($socket, "Subject: " . $subject . "\r\n");
    fputs($socket, "MIME-Version: 1.0\r\n");
    fputs($socket, "Content-Type: text/plain; charset=UTF-8\r\n");
    fputs($socket, "\r\n");
    fputs($socket, $emailBody . "\r\n");
    fputs($socket, ".\r\n");
    $response = fgets($socket, 512);
    if (strpos($response, '250') === false) {
        throw new Exception("Email sending failed: $response");
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    
} catch (Exception $e) {
    if (isset($socket) && $socket) {
        fclose($socket);
    }
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>