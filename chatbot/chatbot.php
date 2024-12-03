<?php
if (isset($_POST['message'])) {
    $userMessage = $_POST['message'];
    // Depuración: Verificar si se recibe el mensaje
    echo "Mensaje recibido: " . $userMessage;

    // Respuestas predefinidas
    $responses = [
        "Hola, Quiero mas información del producto" => "¡Hola! El producto es una hidroponia que sirve para optimizar la cantidad de agua en el regado de tus plantas",
        "Quiero un producto" => "Claro, el producto cuenta con distintos kids de entrega",
        "Sabes sobre cuidado de plantas" => "Necesariamente de que plantas?",
        "qué puedes hacer?" => "Puedo ayudarte con información, o responder preguntas sobre nuestros productos.",
        "default" => "Lo siento, no entiendo esa pregunta. ¿Podrías reformularla?"
    ];

    // Comprobar si el mensaje contiene una palabra clave
    $userMessage = strtolower($userMessage);

    // Verificar si el mensaje tiene una respuesta predefinida
    if (array_key_exists($userMessage, $responses)) {
        echo $responses[$userMessage];
    } else {
        echo $responses['default'];
    }
} else {
    echo "No se recibió el mensaje correctamente.";
}
?>

