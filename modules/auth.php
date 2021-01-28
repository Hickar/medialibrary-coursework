<?php

class Auth {
	private $db = NULL;

	public function __construct(Database &$db) {
		$this->db = &$db;
	}

	public function isAuthorized(): bool {
		return isset($_SESSION['status']) ? $_SESSION['status'] : FALSE;
	}

	public function login(string $user_name, string $user_password): bool {
		if (empty($user_name) || empty($user_password)) {
			send_error_response('Поля логина и пароля должны быть заполненными');
			return FALSE;
		}

		$user = $this->db->get_user($user_name);

		if ($user && password_verify($user_password, $user['password'])) {
			$_SESSION['user_ID'] = $user['ID'];
			$_SESSION['user_name'] = $user['name'];
			$_SESSION['status'] = TRUE;
			setcookie('user_name', $user['name'], time() + 8600, '/');
			send_response("Добро пожаловать, {$user['name']}");
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

		$user = $this->db->is_user_exists($user_name);

		if ($user) {
			send_error_response('Пользователь с данным идентификатором уже существует');
		} else {
			if ($this->db->create_user($user_name, password_hash($user_password, CRYPT_SHA256))) {
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

		$user_exists = $this->db->is_user_exists($new_username);

		if ($user_exists) {
			send_error_response('Пользователь с данным псевдонимом уже существует');
			return FALSE;
		}

		$update_query = "UPDATE USERS SET name = '{$new_username}' " .
			" WHERE name='{$_SESSION['user_name']}' AND ID='{$_SESSION['user_ID']}';";
		$update_files_owner_query = "UPDATE FILES SET owner = '{$new_username}' " .
			" WHERE owner='{$_SESSION['user_name']}';";

		$this->db->update_user($_SESSION['user_ID'], "name", $new_username);
		$this->db->query("UPDATE USERS SET name = '{$new_username}' " .
			" WHERE name='{$_SESSION['user_name']}' AND ID='{$_SESSION['user_ID']}'");

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

		$user_query = "SELECT * FROM USERS WHERE name = '{$_SESSION['user_name']}';";
		$user_row = $this->db->query($user_query)->fetch_array(MYSQLI_ASSOC);

		if ($user_row && password_verify($old_password, $user_row['user_password'])) {
			$update_query = "UPDATE USERS SET password = '{$new_password}'" .
				" WHERE name='{$_SESSION['user_name']}' AND ID='{$_SESSION['user_ID']}';";
			return $this->db->query($update_query) ? TRUE : FALSE;
		} else {
			send_error_response("Неправильно указан текущий пароль");
		}

		return FALSE;
	}
}

?>
