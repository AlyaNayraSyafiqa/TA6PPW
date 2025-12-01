<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$apiKey = "ffc5a4ae997bbc845b1b9f0a2811671f";

$jsonInput = json_decode(file_get_contents("php://input"), true);

$cityRaw = "";
if (isset($_GET["city"])) {
    $cityRaw = $_GET["city"];
} elseif (isset($_POST["city"])) {
    $cityRaw = $_POST["city"];
} elseif (isset($jsonInput["city"])) {
    $cityRaw = $jsonInput["city"];
}

$endpoint = "weather"; 
if (isset($_GET["endpoint"])) {
    $endpoint = $_GET["endpoint"];
} elseif (isset($_POST["endpoint"])) {
    $endpoint = $_POST["endpoint"];
} elseif (isset($jsonInput["endpoint"])) {
    $endpoint = $jsonInput["endpoint"];
}

$city = urlencode($cityRaw);

if (!$city) {
    echo json_encode(["status" => "error", "message" => "Kota tidak boleh kosong"]);
    exit;
}

if ($endpoint === "geo") {
    $url = "https://api.openweathermap.org/geo/1.0/direct?q={$city}&limit=5&appid={$apiKey}";
} else {
    $url = "https://api.openweathermap.org/data/2.5/{$endpoint}?q={$city}&units=metric&appid={$apiKey}";
}

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
]);

$response = curl_exec($ch);

if ($response === false) {
    echo json_encode([
        "status" => "error",
        "message" => "Gagal koneksi: " . curl_error($ch)
    ]);
    curl_close($ch);
    exit;
}

curl_close($ch);
echo $response;
?>