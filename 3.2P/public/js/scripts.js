const movieList = [
    {
        title: "Scooby-Doo: Mystery Adventures",
        image: "images/scooby.jpeg",
        link: "More Info",
        description: "A fun and light-hearted mystery story where a group of friends — and their iconic talking dog — team up to solve spooky puzzles. Full of humour, teamwork, and classic “Scooby snacks” moments."
    },
    {
        title: "Alvin & Chipmunks: The Musical Journey",
        image: "images/alvin.jpeg",
        link: "More Info",
        description: "A lively comedy featuring three musical chipmunks who bring chaos, energy, and plenty of catchy songs wherever they go. A perfect mix of music, friendship, and funny moments."
    },
    {
        title: "Moana: Voyage of the Oceans",
        image: "images/moana.jpeg",
        link: "More Info",
        description: "An inspiring adventure about a brave young girl who sets sail across the ocean to save her island. The story highlights courage, culture, and discovering who you truly are.ne of the best superhero films ever made."
    }
];

const addCards = (items) => {
    items.forEach(item => {
        let card =
            `<div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.title}
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <p><a href="#">${item.link}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.title}
                            <i class="material-icons right">close</i>
                        </span>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            </div>`;

        $("#card-section").append(card);
    });
};

const submitForm = () => {
    let newMovie = {
        title: $('#movie_title').val(),
        image: $('#image_url').val() || "images/scooby.jpeg",
        link: "More Info",
        description: $('#movie_desc').val()
    }

    console.log("Movie Added:", newMovie);

    $("#card-section").empty();
    movieList.push(newMovie);
    addCards(movieList);
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.modal').modal();

    addCards(movieList);

    $('#formSubmit').click(function () {
        submitForm();
    });
});
