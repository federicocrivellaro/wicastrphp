<?php
	header('Content-type:application/json;charset=utf-8');

	$option = $_GET['file'];

	$app_path = getcwd();
	$reports_path = $app_path."/cache/reports.json";

	if (!file_exists($app_path."/cache")){
		// CREATE FOLDER 
    	mkdir($app_path."/cache", 0755, true);
    	// CREATE FILE 
    	$reports_file = fopen($reports_path, "w") or die("Unable to open file!");
    	$reports = array();
		fwrite($reports_file, json_encode($reports));
		fclose($reports_file);
  	}else{
  		chmod($app_path."/cache", 0755);
  	}

	$json=file_get_contents($app_path."/cache/reports.json");

	if ($json === false) {
    	$json = json_encode(array("jsonError", json_last_error_msg()));
    	if ($json === false) {
	        $json = '{"jsonError": "unknown"}';
    	}
	    http_response_code(500);
	}
	echo $json;
?>