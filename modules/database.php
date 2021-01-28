<?php

//class Database {
//	private $db = NULL;
//
//	public function __construct(string $host, string $user, string $password, string $db_name) {
//		$this->db = mysqli_connect($host, $user, $password, $db_name);
//	}
//
//	public function query(string $sql) {
//		$sql = $this->db->real_escape_string($sql);
//		$result = $this->db->query($sql) or die($this->db->error);
//		return $result->fetch_array(MYSQLI_ASSOC);
//	}
//
//	public function is_user_exists(string $username): bool {
//		return $this->query("SELECT * FROM USERS WHERE user_name = '{$username}';") ? TRUE : FALSE;
//	}
//}

$user = "root";
$password = "warertep";
$host = "localhost";
$database_name = "MEDIALIBRARY";

$db = new mysqli($host, $user, $password, $database_name) or die(mysqli_connect_error());

?>