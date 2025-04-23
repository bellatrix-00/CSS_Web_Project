<?php
$host = "localhost";
$username = "root";
$password = ""; // Default for XAMPP
$dbname = "project2_web"; // <-- updated name

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
