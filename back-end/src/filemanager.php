<?php

class FileManager {
	private $db = NULL;
	private $extensions = array(
		'image' => ["jpg", "jpeg", "png", "gif", "svg"],
		'video' => ["mp4", "ogg", "webm"],
		'audio' => ["mp3", "ogg", "aac"],
		'document' => ["txt", "pdf", "doc", "docx", "rtf"]
	);

	public function __construct(Database &$db) {
		$this->db = &$db;
	}

	public function get_user_files_info(string $ID) {
		return $this->db->get_files_by_owner_ID($ID);
	}

	public function get_user_file(string $file_ID, bool $is_thumbnail = FALSE): bool {
		$file = $this->db->get_file_by_ID($file_ID);
		$file_path = $is_thumbnail ? $file['thumbnail_URL'] : $file['URL'];
		$file_path_info = pathinfo($file_path);

		if ($file['owner_ID'] !== $_SESSION['user_ID']) {
			return FALSE;
		}

		$file_path = "/app/storage/{$_SESSION['user_ID']}/{$file_path_info['filename']}.{$file_path_info['extension']}";
		
		if (file_exists($file_path)) {
			$file_info = finfo_open(FILEINFO_MIME_TYPE);
			finfo_close($file_info);

			// header('Content-Type: ' . finfo_file($file_info, $file_path));
			header('Content-Description: File Transfer');
			header('Content-Disposition: attachment; filename=' . basename($file_path));
			header('Cache-Control: max-age=604800, must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize($file_path));
			header('Content-Transfer-Encoding: binary');

			// ob_clean();
			if (ob_get_contents()) ob_end_clean();
			flush();
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
		$file_ID = uniqid();
		$file_info = pathinfo($file['name']);
		$dir_path = realpath($dir_path);
		$new_file = array(
			'owner_ID' => $_SESSION['user_ID'],
			'name' => "{$file_info['filename']}.{$file_info['extension']}",
			'URL' => "$dir_path/$file_ID.{$file_info['extension']}",
			'thumbnail_URL' => NULL,
			'type' => $this->get_file_type($file_info['extension']),
			'ID' => $file_ID
		);

		if ($file['error'] !== 0) {
			send_error_response($this->upload_error_message($file['error']));
			return FALSE;
		}

		if (move_uploaded_file($file['tmp_name'], $new_file['URL'])) {
			if ($new_file['type'] == "image") {
				if ($file_info['extension'] === "svg") {
					$new_file['thumbnail_URL'] = $new_file['URL'];
				} else {
					$new_file['thumbnail_URL'] = $this->create_minimized_image($new_file['URL'], $dir_path);
				}
			}

			if ($new_file['type'] == "video") {
				$new_file['thumbnail_URL'] = $this->create_video_thumbnail($new_file['URL'], $dir_path);
			}

			return $this->db->create_file($new_file) ? TRUE : FALSE;
		}

		return FALSE;
	}

	public function get_file_type($extension): string {
		$extension = strtolower($extension);
		if (in_array($extension, $this->extensions['image'])) return "image";
		if (in_array($extension, $this->extensions['video'])) return "video";
		if (in_array($extension, $this->extensions['audio'])) return "audio";
		if (in_array($extension, $this->extensions['document'])) return "document";
		return "other";
	}

	public function delete_user_file(string $file_owner, string $file_ID): bool {
		return $this->db->delete_file($file_owner, $file_ID);
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
		$minimized_file_path = $dir_path . "/" . $minimized_file_name;
		$cmd = "ffmpeg -i " . realpath($file_path) . " -vf scale=\"360:-1\" " . $minimized_file_path;

		shell_exec($cmd);
		return $minimized_file_path;
	}

	public function create_video_thumbnail(string $file_path, string $dir_path, string $suffix = "_thumb"): string {
		$file_info = pathinfo($file_path);
		$thumbnail_name = $file_info['filename'] . $suffix . ".jpg";
		$thumbnail_path = $dir_path . "/" . $thumbnail_name;
		$cmd = "ffmpeg -i " . realpath($file_path) . " -vframes 1 -an -filter:v scale=\"320:-1\" -ss 0 " . $thumbnail_path;

		shell_exec($cmd);
		return $thumbnail_path;
	}

	private function upload_error_message($code): string {
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
