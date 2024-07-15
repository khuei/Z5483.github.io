let statTotalArtwork = localStorage.getItem('statTotalArtwork');
let statTotalArtist = localStorage.getItem('statTotalArtist');
console.log(statTotalArtist);
let statWithImage = localStorage.getItem('statWithImage');
let statNumCategories = localStorage.getItem('statNumCategories');

let numArtwork = document.getElementById("num-artwork");
let numArtist = document.getElementById("num-artist");
let numWithImage = document.getElementById("num-with-image");
let numWithoutImage = document.getElementById("num-without-image");
let numCategory = document.getElementById("num-category");
let categories = document.getElementById("categories");

numArtwork.textContent = "Number of Artworks: " + statTotalArtwork;
numArtist.textContent = "Number of Artists: " + statTotalArtist;
numWithImage.textContent = "Artworks with Images: " + statWithImage;
numWithoutImage.textContent = "Artworks without Images: " + (statTotalArtwork - statWithImage);
numCategory.textContent = "Number of Categories: " + statNumCategories;
