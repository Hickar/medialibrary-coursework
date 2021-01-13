<?php

class FileManager {
	private $db = null;

	public function __construct(?mysqli $db) {
		$this->db = $db;
	}

	public function get_user_files() {

	}

	public function upload_user_files(array $files, string $dir_path) {
		if (!file_exists($dir_path)) {
			mkdir($dir_path, 0777);
		}

		foreach ($files as $file) {
			$this->upload_user_file($dir_path, $file);
		}

		echo json_encode(array(
			'message' => 'Файлы были успешно загружены',
			'err' => FALSE
		), JSON_UNESCAPED_UNICODE);
	}

	public function upload_user_file($dir_path, $file) {
		$file_owner = $_SESSION['userName'];
		$file_info = pathinfo($file['name']);
		$file_name = $file_info['filename'];
		$file_type = $this->get_file_type($file_info['extension']);

		$file_path = $dir_path . '/' . sha1($file_name) . '.' . $file_info['extension'];
		$file_insert_query = "INSERT INTO FILES (file_owner, file_name, file_URL, file_type)" .
			"VALUES ('{$file_owner}', '{$file_name}', '{$file_path}', '{$file_type}')";

		if ($this->db->query($file_insert_query) && move_uploaded_file($file['tmp_name'], $file_path)) {
			return;
		}

		echo json_encode(array(
			'message' => 'Ошибка при записи файла',
			'err' => TRUE
		), JSON_UNESCAPED_UNICODE);
	}

	public function get_file_type($extension): string {
		$images_extensions = array("jpg", "png", "gif", "svg");
		$video_extensions = array("mp4", "ogg", "webm");
		$audio_extensions = array("mp3", "ogg", "aac");
		$document_extensions = array("txt", "pdf", "doc", "docx", "rtf");

		if (in_array($extension, $images_extensions)) return "image";
		if (in_array($extension, $video_extensions)) return "video";
		if (in_array($extension, $audio_extensions)) return "audio";
		if (in_array($extension, $document_extensions)) return "document";
		return "other";
	}

	public function delete_user_files() {

	}

	public function update_user_files() {

	}

	public function normalize_user_files(&$vector): array {
		$result = array();
		foreach ($vector as $key1 => $value1)
			foreach ($value1 as $key2 => $value2)
				$result[$key2][$key1] = $value2;
		return $result;
	}
}

?>
