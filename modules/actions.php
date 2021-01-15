<?php
require_once("database.php");
require_once("authorization.php");
require_once("filemanager.php");
session_start();

$auth_manager = new Authorization($db);
$file_manager = new FileManager($db);
$user_data = json_decode(file_get_contents('php://input'), TRUE);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST['login'])) {
	$auth_manager->login($user_data['name'], $user_data['password']);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST['register'])) {
	$auth_manager->signup($user_data['name'], $user_data['password'], $user_data['password_check']);
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['logout'])) {
	$auth_manager->logout();
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['isAuthorized'])) {
	echo json_encode(array(
		'message' => $auth_manager->isAuthorized(),
		'err' => FALSE
	), JSON_UNESCAPED_UNICODE);
}

if (isset($_REQUEST['uploadFiles']) && isset($_FILES['files'])) {
	$files = $file_manager->normalize_user_files($_FILES['files']);
	$file_manager->upload_user_files($files, "../storage/" . $_SESSION['user_ID']);
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['getUserFiles'])) {
	$file_manager->get_user_files_info();
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['getUserFile'])) {
	$file_manager->get_user_file($_REQUEST['file_ID']);
}