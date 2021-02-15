<?php

ini_set('session.cookie_lifetime', 3600);
ini_set('session.use_cookies', 1);
// ini_set('session.cookie_domain', getenv("HOST_ADDRESS"));
ini_set('max_input_time', 10800);
ini_set('max_execution_time', 10800);
ini_set('upload_max_filesize', '100M');
ini_set('post_max_size', '100M');
ini_set('session.gc_maxlifetime', 10800);
ini_set('display_errors', -1);
ini_set('session.cookie_secure','Off');
ini_set('magic_quotes_gpc', 'Off');

error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

date_default_timezone_set('Europe/Moscow');
