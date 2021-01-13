<?php

class Authorization {
	private $db = null;

	public function __construct(?mysqli &$db) {
		$this->db = &$db;
	}

	public function isAuthorized(): bool {
		return isset($_SESSION['status']) ? $_SESSION['status'] : false;
	}

	public function login(string $user_name, string $user_password) {
		$user_name = $this->db->real_escape_string($user_name);
		$user_password = $this->db->real_escape_string($user_password);

		if (empty($user_name) && empty($user_password)) {
			echo json_encode(array(
				'message' => 'Поля логина и пароля должны быть заполненными',
				'err' => TRUE
			), JSON_UNESCAPED_UNICODE);
			return;
		}

		$user_query = "SELECT * FROM USERS WHERE user_name = '{$user_name}';";
		$run_query = $this->db->query($user_query) or die($this->db->error);
		$user_row = $run_query->fetch_array(MYSQLI_ASSOC);

		if ($user_row && password_verify($user_password, $user_row['user_password'])) {
			$_SESSION['userID'] = $user_row['user_ID'];
			$_SESSION['userName'] = $user_row['user_name'];
			$_SESSION['status'] = TRUE;
			setcookie('userName', $user_row['user_name'], time() + 8600, '/');
			echo json_encode(array(
				'message' => "Добро пожаловать, {$user_row['user_name']}",
				'err' => FALSE
			), JSON_UNESCAPED_UNICODE);
		} else {
			echo json_encode(array(
				'message' => "Пользователя с данными идентификаторами не существует.\nПроверьте логин/пароль",
				'err' => TRUE
			), JSON_UNESCAPED_UNICODE);
		}
	}

	public function signup(string $user_name, string $user_password, string $user_password_check) {
		if (!preg_match('/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/', $user_password)) {
			echo json_encode(array(
				'message' => 'Пароль должен быть длинной не менее 8 символов, включать латинские символы, одну заглавную букву и одну цифру.',
				'err' => TRUE
			), JSON_UNESCAPED_UNICODE);
			return;
		}

		if ($user_password !== $user_password_check) {
			echo json_encode(array(
				'message' => 'Пароли должны совпадать',
				'err' => TRUE
			), JSON_UNESCAPED_UNICODE);
			return;
		}

		$user_password = password_hash($user_password, CRYPT_SHA256);

		$user_query = "SELECT * FROM USERS WHERE user_name = '{$user_name}';";
		$run_query = $this->db->query($user_query) or die($this->db->error);
		$user_row = $run_query->fetch_array(MYSQLI_ASSOC);

		if ($user_row) {
			echo json_encode(array(
				'message' => 'Пользователь с данным идентификатором уже существует',
				'err' => TRUE
			), JSON_UNESCAPED_UNICODE);
		} else {
			$user_register_query = "INSERT INTO USERS (user_ID, user_name, user_password) VALUES (NULL, '{$user_name}', '{$user_password}');";
			if ($this->db->query($user_register_query)) {
				echo json_encode(array(
					'message' => 'Вы были успешно зарегистрированы',
					'err' => FALSE
				), JSON_UNESCAPED_UNICODE);
			} else {
				echo json_encode(array(
					'message' => 'Ошибка при запросе к БД',
					'err' => TRUE
				), JSON_UNESCAPED_UNICODE);
			}
		}
	}

	public function logout() {
		session_unset();
		session_destroy();
		unset($_COOKIE['userName']);
		echo json_encode(array(
			'message' => TRUE,
			'err' => FALSE
		), JSON_UNESCAPED_UNICODE);
	}
}

?>
