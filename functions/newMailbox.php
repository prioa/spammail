<?php
function newMailbox() {
    $json = file_get_contents('https://www.1secmail.com/api/v1/?action=genRandomMailbox');
    $data = json_decode($json);
    print $data[0];
}
newMailbox();
