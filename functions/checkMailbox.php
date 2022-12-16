<?php
$address = $_POST['addr'];
function checkMailbox($address){
    $split = explode("@", $address);
    $json = file_get_contents("https://www.1secmail.com/api/v1/?action=getMessages&login={$split[0]}&domain={$split[1]}");
    echo $json;
}
checkMailbox($address);