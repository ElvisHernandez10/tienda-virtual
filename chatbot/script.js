// Función para enviar el mensaje del usuario
function sendMessage() {
    var userMessage = document.getElementById('user-input').value;

    // Evitar enviar un mensaje vacío
    if (userMessage.trim() === "") return;

    // Mostrar el mensaje del usuario en el chat
    displayMessage(userMessage, 'user');

    // Limpiar el campo de texto
    document.getElementById('user-input').value = '';

    // Mostrar el spinner de carga mientras esperamos la respuesta
    document.getElementById('loading').style.display = 'block';

    // Llamar a la función para obtener la respuesta del chatbot
    getBotResponse(userMessage);
}

// Función para mostrar el mensaje en el chat
function displayMessage(message, sender) {
    var chatBox = document.getElementById('chat-box');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (sender === 'user') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('bot-message');
    }

    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    // Desplazar el chat hacia abajo para mostrar el mensaje más reciente
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Función para obtener la respuesta del chatbot (enviamos la solicitud AJAX)
function getBotResponse(userMessage) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "chatbot.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Ocultar el spinner de carga
            document.getElementById('loading').style.display = 'none';

            // Mostrar la respuesta del chatbot
            displayMessage(xhr.responseText, 'bot');
        }
    };
    xhr.send("message=" + encodeURIComponent(userMessage));
}
