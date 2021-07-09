<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/src/Exception.php';
require './phpmailer/src/PHPMailer.php';
require './phpmailer/src/SMTP.php';

//CONFIG
$smtpUsername = "user@domain.com";
$smtpPassword = "password";

$user_message = "Complete";

$emailTo = "user@domain.com";
$emailToName = "Contactformulier";

$name = $_POST["name"];
$subject = $_POST['subject'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$language = $_POST['lang'];

$messageToSend = "<b>Taal:</b> $language <br>"
    ."<b>Naam:</b> $name <br>"
    ."<b>Email:</b> $email <br>"
    ."<b>Telefoonnummer:</b> $phone <br>"
    ."<b>Vraag of opmerking:</b> $message <br>";


$emailFrom = 'user@domain.com';
$emailFromName = $name;


$mail = new PHPMailer;
$mail->isSMTP(); 
$mail->SMTPDebug = 0; // 0 = off (for production use) - 1 = client messages - 2 = client and server messages
$mail->Host = "HOST ADRESS"; // use $mail->Host = gethostbyname('smtp.gmail.com');
$mail->Port = 587; // TLS only
$mail->SMTPSecure = 'tls'; // ssl is depracated
$mail->SMTPAuth = true;
$mail->Username = $smtpUsername;
$mail->Password = $smtpPassword;
$mail->setFrom($emailFrom, $emailFromName);
$mail->addAddress($emailTo, $emailToName);
$mail->Subject = $subject;
$mail->msgHTML($messageToSend); //$mail->msgHTML(file_get_contents('contents.html'), __DIR__); //Read an HTML message body from an external file, convert referenced images to embedded,
$mail->AltBody = 'HTML messaging not supported';

if(!$mail->send() && $user_message=="Complete"){
    $user_message = "Error";
    echo "Mailer Error: " . $mail->ErrorInfo;
}else{
    $user_message = "Complete";
}



print_r($user_message);