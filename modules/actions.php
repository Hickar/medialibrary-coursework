<?php
require_once("database.php");
require_once("auth.php");
require_once("filemanager.php");
require_once("utils.php");
session_start();

error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

header('Access-Control-Allow-Origin: https://medialib.hickar.space');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$auth_manager = new Auth($db);
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

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['isAuthed'])) {
	if ($auth_manager->isAuthorized()) {
		setcookie('user_name', $_SESSION['user_name'], time() + 8600, '/');
	}
	send_response($auth_manager->isAuthorized());
}

if (isset($_REQUEST['uploadFiles']) && isset($_FILES['files'])) {
	$files = $file_manager->normalize_user_files($_FILES['files']);
	$file_manager->upload_user_files($files, "../storage/" . $_SESSION['user_ID']);
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['getUserFiles'])) {
	$file_manager->get_user_files_info();
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['getUserFile'])) {
	$isThumbRequired = isset($_REQUEST['thumb']);
	$file_manager->get_user_file($_REQUEST['file_ID'], $isThumbRequired);
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['downloadUserFile'])) {
	$file_manager->download_user_file($_REQUEST['file_ID']);
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_REQUEST['deleteUserFile'])) {
	$file_manager->delete_user_file($_REQUEST['file_ID']) ?
		send_response(TRUE) :
		send_error_response('Ошибка при удалении файла');
}

if ($_SERVER["REQUEST_METHOD"] == "UPDATE" && isset($_REQUEST['updateUsername'])) {
	if ($auth_manager->update_user_name($user_data['name'])) {
		send_response('Псевдоним был успешно изменен');
	}
}

if ($_SERVER["REQUEST_METHOD"] == "UPDATE" && isset($_REQUEST['updatePassword'])) {
	if ($auth_manager->update_user_password($user_data['password'], $user_data['new_password'])) {
		send_response('Пароль был успешно изменен');
	}
}