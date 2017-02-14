<?php 

  $arr = array();

	include_once("db.inc");

  $sql = "SELECT * FROM `watched_repos` LIMIT 0, 30 ";

  $stmt = $pdo->query($sql);
  while ($row = $stmt->fetch())
  {
      $item = array("repo" => $row['Repo']); 
      array_push($arr, $item);
  }

  $final = array("projects" => $arr);
  header('Content-type: application/json');
  echo json_encode($final);

?>