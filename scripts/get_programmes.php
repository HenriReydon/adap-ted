<?php     
ini_set('display_errors',1);
	include 'config.php';

	try 
	{
	    $pdo = new PDO($dsn, $user, $password);
	    $pdo->exec("SET CHARACTER SET utf8");
	} 
	catch (PDOException $e) 
	{
	    echo 'Connection failed: ' . $e->getMessage();
	}

	//On check si un programme existe
	$sqlPgm = "SELECT programme FROM old_interfaces WHERE id_usager = ".$_GET['id_usager']." AND id_situation = ".$_GET['id_situation'];
	$reqPgm = $pdo->query($sqlPgm);
	if($rowPgm = $reqPgm->fetch())
	{
		if($rowPgm['programme'] != '&')
		{
			$apprs = explode('-', explode('&', $rowPgm['programme'])[0]);
			// RAJOUTER UN IF POUR VERIFIER QUE DES CONGIGNES SONT BIEN PRESENTES. CONDITION A VERIFIER : var_dump($mais[0] == "");
			if($apprs[0] != "")
			{
				foreach ($apprs as $appr) 
				{
					$sql = "SELECT Co.id, Co.intitule, Co.description, Ca.intitule AS Cat 
						 	 		FROM old_categories Ca, old_comportements Co 
									WHERE Co.id_categorie = Ca.id AND Co.id = ".$appr;

					$req = $pdo->query($sql);    
					while($row = $req->fetch())
						$apprentissages[$row['id']] = array('name' => $row['intitule'], 'cat' => $row['Cat'], 'desc' => $row['description']);
				}
			}
			else 
			{
				$apprentissages["0"] = array('name' => 'Aucune information.', 'cat' => 'Aucune information.', 'desc' => 'Aucun programme n\'a pu être chargé pour cette personne.');
			}

			$mais = explode('-', explode('&', $rowPgm['programme'])[1]);
			// RAJOUTER UN IF POUR VERIFIER QUE DES CONGIGNES SONT BIEN PRESENTES. CONDITION A VERIFIER : var_dump($mais[0] == "");
			if($mais[0] != "")
			{
				foreach ($mais as $mai) 
				{
					$sql = "SELECT Co.id, Co.intitule, Co.description, Ca.intitule AS Cat 
								  FROM old_categories Ca, old_comportements Co 
									WHERE Co.id_categorie = Ca.id AND Co.id = ".$mai;
					$req = $pdo->query($sql);
					while($row = $req->fetch())
						$maintiens[$row['id']] = array('name' => $row['intitule'], 'cat' => $row['Cat'], 'desc' => $row['description']);
				}
			}
			else
			{
				$maintiens["0"] = array('name' => 'Aucune information.', 'cat' => 'Aucune information.', 'desc' => 'Aucun programme n\'a pu être chargé pour cette personne.');					
			}
		}
		else 
		{
			$maintiens["0"] = array('name' => 'Aucune information.', 'cat' => 'Aucune information.', 'desc' => 'Aucun programme n\'a pu être chargé pour cette personne.');
			$apprentissages["0"] = array('name' => 'Aucune information.', 'cat' => 'Aucune information.', 'desc' => 'Aucun programme n\'a pu être chargé pour cette personne.');
		}		
	}

	$tabProgramm['app'] = $apprentissages;
	$tabProgramm['mai'] = $maintiens;
	
	echo json_encode($tabProgramm);
	$pdo = null;
?>