<?php

$file = $_GET['fichier'].'.json';
if(file_exists($file))
{
	echo file_get_contents($file);
	//echo json_decode(file_get_contents($file));
}
else echo 'ERROR';

?>