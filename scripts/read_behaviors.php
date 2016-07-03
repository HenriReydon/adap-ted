<?php     
	//Récupération des paramètres de connexion à la BDD
	include 'config.php';

	//Connexion à la BDD
	try {
	    $pdo = new PDO($dsn, $user, $password);
	    $pdo->exec("SET CHARACTER SET utf8");
	} catch (PDOException $e) {
	    echo 'Connection failed: ' . $e->getMessage();
	}

	//Récupération des comportements envahissants
	$sql = 'SELECT * FROM old_comportements WHERE occurence=1';    
	$req = $pdo->query($sql);    
	while($row = $req->fetch())    
		$occurences[$row['id']] = $row['intitule'];

	$sql = 'SELECT * FROM old_comportements WHERE duree=1';    		  
	$req = $pdo->query($sql);    
	while($row = $req->fetch())    
		$minuteurs[$row['id']] = $row['intitule'];

	$tab['occ'] = $occurences;
	$tab['min'] = $minuteurs;
	echo json_encode($tab);
	$req->closeCursor(); 	
	$pdo = null;

	
?>