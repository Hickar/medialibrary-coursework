<?php

class FileManager {
	private $db = NULL;

	public function __construct(mysqli &$db) {
		$this->db = &$db;
	}

	public function get_user_files_info(): bool {
		$file_owner = $_SESSION['user_name'];

		$file_select_query = "SELECT * FROM FILES WHERE file_owner='{$file_owner}'";
		$result = $this->db->query($file_select_query) or die($this->db->error);
		$file_rows = array();

		while ($record = $result->fetch_array(MYSQLI_ASSOC)) {
			$file_rows[] = array(
				'name' => $record['file_name'],
				'ID' => $record['file_ID'],
				'type' => $record['file_type'],
				'dateAdded' => $record['date_added']
			);
		}

		header('Pragma: public');
		header('Cache-Control: max-age=0, must-revalidate');
		header('Content-type: application/json');

		send_response($file_rows);
		return true;
	}

	public function get_user_file(string $file_ID, bool $is_thumbnail = FALSE): bool {
		$file_select_query = "SELECT * FROM FILES WHERE file_ID='{$file_ID}'";
		$file_record = $this->db->query($file_select_query)->fetch_array(MYSQLI_ASSOC) or die($this->db->error);
		$file_path = $is_thumbnail ? $file_record['file_thumbnail_URL'] : $file_record['file_URL'];

		if (file_exists($file_path) || true) {
			$file_info = finfo_open(FILEINFO_MIME_TYPE);
			header('Content-Type: ' . finfo_file($file_info, $file_path));
			finfo_close($file_info);

			header('Content-Disposition: attachment; filename=' . basename($file_path));
			header('Cache-Control: max-age=604800, must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize($file_path));

			ob_clean();
			flush();
			readfile($file_path);
			return true;
		}

		return false;
	}

	public function download_user_file(string $file_ID): bool {
		$file_select_query = "SELECT * FROM FILES WHERE file_ID='{$file_ID}'";
		$file_record = $this->db->query($file_select_query)->fetch_array(MYSQLI_ASSOC) or die($this->db->error);
		$file_path = $file_record['file_URL'];

		if (file_exists($file_path)) {
			header('Cache-Control: public');
			header('Content-Description: File Transfer');
			header('Content-Disposition: attachment; filename=' . basename($file_path));
			header('Content-Type: ' . mime_content_type($file_path));
			header('Content-Transfer-Encoding: binary');
			readfile($file_path);
			return TRUE;
		}

		return FALSE;
	}

	public function upload_user_files(array $files, string $dir_path): bool {
		if (!file_exists($dir_path)) {
			mkdir($dir_path, 0777);
		}

		foreach ($files as $file) {
			$this->upload_user_file($dir_path, $file);
		}

		send_response('Файлы были успешно загружены');
		return TRUE;
	}

	public function upload_user_file($dir_path, $file): bool {
		$file_owner = $_SESSION['user_name'];
		$file_info = pathinfo($file['name']);
		$file_name = $file_info['filename'] . '.' . $file_info['extension'];
		$file_ID = uniqid();
		$file_type = $this->get_file_type($file_info['extension']);
		$file_path = $dir_path . '/' . $file_ID . '.' . $file_info['extension'];
		$file_thumbnail_path = NULL;

		if ($file['error'] !== 0) {
			send_error_response($this->upload_error_message($file['error']));
			return FALSE;
		}

		if (move_uploaded_file($file['tmp_name'], $file_path)) {
			if ($file_type == "image") {
				$file_thumbnail_path = $this->create_minimized_image($file_path, $dir_path);
			}

			if ($file_type == "video") {
				$file_thumbnail_path = $this->create_video_thumbnail($file_path, $dir_path);
			}

			$file_insert_query = "INSERT INTO FILES (file_owner, file_name, file_URL, file_thumbnail_URL, file_type, file_ID)" .
				"VALUES ('{$file_owner}', '{$file_name}', '{$file_path}', '{$file_thumbnail_path}', '{$file_type}', '{$file_ID}')";

			return $this->db->query($file_insert_query) ? TRUE : FALSE;
		}

		return FALSE;
	}

	public function get_file_type($extension): string {
		$extension = strtolower($extension);
		$images_extensions = array("jpg", "jpeg", "png", "gif", "svg");
		$video_extensions = array("mp4", "ogg", "webm");
		$audio_extensions = array("mp3", "ogg", "aac");
		$document_extensions = array("txt", "pdf", "doc", "docx", "rtf");

		if (in_array($extension, $images_extensions)) return "image";
		if (in_array($extension, $video_extensions)) return "video";
		if (in_array($extension, $audio_extensions)) return "audio";
		if (in_array($extension, $document_extensions)) return "document";
		return "other";
	}

	public function delete_user_file(string $file_ID): bool {
		$file_owner = $_SESSION['user_name'];
		$file_deletion_query = "DELETE FROM FILES WHERE file_owner='{$file_owner}' AND file_ID='{$file_ID}'";
		return $this->db->query($file_deletion_query) ? TRUE : FALSE;
	}

	public function update_user_file(string $ID, string $key, string $value): bool {
		$update_query = "UPDATE FILES SET $key = '{$value}' WHERE file_owner='{$_SESSION['user_name']}' AND file_ID='{$ID}';";
		return $this->db->query($update_query) ? TRUE : FALSE;
	}

	public function normalize_user_files($vector): array {
		$result = array();
		foreach ($vector as $key1 => $value1)
			foreach ($value1 as $key2 => $value2)
				$result[$key2][$key1] = $value2;
		return $result;
	}

	public function create_minimized_image(string $file_path, string $dir_path, string $suffix = "_min"): string {
		$file_info = pathinfo($file_path);
		$minimized_file_name = $file_info['filename'] . $suffix . "." . $file_info['extension'];
		$minimized_file_path = realpath($dir_path) . "/" . $minimized_file_name;
		$cmd = "/usr/local/bin/ffmpeg -i " . realpath($file_path) . " -vf scale=\"360:-1\" " . $minimized_file_path;

		shell_exec($cmd);
		return $dir_path . "/" . $minimized_file_name;
	}

	public function create_video_thumbnail(string $file_path, string $dir_path, string $suffix = "_thumb"): string {
		$file_info = pathinfo($file_path);
		$thumbnail_name = $file_info['filename'] . $suffix . ".jpg";
		$thumbnail_path = realpath($dir_path) . "/" . $thumbnail_name;
		$cmd = "/usr/local/bin/ffmpeg -i " . realpath($file_path) . " -vframes 1 -an -filter:v scale=\"320:-1\" -ss 0 " .
			$thumbnail_path;

		shell_exec($cmd);
		return $dir_path . "/" . $thumbnail_name;
	}

	private function upload_error_message($code): string {
		$message = "";
		switch ($code) {
			case UPLOAD_ERR_INI_SIZE:
				$message = "Файл превышает максимально допустимый размер, указанный в конфигурации PHP";
				break;
			case UPLOAD_ERR_FORM_SIZE:
				$message = "Файл превышает максимально допустимый размер, указанный в HTML форме";
				break;
			case UPLOAD_ERR_PARTIAL:
				$message = "Файл был загружен неполностью";
				break;
			case UPLOAD_ERR_NO_FILE:
				$message = "Файл не был загружен";
				break;
			case UPLOAD_ERR_NO_TMP_DIR:
				$message = "Не найдена папка для временного хранения файлов";
				break;
			case UPLOAD_ERR_CANT_WRITE:
				$message = "Не удалось записать файл на диск";
				break;
			case UPLOAD_ERR_EXTENSION:
				$message = "Загрузка файла была остановлена расширением php";
				break;
			default:
				$message = "Неизвестная ошибка";
		}
		return $message;
	}
}

?>
