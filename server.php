<?php

$errors= "";
$message = (object) $_POST;
$response = array();

if (empty($message->title)){
  $errors .= "Title is not set. ";
}
if (empty($message->name)){
  $errors .= "Name is not set. ";
}
if (empty($message->category)){
  $errors .= "Category is not set. ";
}
if (empty($message->list)){
  $errors .= "List is not set. ";
}
if (empty($message->message)){
  $errors .= "Message is not set. ";
}
if ($errors != ""){
  echo '{"error":"'.$errors.'"}';
  exit;
}
$app_path = getcwd();

$year = gmdate("Y");
$month = gmdate("m");
$day = gmdate("d");
$hour = gmdate("H");
$minute = gmdate("i");
$message->date = $year."/".$month."/".$day." ".$hour.":".$minute;
$message->id = empty($message->id) ? preg_replace("/\./","",microtime(true))."_".crc32(gmdate("U")) : $message->id;
$message->message = str_replace(array("\r\n", "\n\r", "\r", "\n"), "",nl2br($message->message));
// $message->message =  $message->message);
$message_out = array(
  "i" => $message->id,
  "d" => $message->date,
  "n" => $message->name,
  "t" => $message->title,
  "c" => $message->category,
  "l" => $message->list,
  "m" => $message->message,
  "p" => $message->phone
);

$message_path = "/data/cache/messages/categories/".$message->category."/".$year."/".$month."/".$day;

if (!file_exists($app_path.$message_path)) mkdir($app_path.$message_path, 0755, true);

$message_file = fopen($app_path.$message_path."/".$message->id.".json", "w") or die("Unable to open file!");
fwrite($message_file, json_encode($message_out));
fclose($message_file);
$response["id"] = $message->id ;

$response['message'] = "Thank you, your message has been sent.";
echo "RESPONSE : ".json_encode($response);
?>
<br/><br/>
<a href="<? echo $message_path."/".$message->id; ?>.json">Your Message</a>
