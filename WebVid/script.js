// Obtener los elementos del DOM
const videoUrlInput = document.getElementById('video-url');
const addVideoButton = document.getElementById('add-video-btn');
const videosContainer = document.getElementById('videos-container');

// Función para agregar un video
addVideoButton.addEventListener('click', () => {
    const videoUrl = videoUrlInput.value.trim();

    if (videoUrl && isValidYouTubeUrl(videoUrl)) {
        // Extraer ID de video de YouTube
        const videoId = extractYouTubeVideoId(videoUrl);

        // Crear un objeto de video
        const videoData = {
            url: videoUrl,
            id: videoId
        };

        // Mostrar el video en la página
        displayVideo(videoData);

        // Guardar en localStorage
        const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
        storedVideos.push(videoData);
        localStorage.setItem('videos', JSON.stringify(storedVideos));

        // Limpiar el campo
        videoUrlInput.value = '';
    } else {
        alert('Por favor ingresa una URL válida de YouTube.');
    }
});

// Función para extraer el ID del video de YouTube
function extractYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Función para validar que la URL sea de YouTube
function isValidYouTubeUrl(url) {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    return regex.test(url);
}

// Función para mostrar el video y su reseña
function displayVideo(video) {
    const videoCard = document.createElement('div');
    videoCard.classList.add('video-card');

    // Crear el iframe para el video
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    // Título del video
    const title = document.createElement('h3');
    title.textContent = 'Sistema Hidropónico';

    // Descripción del video (estática, puedes cambiarla si es necesario)
    const description = document.createElement('p');
    description.textContent = 'En este video aprenderás los conceptos básicos sobre los sistemas hidropónicos, cómo funcionan y cómo puedes implementarlos en tu
