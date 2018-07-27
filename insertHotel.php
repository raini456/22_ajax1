<?php

require_once './config.php';
$data = filter_input(INPUT_GET, 'params', 513);
$explodedData= explode('&', $data);
echo $explodedData;
foreach($explodedData as $key=>$value){
    $key=$value;
}



$dbHost = sprintf('mysql:host=%s;dbname=%s;charset=%s',
        HOST, DB, CHAR);
$db = new PDO($dbHost, USER, PASS);

//$sql = "SELECT name, stars FROM tb_hotels";
$sql = sprint('INSERT INTO %s(%s,%s) VALUES(%s,%s)', 'tb_hotels', 'name', 'stars', $name, $stars);
//$sql = "INSERT INTO ";
$statement = $db->query($sql);
//$rows = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($rows);
