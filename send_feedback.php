<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name']);
    $message = htmlspecialchars($_POST['message']);
    
    // E-mail de destino (seu e-mail)
    $to = "eliezer9944@yahoo.com";
    
    // Assunto do e-mail
    $subject = "Novo feedback recebido!";
    
    // Corpo do e-mail
    $body = "Nome: $name\n\nMensagem:\n$message";
    
    // Cabeçalhos (opcional: para melhorar a entrega do e-mail)
    $headers = "From: noreply@seusite.com\r\n";
    $headers .= "Reply-To: noreply@seusite.com\r\n";
    
    // Enviar o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Obrigado pelo feedback! Sua mensagem foi enviada com sucesso.";
    } else {
        echo "Desculpe, ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.";
    }
} else {
    // Caso alguém acesse o script diretamente
    echo "Método de solicitação inválido.";
}
?>
