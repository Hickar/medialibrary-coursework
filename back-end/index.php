<?php
require_once("src/database.php");
require_once("src/auth.php");
require_once("src/filemanager.php");
require_once("src/utils.php");
require_once("src/config.php");

session_start();

$mode = getenv("MODE");
$origin = getenv("HOST_ADDRESS");

header("Access-Control-Allow-Origin: https://www.localhost");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db = new Database(
	"db",
	getenv("DB_USER"),
	getenv("DB_PASSWORD"),
	getenv("DB_NAME"));
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
	$domain = $mode === "production" ? $origin : "/";
//	if ($auth_manager->isAuthorized()) {
//		setcookie('user_name', $_SESSION['user_name'], time() + 8600, '/', $domain);
//		setcookie('user_name', $_SESSION['user_name'], time() + 8600);
//	}
	send_response($auth_manager->isAuthorized());
}

if (isset($_REQUEST['uploadFiles']) && isset($_FILES['files'])) {
	$files = $file_manager->normalize_user_files($_FILES['files']);
	$user_storage_path = "storage/" . $_SESSION['user_ID'];
	$file_manager->upload_user_files($files, $user_storage_path);
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['getUserFiles'])) {
	if (isset($_SESSION['user_name'])) {
		$files_info = $file_manager->get_user_files_info($_SESSION['user_ID']);

		header('Pragma: public');
		header('Cache-Control: max-age=0, must-revalidate');
		header('Content-type: application/json');
		send_response($files_info);
	}
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_REQUEST['getUserFile'])) {
	$isThumbRequired = isset($_REQUEST['thumb']);
	$file_manager->get_user_file($_REQUEST['file_ID'], $isThumbRequired);
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_REQUEST['deleteUserFile'])) {
	$file_manager->delete_user_file($_SESSION['user_ID'], $_REQUEST['file_ID']) ?
		send_response(TRUE) :
		send_error_response('Ошибка при удалении файла');
}

if ($_SERVER["REQUEST_METHOD"] == "PUT" && isset($_REQUEST['updateUsername'])) {
	if ($auth_manager->update_user_name($user_data['name'])) {
		send_response('Псевдоним был успешно изменен');
	}
}

if ($_SERVER["REQUEST_METHOD"] == "PUT" && isset($_REQUEST['updatePassword'])) {
	if ($auth_manager->update_user_password($user_data['password'], $user_data['new_password'])) {
		send_response('Пароль был успешно изменен');
	}
}