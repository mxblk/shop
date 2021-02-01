<?php
//read json
$json = file_get_contents('https://raw.githubusercontent.com/mxblk/json/main/store.json');
$json = json_decode($json, true);

///message
$message = '';
$message .= '<h1>Youre order</h1>';
$message .= '<p>phone: '.$_POST['ephone'].'</p>';
$message .= '<p>email: '.$_POST['email'].'</p>';
$message .= '<p>name: '.$_POST['ename'].'</p>';


$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id => $count) {
  $message .=$json[$id]['name'].' x ';
  $message .=$count.' = ';
  $message .=$count*$json[$id]['price'];
  $message .='<br>';
  $sum = $sum +$count*$json[$id]['price'];
}
$message .='sum'.$sum;

//print_r($message);

$to = 'mxblkmx@gmail.com'.',';
$to .=$_POST['email'];
$spectext = '<!DOCTYPE HTML><html><head><title>Order</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Your order', $spectext.$message.'</body></html>',$headers);

if($m){ echo 1;} else{echo 0;};
