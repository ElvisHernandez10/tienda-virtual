<?php
// Habilitar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Obtiene los datos en formato JSON
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['rating']) && isset($data['comment'])) {
    $rating = $data['rating'];
    $comment = $data['comment'];

    // Validar que la calificación esté entre 1 y 5
    if ($rating >= 1 && $rating <= 5) {
        // Aquí puedes guardar la calificación y el comentario en la base de datos
        // Conéctate a la base de datos MySQL
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "foro_recomendaciones"; // Nombre de tu base de datos

        // Crear conexión
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Verificar conexión
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Insertar datos en la base de datos
        $stmt = $conn->prepare("INSERT INTO ratings (rating, comment) VALUES (?, ?)");
        $stmt->bind_param("is", $rating, $comment);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["success" => false, "message" => "La calificación debe estar entre 1
