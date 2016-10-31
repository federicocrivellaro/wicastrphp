<?php
	header('Content-type:application/json;charset=utf-8');

	$option = $_GET['file'];
	$json = file_get_contents("data/cache/".$option.".json");

	if ($json === false) {
    	$json = json_encode(array("jsonError", json_last_error_msg()));
    	if ($json === false) {
	        $json = '{"jsonError": "unknown"}';
    	}
	    http_response_code(500);
	}
	echo $json;
?>