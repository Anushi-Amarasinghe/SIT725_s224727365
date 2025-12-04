const addCards = (items) => {
    items.forEach(item => {
        let card =
            `<div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.posterUrl}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.title}
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <p><a href="#">${item.genre}</a></p>
                        
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.title}
                            <i class="material-icons right">close</i>
                        </span>
                        <p class="card-text"><strong>Director:</strong> ${item.director}</p>
                        <p class="card-text"><strong>Genre:</strong> ${item.genre}</p>
                        <p class="card-text"><strong>Release Year:</strong> ${item.releaseYear}</p>
                        <p class="card-text"><strong>Rating:</strong> ${item.rating}/10</p>
                        <p class="card-text"><strong>Synopsis:</strong> ${item.synopsis}</p>
                    </div>
                </div>
            </div>`;

        $("#card-section").append(card);
    });
};

const submitForm = () => {
    let newMovie = {
        title: $('#movie_title').val(),
        genre: $('#movie_genre').val(),
        director: $('#movie_director').val(),
        releaseYear: parseInt($('#movie_releaseYear').val()),
        rating: parseFloat($('#movie_rating').val()),
        posterUrl: $('#poster_url').val() || "images/scooby.jpeg",
        synopsis: $('#movie_synopsis').val()
    }

    $.ajax({
        url: '/api/movies',
        type: 'POST',
        data: JSON.stringify(newMovie),
        contentType: 'application/json',
        success: function (result) {
            console.log("Movie Added:", result);
            $("#card-section").empty();
            loadMovies();
        },
        error: function (err) {
            console.log("Error:", err);
        }
    });
}

const loadMovies = () => {
    $.get('/api/movies', function (movies) {
        $("#card-section").empty();
        addCards(movies);
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.modal').modal();

    loadMovies();

    $('#formSubmit').click(function () {
        submitForm();
    });
});
