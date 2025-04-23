<?php
session_start();
require_once "connect.php";

// Use session or fallback for now
$user_id = $_SESSION['user_id'] ?? 1;

$month = $_GET['month'] ?? date('m');
$year = $_GET['year'] ?? date('Y');

// Get all tasks for this user in that month
$stmt = $conn->prepare("
    SELECT id, task_text, task_date, is_completed, color 
    FROM tasks 
    WHERE user_id = ? AND MONTH(task_date) = ? AND YEAR(task_date) = ?
");
$stmt->bind_param("iii", $user_id, $month, $year);
$stmt->execute();

$result = $stmt->get_result();
$tasks = [];

while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

echo json_encode($tasks);
?>
