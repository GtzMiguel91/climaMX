
function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filterImages() {
    const indices = [];
    let searchString = $('#keyword').val().toLowerCase();
    searchString = quitarTildes(searchString.toLowerCase())

    const filteredImages = estados.filter((image, idx) => {
        if (image.toLowerCase().includes(searchString)) {
            indices.push((idx + 1).toString())
            return idx
        }
    });
    displayImages(indices);
}

function displayImages(indexImages) {
    const imageContainer = $('#imageContainer');
    imageContainer.empty();

    indexImages.forEach(element => {
        const imgElement = $('<img>').attr({
            src: `../img/principales/${element}.png`,
            alt: 'Image',
            class: 'image img-fluid',
        });

        const anchorElement = $('<a>').attr('href', `municipios.html?estado=${estados[parseInt(element) - 1]}`);
        anchorElement.append(imgElement);

        const colElement = $('<div>').addClass('col-md-3 mb-3');
        colElement.append(anchorElement);

        // Append the column to the container
        imageContainer.append(colElement);

    });
}

$(document).ready(async function () {
    await addGeneralElements()
    addMainElement()
    // Sample array of image URLs
    const numberOfImages = estados.length;
    const indices = [];

    for (let i = 1; i <= numberOfImages; i++) {
        indices.push(i.toString());
    }
    // Initial display of all images
    displayImages(indices);

    $('footer').addClass('fixed-bottom');

    $('#keyword').on('input', function () {
        filterImages()
    });

});