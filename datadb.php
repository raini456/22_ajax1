<?php

//datadb.php
//Hotelname     Adlon
//Sterne        5

$row = [];
$row['name'] = 'Adlon';
$row['stars'] = 5; 

//$json = "{'name': 'Adlon','stars': 5}";

//CSV
echo $row['name'] . ';' . $row['stars'];
