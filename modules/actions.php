<?php
require_once("database.php");
require_once("authorization.php");
session_start();

$authManager = new Authorization($db);
$response = array('message' => '', 'err' => FALSE);
$user_data = json_decode(file_get_contents('php://input'), TRUE);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST['login'])) {
	$authManager->login($user_data['name'], $user_data['password']);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST['register'])) {
	$authManager->signup($user_data['name'], $user_data['password'], $user_data['password_check']);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST['logout'])) {
	$authManager->logout();
}