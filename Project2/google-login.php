<?php
$client_id = "1063798586002-fdng6l8ktean801k32so5v9lus09nphu.apps.googleusercontent.com";
$redirect_uri = "http://localhost/Project2/google-callback.php"; // adjust if different

$scope = "https://www.googleapis.com/auth/calendar";

$url = "https://accounts.google.com/o/oauth2/v2/auth?" . http_build_query([
    "client_id" => $client_id,
    "redirect_uri" => $redirect_uri,
    "response_type" => "code",
    "scope" => $scope,
    "access_type" => "offline", // Gets a refresh token
    "prompt" => "consent" // Forces consent screen every time
]);

header("Location: $url");
exit;
