<?php

class Database {
	private $db = NULL;

	public function __construct(string $host, string $user, string $password, string $db_name) {
		$this->db = new mysqli($host, $user, $password, $db_name);
	}

	public function is_user_exists(string $username = NULL): bool {
		return $this->db->query("SELECT * FROM USERS WHERE user_name = '{$username}';")->fetch_array() or FALSE;
	}

	public function get_user_files_info(string $username): array {
		$sql = $this->db->real_escape_string("SELECT * FROM FILES WHERE owner='{$username}'");
		return $this->db->query($sql)->fetch_all(ARRAY_FILTER_USE_BOTH);
	}

	public function get_user_file_path(string $ID) {
		$sql = $this->db->real_escape_string("SELECT * FROM FILES WHERE ID='{$ID}'");
		return $this->db->query($sql)->fetch_array();
	}

	public function delete_user_file(string $owner, string $ID) {
		$sql = $this->db->real_escape_string("DELETE FROM FILES WHERE owner='{$owner}' AND ID='{$ID}'");
		return $this->db->query($sql);
	}

	public function update_user_file(string $ID, string $key, string $value) {
		$sql = $this->db->real_escape_string("UPDATE FILES SET $key = '{$value}' WHERE owner='{$_SESSION['user_name']}' AND ID='{$ID}'");
		return $this->db->query($sql);
	}
}

?>