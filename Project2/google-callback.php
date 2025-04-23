<?php
$client_id = "1063798586002-fdng6l8ktean801k32so5v9lus09nphu.apps.googleusercontent.com";
$client_secret = "YOUR_CLIENT_SECRET"; // replace this!
$redirect_uri = "http://localhost/Project2/google-callback.php";

if (isset($_GET['code'])) {
    $code = $_GET['code'];

    // Exchange the code for tokens
    $response = file_get_contents("https://oauth2.googleapis.com/token", false, stream_context_create([
        "http" => [
            "method" => "POST",
            "header" => "Content-Type: application/x-www-form-urlencoded\r\n",
            "content" => http_build_query([
                "code" => $code,
                "client_id" => $client_id,
                "client_secret" => $client_secret,
                "redirect_uri" => $redirect_uri,
                "grant_type" => "authorization_code"
            ])
        ]
    ]));

    $tokens = json_decode($response, true);

    if (isset($tokens["access_token"])) {
        // Optional: Get user info (email)
        $access_token = $tokens['access_token'];
        $userinfo = file_get_contents("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", false, stream_context_create([
            "http" => [
                "method" => "GET",
                "header" => "Authorization: Bearer $access_token"
            ]
        ]));

        $user = json_decode($userinfo, true);
        $email = $user['email'] ?? "Unknown";

        // Save tokens for later use
        file_put_contents("tokens.json", json_encode($tokens));

        echo "<h2>✅ Google Calendar connected!</h2>";
        echo "<p>Welcome, <strong>$email</strong> 🎉
