<?php
require_once("database.php");
require_once("authorization.php");
session_start();

$authManager = new Authorization($db);
$user_data = json_decode(file_get_contents('php://input'), TRUE);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST['login'])) {
	$authManager->login($user_data['name'], $user_data['password']);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST['register'])) {
	$authManager->signup($user_data['name'], $user_data['password'], $user_data['password_check']);
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['logout'])) {
	$authManager->logout();
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['isAuthorized'])) {
	echo json_encode(array(
		'message' => $authManager->isAuthorized(),
		'err' => FALSE
	), JSON_UNESCAPED_UNICODE);
}