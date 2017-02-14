<?php 

	$posted = $_POST["repo"];


	include_once("db.inc");

	$stmt = $pdo->prepare("INSERT INTO watched_repos (Repo) VALUES (:name)");
	$stmt->bindParam(':name', $posted);
	$stmt->execute();

	header( 'Location: index.php' ) ;


?>