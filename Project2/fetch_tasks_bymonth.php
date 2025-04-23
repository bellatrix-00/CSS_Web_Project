<?php
include 'connect.php';
header('Content-Type: application/json');

$month = $_POST['month'];
$year = $_POST['year'];

$stmt = $conn->prepare("SELECT * FROM tasks WHERE MONTH(due_date) = ? AND YEAR(due_date) = ?");
$stmt->bind_param("ii", $month, $year);
$stmt->execute();
$result = $stmt->get_result();

$tasks = [];
while ($row = $result->fetch_assoc()) {
  $date = $row['due_date']; // format: YYYY-MM-DD
  $tasks[$date][] = [
    "text" => $row['title'],
    "color" => $row['color'] ?? "#87cefa"
  ];
}
echo json_encode($tasks);
?>
