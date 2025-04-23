<?php
header('Content-Type: application/json');
session_start();
require_once "connect.php";

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(["success" => false, "message" => "Please fill in all fields."]);
    exit;
}

if (isset($_POST['signup'])) {
    $check = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $result = $check->get_result();

    if ($result && $result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already registered."]);
    } else {
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $hashed);
        $stmt->execute();

        // ✅ Automatically log in new user
        $_SESSION['user_id'] = $conn->insert_id;
        $_SESSION['email'] = $email;

        echo json_encode(["success" => true, "message" => "Signup successful!"]);
    }
} elseif (isset($_POST['login'])) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];

            echo json_encode(["success" => true, "message" => "Login successful!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Account not found."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request."]);
}
