<?php

$x = filter_input(INPUT_GET, 'x', FILTER_VALIDATE_INT);
$x *= 1.19;
echo $x;
