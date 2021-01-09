<?php

class Authorization {
	private $db = null;

	public function __construct(?mysqli $db) {
		$this->db = $db;
	}

	public function isAuthorized(): bool {
		return isset($_SESSION['status']) === true;
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

		$user_query = "SELECT * FROM USERS WHERE UserName = '{$user_name}' AND UserPassword = '{$user_password}';";
		$run_query = $this->db->query($user_query) or die($this->db->error);
		$user_row = $run_query->fetch_array(MYSQLI_ASSOC);

		if ($user_row) {
			$_SESSION['userID'] = $user_row['UserID'];
			$_SESSION['userName'] = $user_row['UserName'];
			$_SESSION['status'] = TRUE;
			$response['err'] = FALSE;
			$response['message'] = "Вы успешно зашли в учётную запись";
		} else {
			$response['err'] = TRUE;
			$response['message'] = "Пользователя с данными идентификаторами не существует.\nПроверьте логин/пароль";
		}

		echo json_encode($response, JSON_UNESCAPED_UNICODE);
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
				'message'=>'Пароли должны совпадать',
				'err'=>TRUE
			), JSON_UNESCAPED_UNICODE);
			return;
		}

		$user_query = "SELECT * FROM USERS WHERE UserName = '{$user_name}';";
		$run_query = $this->db->query($user_query) or die($this->db->error);
		$user_row = $run_query->fetch_array(MYSQLI_ASSOC);

		if ($user_row) {
			$response['err'] = TRUE;
			$response['message'] = "Пользователь с данным идентификатором уже существует";
		} else {
			$user_register_query = "INSERT INTO USERS (UserID, UserName, UserPassword) VALUES (NULL, '{$user_name}', '{$user_password}');";
			if ($this->db->query($user_register_query)) {
				$response['err'] = FALSE;
				$response['message'] = "Вы были успешно зарегистрированы";
			} else {
				$response['err'] = TRUE;
				$response['message'] = "Ошибка при запросе к БД";
			}
		}

		echo json_encode($response, JSON_UNESCAPED_UNICODE);
	}

	public function logout() {
		session_unset();
		session_destroy();
	}
}

?>
