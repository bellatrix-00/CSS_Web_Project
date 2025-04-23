<?php
header('Content-Type: application/json');
session_start();
require_once "connect.php";

$user_id = $_SESSION['user_id'] ?? 1; // Default for now, replace with session user ID later

$today = date('Y-m-d');
$week_end = date('Y-m-d', strtotime('+6 days'));

$response = [
    "today" => [],
    "week" => []
];

// Fetch today's tasks
$stmt = $conn->prepare("SELECT task_text, task_date FROM tasks WHERE user_id = ? AND task_date = ?");
$stmt->bind_param("is", $user_id, $today);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $response["today"][] = $row;
}

// Fetch this week's tasks
$stmt = $conn->prepare("SELECT task_text, task_date FROM tasks WHERE user_id = ? AND task_date BETWEEN ? AND ?");
$stmt->bind_param("iss", $user_id, $today, $week_end);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $response["week"][] = $row;
}

echo json_encode($response);
$conn->close();
?>
