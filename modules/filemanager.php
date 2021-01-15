<?php

class FileManager {
	private $db = null;

	public function __construct(?mysqli $db) {
		$this->db = $db;
	}

	public function get_user_files_info() {
		$file_owner = $_SESSION['user_name'];

		$file_select_query = "SELECT * FROM FILES WHERE file_owner='{$file_owner}'";
		$result = $this->db->query($file_select_query) or die($this->db->error);
		$file_rows = array();

		while ($record = $result->fetch_array(MYSQLI_ASSOC)) {
			$file_rows[] = $record;
		}

		header('Pragma: public');
		header('Expires: 604800');
		header('Cache-Control: must-revalidate');
		header("Content-type: application/json");

		echo json_encode(array(
			'message' => $file_rows,
			'err' => FALSE
		), JSON_UNESCAPED_UNICODE);
	}

	public function get_user_file($file_ID) {
		$file_select_query = "SELECT 1 FROM FILES WHERE file_ID='{$file_ID}'";
		$result = $this->db->query($file_select_query) or die($this->db->error);
		$file_path = $result->fetch_array(MYSQLI_ASSOC)['file_URL'];

		if (file_exists($file_path)) {
			$file_info = finfo_open(FILEINFO_MIME_TYPE);
			header('Content-Type: ' . finfo_file($file_info, $file_path));
			finfo_close($file_info);

			header('Content-Disposition: attachment; filename=' . basename($file_path));
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize($file_path));

			ob_clean();
			flush();
			readfile($file_path);
		}
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
		$file_owner = $_SESSION['user_name'];
		$file_info = pathinfo($file['name']);
		$file_name = $file_info['filename'];
		$file_type = $this->get_file_type($file_info['extension']);

		$file_ID = sha1($file_name);
		$file_path = $dir_path . '/' . $file_ID . '.' . $file_info['extension'];
		$file_insert_query = "INSERT INTO FILES (file_owner, file_name, file_URL, file_type, file_ID)" .
			"VALUES ('{$file_owner}', '{$file_name}', '{$file_path}', '{$file_type}', '{$file_ID}')";

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
