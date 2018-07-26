<?php

//datadb.php
//Hotelname     Adlon
//Sterne        5



//  | name [0]  | stars [1] |
//  | Adlon     | 5         |
//  | Generator | 3         |

//SELECT * FROM table;
// ->fetchAll(PDO::FETCH_BOTH)  (default)

$row5 = [];
$row5[0] = [];
$row5[0][0] = 'Ädlon';
$row5[0][1] = 5;
$row5[0]['name'] = 'Adlon';
$row5[0]['stars'] = 5;
$row5[1] = [];
$row5[1][0] = 'Generator';
$row5[1][1] = 3;
$row5[1]['name'] = 'Generator';
$row5[1]['stars'] = 3;











// ->fetchAll  PDO::FETCH_ASSOC

$row4 = [];
$row4[0] = [];
$row4[0]['name'] = 'Adlon';
$row4[0]['stars'] = 5;
$row4[1] = [];
$row4[1]['name'] = 'Generator';
$row4[1]['stars'] = 3;

// ->fetchAll  PDO::FETCH_NUM

$row3 = [];
$row3[0] = [];
$row3[0][0] = 'Adlon';
$row3[0][1] = 5;
$row3[1] = [];
$row3[1][0] = 'Generator';
$row3[1][1] = 3;


// ->fetch  PDO::FETCH_NUM

$row1 = [];
$row1[0] = 'Adlon';
$row1[1] = 5;

// ->fetch  PDO::FETCH_ASSOC

$row2 = [];
$row2['name'] = 'Adlon';
$row2['stars'] = 5;




//$json = '{"name": "Adlon","stars": 5}';

echo json_encode($row2);
