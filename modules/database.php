<?php

class Database {
	private $db = NULL;

	public function __construct(string $host, string $user, string $password, string $db_name) {
		$this->db = new mysqli($host, $user, $password, $db_name);
	}

	public function query($sql) {
		$escaped_sql = $this->db->real_escape_string($sql);
		return $this->db->query(stripslashes($escaped_sql));
	}

	public function create_user($name, $password) {
		return $this->query("INSERT INTO USERS (ID, name, password) VALUES (NULL, '{$name}', '{$password}')");
	}

	public function get_user(string $username) {
		return $this->query("SELECT * FROM USERS WHERE name='{$username}'")->fetch_array(MYSQLI_ASSOC);
	}

	public function update_user(string $ID, string $key, string $value) {
		return $this->query("UPDATE USERS SET $key='{$value}' WHERE ID='{$ID}'");
	}

	public function update_files_owner(string $username, string $id) {

	}

	public function is_user_exists(string $username = NULL): bool {
		return $this->query("SELECT * FROM USERS WHERE name='{$username}'")->fetch_array();
	}

	public function create_file(array $file) {
		return $this->db->query("INSERT INTO FILES (owner, name, URL, thumbnail_URL, type, ID)" .
			"VALUES ('{$file['owner']}', '{$file['name']}', '{$file['URL']}', '{$file['thumbnail_URL']}', '{$file['type']}', '{$file['ID']}')");
	}

	public function get_file(string $ID) {
		return $this->query("SELECT * FROM FILES WHERE ID='{$ID}'")->fetch_array();
	}

	public function get_files(string $username): array {
//		$tmp = array();
//		while ($record = $this->db->query("SELECT * FROM USERS WHERE name='{$username}'")) {
//			$tmp = $record;
//		}
		return $this->query("SELECT * FROM FILES WHERE owner='{$username}'")->fetch_all();
	}

	public function get_file_path(string $ID) {
		return $this->query("SELECT * FROM FILES WHERE ID='{$ID}'")->fetch_array();
	}

	public function delete_file(string $owner, string $ID) {
		return $this->query("DELETE FROM FILES WHERE owner='{$owner}' AND ID='{$ID}'");
	}

	public function update_file(string $ID, string $key, string $value) {
		return $this->query("UPDATE FILES SET $key='{$value}' WHERE ID='{$ID}'");
	}
}

?>