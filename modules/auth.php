<?php

class Auth {
	private $db = NULL;

	public function __construct(mysqli &$db) {
		$this->db = &$db;
	}

	public function isAuthorized(): bool {
		return isset($_SESSION['status']) ? $_SESSION['status'] : FALSE;
	}

	public function login(string $user_name, string $user_password): bool {
		$user_name = $this->db->real_escape_string($user_name);
		$user_password = $this->db->real_escape_string($user_password);

		if (empty($user_name) || empty($user_password)) {
			send_error_response('Поля логина и пароля должны быть заполненными');
			return FALSE;
		}

		$user_query = "SELECT * FROM USERS WHERE user_name = '{$user_name}';";
		$user_row = $this->db->query($user_query)->fetch_array(MYSQLI_ASSOC);

		if ($user_row && password_verify($user_password, $user_row['user_password'])) {
			$_SESSION['user_ID'] = $user_row['user_ID'];
			$_SESSION['user_name'] = $user_row['user_name'];
			$_SESSION['status'] = TRUE;
			setcookie('user_name', $user_row['user_name'], time() + 8600, '/');
			send_response("Добро пожаловать, {$user_row['user_name']}");
			return TRUE;
		} else {
			send_error_response("Пользователя с данными идентификаторами не существует.\nПроверьте логин/пароль");
		}

		return FALSE;
	}

	public function signup(string $user_name, string $user_password, string $user_password_check): bool {
		if (empty($user_name)) {
			send_error_response('Имя пользователя не может быть пустым');
			return FALSE;
		}

		if (!$this->is_valid_password($user_password)) {
			send_error_response('Пароль должен быть длинной не менее 8 символов, включать латинские символы,' .
				'одну заглавную букву и одну цифру.');
			return FALSE;
		}

		if ($user_password !== $user_password_check) {
			send_error_response('Пароли должны совпадать');
			return FALSE;
		}

		$user_password = password_hash($user_password, CRYPT_SHA256);

		$user_query = "SELECT * FROM USERS WHERE user_name = '{$user_name}';";
		$user_row = $this->db->query($user_query)->fetch_array(MYSQLI_ASSOC);

		if ($user_row) {
			send_error_response('Пользователь с данным идентификатором уже существует');
		} else {
			$user_register_query = "INSERT INTO USERS (user_ID, user_name, user_password) VALUES" .
				" (NULL, '{$user_name}', '{$user_password}');";
			if ($this->db->query($user_register_query)) {
				send_response('Вы были успешно зарегистрированы');
				return TRUE;
			} else {
				send_error_response('Ошибка при запросе к БД');
			}
		}

		return FALSE;
	}

	private function is_valid_password(string $password): bool {
		return preg_match('/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/', $password);
	}

	public function logout(): bool {
		session_unset();
		session_destroy();
		unset($_COOKIE['user_name']);
		send_response(TRUE);
		return TRUE;
	}

	public function update_user_name(string $new_username): bool {
		if (!isset($_SESSION['user_name'])) {
			return FALSE;
		}

		$user_exists_query = "SELECT * FROM USERS WHERE user_name='{$new_username}';";
		$user_exists = $this->db->query($user_exists_query)->fetch_array(MYSQLI_ASSOC);

		if ($user_exists) {
			send_error_response('Пользователь с данным псевдонимом уже существует');
			return FALSE;
		}

		$update_query = "UPDATE USERS SET user_name = '{$new_username}' " .
			" WHERE user_name='{$_SESSION['user_name']}' AND user_ID='{$_SESSION['user_ID']}';";
		$update_files_owner_query = "UPDATE FILES SET file_owner = '{$new_username}' " .
			" WHERE file_owner='{$_SESSION['user_name']}';";

		if ($this->db->query($update_query) && $this->db->query($update_files_owner_query)) {
			$_SESSION['user_name'] = $new_username;
			setcookie('user_name', $new_username, time() + 8600, '/');
			return TRUE;
		}

		return FALSE;
	}

	public function update_user_password(string $old_password, string $new_password): bool {
		if (!isset($_SESSION['user_name'])) {
			return FALSE;
		}

		if ($old_password === $new_password) {
			send_error_response("Старый и новый пароль совпадают");
			return FALSE;
		}

		if (!$this->is_valid_password($new_password)) {
			send_error_response('Пароль должен быть длинной не менее 8 символов, включать латинские символы,' .
				'одну заглавную букву и одну цифру.');
			return FALSE;
		}

		$new_password = password_hash($new_password, CRYPT_SHA256);

		$user_query = "SELECT * FROM USERS WHERE user_name = '{$_SESSION['user_name']}';";
		$user_row = $this->db->query($user_query)->fetch_array(MYSQLI_ASSOC);

		if ($user_row && password_verify($old_password, $user_row['user_password'])) {
			$update_query = "UPDATE USERS SET user_password = '{$new_password}'" .
				" WHERE user_name='{$_SESSION['user_name']}' AND user_ID='{$_SESSION['user_ID']}';";
			return $this->db->query($update_query) ? TRUE : FALSE;
		} else {
			send_error_response("Неправильно указан текущий пароль");
		}

		return FALSE;
	}
}

?>
