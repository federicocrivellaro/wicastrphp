<?php

header('Content-Type: application/json');



  function prompt($prompt_msg){
      echo("<script type='text/javascript'> var answer = prompt('".$prompt_msg."'); </script>");

      $answer = "<script type='text/javascript'> document.write(answer); </script>";
      return($answer);
  }

   //program
  $prompt_msg = "Please type your name.";
  $name = prompt($prompt_msg);

  $output_msg = "Hello there ".$name."!";
  echo($output_msg);
  


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
$origin = json_decode(file_get_contents(trim($app_path."/data/list.json")));
$user_file = $app_path."/data/users/".$message->user_id.".json";
$user_cached_file = $app_path."/data/cache/users/".$message->user_id.".json";
if (!file_exists($user_file) && !file_exists($user_cached_file)){
  if (!file_exists($app_path."/data/cache/users")){
    mkdir($app_path."/data/cache/users", 0755, true);
  }
  $user_file = fopen($user_cached_file, "w") or die("Unable to open file!");
  $user = '{"uid":"'.$message->user_id.'","n":"'.$message->name.'","d":"'.preg_replace("/\./","",microtime(true)).'", "p":"'.$message->phone.'"}';
  fwrite($user_file, $user);
  fclose($user_file);
}

$year = gmdate("Y");
$month = gmdate("m");
$day = gmdate("d");
$hour = gmdate("H");
$minute = gmdate("i");
$message->date = $year."/".$month."/".$day." ".$hour.":".$minute;
$message->id = empty($message->id) ? preg_replace("/\./","",microtime(true))."_".crc32(gmdate("U").$message->user_id) : $message->id;
$message->message = str_replace(array("\r\n", "\n\r", "\r", "\n"), "",nl2br($message->message));
// $message->message =  $message->message);
$message_out = array(
  "u" => $message->user_id,
  "i" => $message->id,
  "d" => $message->date,
  "n" => $message->name,
  "t" => $message->title,
  "c" => $message->category,
  "l" => $message->list,
  "m" => $message->message,
  "o" => $origin->list,
  "p" => $message->phone
);

if ($message->list === "local"){
  $prod_path = "data/messages_local/categories/";
  $cache_path = "data/cache/messages_local/categories";
}else{
  $prod_path = "data/messages/categories";
  $cache_path = "data/cache/messages/categories";
}
$message_path = $cache_path."/".$message->category."/".$year."/".$month."/".$day;
if (!empty($_POST["id"])){

  $to_delete = "";
  $message_to_edit_path = trim(shell_exec('find data -name "*'.$message->id.'.json"'));
  $is_cached = trim(shell_exec('find data/cache -name "*'.$message->id.'.json"'));
  $message_to_edit = json_decode(file_get_contents($message_to_edit_path));
  // echo "IS CACHED |".$is_cached."|\n\n";
  // print_r($message_out);
  // print_r($message_to_edit);
  // echo "TO EDIT PATH $message_to_edit_path\n";
  $new_cache_path = $cache_path."/".$message->category;
  $new_cache_date = implode("/",array_slice(explode("/",dirname($message_to_edit_path)), -3));
  $message_path = $new_cache_path."/".$new_cache_date;
  $message_out['d'] = $message_to_edit->d;
  $message_out['o'] = $message_to_edit->o;
  if ($message_to_edit->u != $message->user_id){
    echo '{"error":"You\'re not allowed to edit this message"}';
    exit;
  }else if (empty($message_to_edit_path)){
    echo '{"error":"The message to edit doesn\'t exist"}';
    exit;
  }else if ($message_out["c"] != $message_to_edit->c || $message_out["l"] != $message_to_edit->l || empty($is_cached)){
    # this is a cached message but category or list changed
    $to_delete = trim($message_to_edit_path);
  }
  // echo "TO DELETE $to_delete\n";

  if (!empty($to_delete)){
    unlink($to_delete);
  }
}
// echo "NEW MESSAGE PATH $message_path";
// exit;
if (!file_exists($message_path)) mkdir($message_path, 0755, true);

$message_file = fopen($message_path."/".$message->id.".json", "w") or die("Unable to open file!");
fwrite($message_file, json_encode($message_out));
fclose($message_file);
$response["id"] = $message->id ;

$response['message'] = "Thank you, your message has been sent. It'll take a few minutes to appear everywhere.";
echo json_encode($response);
?>
