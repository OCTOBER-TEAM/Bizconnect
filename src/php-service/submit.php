<?php
require __DIR__ . '/vendor/autoload.php';
// Enable CORS if needed
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

use Google\Client;
use Google\Service\Sheets;
use Google\Service\Gmail;
use Google\Service\Gmail\Message;

header('Content-Type: application/json');

// Load the request body
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

// Extract data
$uniqueId = uniqid('biz_', true);
$fullName = $data['fullName'] ?? '';
$contactType = $data['contactType'] ?? '';
$contactInfo = $data['contactInfo'] ?? '';
$location = $data['location'] ?? '';
$city = $data['city'] ?? '';
$province = $data['province'] ?? '';
$businessName = $data['businessName'] ?? '';
$businessType = $data['businessType'] ?? '';
$servicesInterested = $data['servicesInterested'] ?? '';
$consent = $data['consent'] ? 'Yes' : 'No';
$status = 'New Business';
$timestamp = date('Y-m-d H:i:s');

// Authenticate
$client = new Client();
$client->setAuthConfig('credentials.json'); // <-- path to your service account credentials
$client->setScopes([
    Sheets::SPREADSHEETS,
    Gmail::GMAIL_SEND,
]);

// Setup Sheets API
$spreadsheetId = 'YOUR_SPREADSHEET_ID';
$sheetService = new Sheets($client);

$sheetRange = 'Sheet1!A1'; // Adjust if needed

$newRow = [
    $timestamp,
    $uniqueId,
    $fullName,
    $contactType,
    $contactInfo,
    $location,
    $city,
    $province,
    $businessName,
    $businessType,
    $servicesInterested,
    $status,
    $consent,
];

try {
    // Append to Google Sheets
    $sheetService->spreadsheets_values->append(
        $spreadsheetId,
        $sheetRange,
        new Sheets\ValueRange(['values' => [$newRow]]),
        ['valueInputOption' => 'RAW']
    );

    // Prepare email content
    $userEmail = $contactType === 'email' ? $contactInfo : null;
    $adminEmail = 'info@itdfbizconnect.co.za';

    $gmailService = new Gmail($client);

    // Send to user
    if ($userEmail) {
        sendEmail($gmailService, $adminEmail, $userEmail, "ITDF BizConnect Application Received", "
            Dear $fullName,\n\n
            Thank you for registering your business ($businessName) with ITDF BizConnect.\n
            We’ve received your application and will be in touch soon.\n\n
            Reference: $uniqueId\n
            Regards,\n
            ITDF Team
        ");
    }

    // Send to admin
    sendEmail($gmailService, $adminEmail, $adminEmail, "New Business Registration: $businessName", "
        A new business has been submitted:\n
        Name: $fullName\n
        Business: $businessName\n
        Contact: $contactType - $contactInfo\n
        Province: $province\n
        Status: $status\n
        Ref: $uniqueId
    ");

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to process form', 'details' => $e->getMessage()]);
}

// Email helper
function sendEmail(Gmail $service, $from, $to, $subject, $body)
{
    $rawMessage = base64_encode("From: $from\r\nTo: $to\r\nSubject: $subject\r\n\r\n$body");
    $message = new Message();
    $message->setRaw(str_replace(['+', '/', '='], ['-', '_', ''], $rawMessage));
    $service->users_messages->send('me', $message);
}
