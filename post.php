<?php

  $app_path = getcwd();
  $reports_path = $app_path."/data/cache/reports.json";
  
  $reports = file_get_contents('php://input');
  $reports_file = fopen($reports_path, "w") or die("Unable to open file!");
  fwrite($reports_file,$reports);
  fclose($reports_file);


  $json = file_get_contents("data/cache/reports.json");
  if ($json === false) {
      $json = json_encode(array("jsonError", json_last_error_msg()));
      if ($json === false) {
          $json = '{"jsonError": "unknown"}';
      }
      http_response_code(500);
  }
  echo $reports;
?>
