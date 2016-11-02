<?php
	header('Content-type:application/json;charset=utf-8');

	$app_path = getcwd();
	$reports_path = $app_path."/data/cache/reports.json";

	if (!file_exists($app_path."/data/cache")){
    	mkdir($app_path."/data/cache", 0755, true);
    	$reports_file = fopen($reports_path, "w") or die("Unable to open file!");
    	$reports = array();
		fwrite($reports_file, json_encode($reports));
		fclose($reports_file);
  	}

	$option = $_GET['file'];
	$json = file_get_contents("data/".$option.".json");

	if ($json === false) {
    	$json = json_encode(array("jsonError", json_last_error_msg()));
    	if ($json === false) {
	        $json = '{"jsonError": "unknown"}';
    	}
	    http_response_code(500);
	}
	echo $json;
?>