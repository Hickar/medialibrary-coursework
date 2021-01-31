<?php

function send_response($data): void {
	echo json_encode(array(
		'data' => $data,
		'err' => FALSE
	), JSON_UNESCAPED_UNICODE);
}

function send_error_response($data): void {
	echo json_encode(array(
		'data' => $data,
		'err' => TRUE
	), JSON_UNESCAPED_UNICODE);
}