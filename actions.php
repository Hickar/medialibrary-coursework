<?php
include("db.php");
session_start();

$response = array('message' => '', 'err' => FALSE, 'redirect' => '');

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST['login'])) {
    $user_data_JSON = file_get_contents('php://input');
    $user_data = json_decode($user_data_JSON, TRUE);

    $user_name = mysqli_real_escape_string($connection, $user_data['userName']);
    $user_password = mysqli_real_escape_string($connection, $user_data['userPassword']);

    if (empty($user_name) && empty($user_password)) {
        $response['err'] = TRUE;
        $response['message'] = 'Поля логина и пароля должны быть заполненными';
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        return;
    }

    $user_query = "SELECT * FROM USERS WHERE UserName = '{$user_name}' AND UserPassword = '{$user_password}';";
    $run_query = mysqli_query($connection, $user_query) or die(mysqli_error($connection));
    $user_row = mysqli_fetch_array($run_query);

    if ($user_row) {
        $_SESSION['userID'] = $user_row['UserID'];
        $_SESSION['userName'] = $user_row['UserName'];
        $response['err'] = FALSE;
        $response['message'] = "Вы успешно зашли в учётную запись";
        $response['redirect'] = "/dashboard";
    } else {
        $response['err'] = TRUE;
        $response['message'] = "Пользователя с данными идентификаторами не существует.\nПроверьте логин/пароль";
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST['register'])) {
    $user_data_JSON = file_get_contents('php://input');
    $user_data = json_decode($user_data_JSON, TRUE);

    $user_name = mysqli_real_escape_string($connection, $user_data['userName']);
    $user_password = mysqli_real_escape_string($connection, $user_data['userPassword']);
    $user_password_check = mysqli_real_escape_string($connection, $user_data['userPasswordCheck']);

    $user_query = "SELECT * FROM USERS WHERE UserName = '{$user_name}';";
    $run_query = mysqli_query($connection, $user_query) or die(mysqli_error($connection));
    $user_row = mysqli_fetch_array($run_query);

    if ($user_row > 0) {
        $response['err'] = TRUE;
        $response['message'] = "Пользователь с данным идентификатором существует";
    } else {
        $user_register_query = "INSERT INTO USERS (UserID, UserName, UserPassword) VALUES (NULL, '{$user_name}', '{$user_password}');";
        if (mysqli_query($connection, $user_register_query)) {
            $response['err'] = FALSE;
            $response['message'] = "Вы были успешно зарегистрированы";
            $response['redirect'] = "/login";
            $test = mysqli_affected_rows($connection);
        } else {
            $response['err'] = TRUE;
            $response['message'] = "Ошибка при запросе к БД";
        }
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}