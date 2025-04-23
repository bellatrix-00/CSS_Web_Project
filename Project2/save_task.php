<?php
file_put_contents("debug_save.txt", json_encode($_POST)); // ⬅️ ADD THIS FIRST!

session_start();
require_once "connect.php";

header('Content-Type: application/json');

$user_id = 1;

$task_date = $_POST['task_date'] ?? '';
$task_text = $_POST['task_text'] ?? '';
$color = $_POST['color'] ?? 'blue';

if ($task_date && $task_text) {
    $stmt = $conn->prepare("INSERT INTO tasks (user_id, task_date, task_text, color) VALUES (?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("isss", $user_id, $task_date, $task_text, $color);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Task saved"]);
        } else {
            file_put_contents("debug_sql_error.txt", $stmt->error); // ⬅️ Optional for SQL error logs
            echo json_encode(["success" => false, "message" => "Execute failed", "error" => $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Prepare failed", "error" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing task_date or task_text"]);
}
?>
