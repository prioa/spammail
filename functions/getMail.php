<?php
$address = $_POST['addr'];
$id = $_POST['id'];
function checkMailbox($address, $id){
    $add = explode("@", $address);
    $json = file_get_contents("https://www.1secmail.com/api/v1/?action=readMessage&login={$add[0]}&domain={$add[1]}&id={$id}");
    echo $json;
}
checkMailbox($address, $id);