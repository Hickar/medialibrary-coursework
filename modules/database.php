<?php
$user = "root";
$password = "warertep";
$host = "localhost";
$database_name = "MEDIALIBRARY";
$table_name = "Users";

$db = mysqli_connect($host, $user, $password, $database_name);

if (mysqli_connect_errno()) {
    die(mysqli_connect_error());
}

?>