let selectedRating = 0;
const ratingButtons = document.querySelectorAll('.stars i');
const ratingResult = document.getElementById('rating-result');
const submitButton = document.getElementById('submit-rating');
const commentBox = document.getElementById('comment');
const submitCommentButton = document.getElementById('submit-comment');
const savedReviewsContainer = document.getElementById('saved-reviews');
const fictitiousReviewsContainer = document.getElementById('fictitious-reviews');

// Actualizar estrellas cuando se hace hover
ratingButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        let value = button.getAttribute('data-value');
        updateStars(value);
    });

    button.addEventListener('mouseout', () => {
        updateStars(selectedRating);
    });

    button.addEventListener('click', () => {
        selectedRating = button.getAttribute('data-value');
        updateStars(selectedRating);
        ratingResult.innerText = `Tu calificación: ${selectedRating} estrellas`;
        submitButton.disabled = false; // Habilitar botón de calificación
    });
});

// Función para actualizar las estrellas
function updateStars(value) {
    ratingButtons.forEach(button => {
        if (parseInt(button.getAttribute('data-value')) <= value) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

// Habilitar el envío de comentario cuando se escribe algo
commentBox.addEventListener('input', () => {
    if (commentBox.value.trim() !== "") {
        submitCommentButton.disabled = false;
    } else {
        submitCommentButton.disabled = true;
    }
});

// Cargar los comentarios guardados al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.forEach(review => {
        displayReview(review.rating, review.comment);
    });

    // Mostrar comentarios ficticios predefinidos
    const fictitiousReviews = [
        { rating: 5, comment: "¡Excelente producto! Muy satisfecho con la compra." },
        { rating: 4, comment: "Buen producto, aunque me gustaría que tuviera más características." },
        { rating: 3, comment: "El producto está bien, pero podría mejorar en algunos aspectos." }
    ];

    fictitiousReviews.forEach(review => {
        displayFictitiousReview(review.rating, review.comment);
    });
});

// Enviar calificación y comentario
submitButton.addEventListener('click', () => {
    if (selectedRating > 0 && commentBox.value.trim() !== "") {
        const newReview = {
            rating: selectedRating,
            comment: commentBox.value.trim()
        };

        // Guardar en localStorage
        let savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        savedReviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(savedReviews));

        // Mostrar el nuevo comentario en la interfaz
        displayReview(newReview.rating, newReview.comment);

        // Limpiar formulario
        resetForm();
    }
});

// Función para mostrar un comentario guardado
function displayReview(rating, comment) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');
    
    reviewDiv.innerHTML = `
        <div class="user-info">Usuario</div>
        <div class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
        <p>${comment}</p>
    `;

    savedReviewsContainer.appendChild(reviewDiv);
}

// Mostrar comentarios ficticios
function displayFictitiousReview(rating, comment) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');
    
    reviewDiv.innerHTML = `
        <div class="user-info">Ficticio</div>
        <div class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
        <p>${comment}</p>
    `;

    fictitiousReviewsContainer.appendChild(reviewDiv);
}

// Resetear el formulario después de enviar el comentario
function resetForm() {
    selectedRating = 0;
    updateStars(selectedRating);
    ratingResult.innerText = "Tu calificación: 0 estrellas";
    commentBox.value = "";
    submitButton.disabled = true;
    submitCommentButton.disabled = true;
}

