<?php

require_once './config.php';
$dbHost = sprintf('mysql:host=%s;dbname=%s;charset=%s', HOST, DB, CHAR);
$db = new PDO($dbHost, USER, PASS);

$hotelName = filter_input(INPUT_POST, 'name', 513, FILTER_FLAG_NO_ENCODE_QUOTES);
$hotelStars = filter_input(INPUT_POST, 'stars', FILTER_VALIDATE_INT);
if (is_string($hotelName) && is_int($hotelStars)) {
    $stmt = $db->prepare('INSERT INTO tb_hotels(name, stars) VALUES (:n, :s)');
// bindParam kann man in einer Schleife mit ->execute verwenden, mit bindValue ist das nicht möglich
// es kann nur einmal verwandt werden!!
//    $stmt->bindParam(':n', $hotelName, PDO::PARAM_STR);
//    $stmt->bindParam(':s', $hotelStars, PDO::PARAM_INT);
    $stmt->bindValue(':n', $hotelName, PDO::PARAM_STR);
    $stmt->bindValue(':s', $hotelStars, PDO::PARAM_INT);
    
    $stmt->execute();
}

