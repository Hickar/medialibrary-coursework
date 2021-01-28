<?php

class Database {
	private $db = NULL;

	public function __construct__(string $host, string $user, string $password, string $db_name) {
		$this->db = mysqli_connect($host, $user, $password, $db_name);
	}

	public function query(string $sql, int $mode) {
		$sql = $this->db->real_escape_string($sql);
		$result = $this->db->query($sql) or die($this->db->error);
		return $result->fetch_array(MYSQLI_ASSOC);
	}
}

$user = "root";
$password = "warertep";
$host = "localhost";
$database_name = "MEDIALIBRARY";

$db = new mysqli($host, $user, $password, $database_name) or die(mysqli_connect_error());

?>