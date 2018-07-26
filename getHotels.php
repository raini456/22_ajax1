<?php

define('HOST', 'localhost');
define('DB', 'db_hotels');
define('USER', 'db_hotels');
define('PASS', 'V9e2cDixejH8l8Nv');
define('CHAR', 'utf8mb4');

$dbHost = sprintf('mysql:host=%s;dbname=%s;charset=%s',
        HOST, DB, CHAR);
$db = new PDO($dbHost, USER, PASS);

$sql = "SELECT * FROM tb_hotels";
$statement = $db->query($sql);
$rows = $statement->fetchAll();

echo json_encode($rows);
