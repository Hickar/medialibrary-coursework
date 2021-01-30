<?php
require_once("modules/database.php");
session_start();
header('Cache-Control: no-cache');
header('Cache-Control: max-age=0');
header('Expires: 0');
?>
<!doctype html>
<html lang="ru">
<head>
    <title>Hickarium</title>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./dist/main.css" type="text/css">
</head>
<body>
<div id="app"></div>
<script type="text/javascript" src="./dist/main.bundle.js">
</script>
</body>
</html>