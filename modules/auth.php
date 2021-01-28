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

		if (empty($user_name) && empty($user_password)) {
			send_error_response('Поля логина и пароля должны быть заполненными');
			return FALSE;
		}

		$user_query = "SELECT * FROM USERS WHERE user_name = '{$user_name}';";
		$user_row = $this->db->query($user_query)->fetch_array(MYSQLI_ASSOC) or die($this->db->error);

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
		if (!preg_match('/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/', $user_password)) {
			send_error_response('Пароль должен быть длинной не менее 8 символов, включать латинские символы,' .
				'одну заглавную букву и одну цифру.');
			exit();
		}

		if ($user_password !== $user_password_check) {
			send_error_response('Пароли должны совпадать');
			exit();
		}

		$user_password = password_hash($user_password, CRYPT_SHA256);

		$user_query = "SELECT * FROM USERS WHERE user_name = '{$user_name}';";
		$user_row = $this->db->query($user_query)->fetch_array(MYSQLI_ASSOC) or die($this->db->error);

		if ($user_row) {
			send_error_response('Пользователь с данным идентификатором уже существует');
		} else {
			$user_register_query = "INSERT INTO USERS (user_ID, user_name, user_password) VALUES" .
				" (NULL, '{$user_name}', '{$user_password}');";
			if ($this->db->query($user_register_query)) {
				send_error_response('Вы были успешно зарегистрированы');
				return TRUE;
			} else {
				send_error_response('Ошибка при запросе к БД');
			}
		}

		return FALSE;
	}

	public function logout(): bool {
		session_unset();
		session_destroy();
		unset($_COOKIE['user_name']);
		send_response(TRUE);
		return TRUE;
	}
}

?>
