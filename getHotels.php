<?php

require_once './config.php';

$dbHost = sprintf('mysql:host=%s;dbname=%s;charset=%s',
        HOST, DB, CHAR);
$db = new PDO($dbHost, USER, PASS);

$sql = "SELECT name, stars FROM tb_hotels";
$statement = $db->query($sql);
$rows = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($rows);
