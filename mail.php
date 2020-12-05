<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST['email'];

    $content = 'Отправить купон на указанный email-адрес: ' . $email;
    
    $coupon_send = 'Ваш купон на скидку: TEADISCOUNT';

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

    $success = mail("admin@teaberry.com", 'Запрос на получение скидки', $content, $headers);

    if ($success) {
        http_response_code(200);
        mail(" $email", 'Запрос на получение скидки', $coupon_send);
        echo "Письмо отправлено";
    } else {
        http_response_code(500);
        echo "Письмо не отправлено";
    }

} else {
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}

