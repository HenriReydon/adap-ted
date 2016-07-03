<?php

$fp = fopen('save.json', 'w');
fwrite($fp, file_get_contents('php://input'));
fclose($fp);

?>