// Variables for API response data
console.log(artworkJSON);
let imageBaseURL = "https://www.artic.edu/iiif/2";
let currentArtworkJSON;

// Arrays to store unique titles, artists, and categories
let artworkTitles = new Array();
let artworkArtists = new Array();
let artworkCategories = new Array();

// HTML elements
let galleryDiv = document.getElementById("gallery");
let currentArtwork = document.getElementById("current-artwork");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let searchTypeSelect = document.getElementById("search-type-select");

// Statistics variables
let statTotalArtwork = 0;
let statWithImage = 0;
let statCategories = {};

// Search variables
let searchText = "";
let searchType = "";

// Function to load the detailed view of the current artwork
function loadCurrentView() {
    currentArtwork.innerHTML = '<input type="hidden" id="removed-artwork-value" name="removed-artwork-data" value="default_value">';

    // Show current artwork with fade-in effect
    $(currentArtwork).fadeIn(200, "linear");
    currentArtwork.style.display = "flex";

    // Create image element
    let image = document.createElement("img");
    image.classList.add("current-artwork-image");

    // Set image source based on whether image_id is available
    if (currentArtworkJSON.image_id == null) {
        image.src = "./no-image.jpg";
    } else {
        image.src = imageBaseURL + "/" +
                    currentArtworkJSON.image_id +
                    "/full/200,/0/default.jpg";
    }

    let buttonDiv = document.createElement("div");

    // Create close button
    let closeButton = document.createElement("button");
    closeButton.setAttribute("id", "close-view-button");
    closeButton.textContent = "Close View";

    // Add event listener to close the view when the button is clicked
    closeButton.addEventListener("click", function(event) {
        event.preventDefault();
        $(currentArtwork).fadeOut(200);
    });

    // Append elements to the current artwork div
    buttonDiv.appendChild(closeButton);

    // Create remove from collection button
    let removeCollectionButton = document.createElement("button");
    removeCollectionButton.setAttribute("id", "remove-collection-button");
    removeCollectionButton.textContent = "Remove From Collection";

    removeCollectionButton.addEventListener("click", () => {
        artworkJSON = artworkJSON.filter(function(item) {
            return item != currentArtworkJSON;
        });

        document.getElementById("removed-artwork-value").value = JSON.stringify(artworkJSON);
        currentArtwork.submit();
    });

    // Append elements to the current artwork div
    buttonDiv.appendChild(removeCollectionButton);

    currentArtwork.appendChild(buttonDiv);

    // Create table rows and cells for artwork details
    let table = document.createElement("table");

    // Title
    let title = document.createElement("tr");

    let titleAttr = document.createElement("th");
    titleAttr.textContent = "Title";

    let titleValue = document.createElement("td");
    titleValue.textContent = currentArtworkJSON.title;

    title.appendChild(titleAttr);
    title.appendChild(titleValue);

    table.appendChild(title);

    // Artist
    let artist = document.createElement("tr");

    let artistAttr = document.createElement("th");
    artistAttr.textContent = "Artist";

    let artistValue = document.createElement("td");
    artistValue.textContent = currentArtworkJSON.artist_title;

    artist.appendChild(artistAttr);
    artist.appendChild(artistValue);

    table.appendChild(artist);

    // Date
    let date = document.createElement("tr");

    let dateAttr = document.createElement("th");
    dateAttr.textContent = "Date";

    let dateValue = document.createElement("td");
    dateValue.textContent = currentArtworkJSON.date_display;

    date.appendChild(dateAttr);
    date.appendChild(dateValue);

    table.appendChild(date);

    // Type
    let type = document.createElement("tr");

    let typeAttr = document.createElement("th");
    typeAttr.textContent = "Type";

    let typeValue = document.createElement("td");
    typeValue.textContent = currentArtworkJSON.artwork_type_title;

    type.appendChild(typeAttr);
    type.appendChild(typeValue);

    table.appendChild(type);

    // Department Title
    let departmentTitle = document.createElement("tr");

    let departmentTitleAttr = document.createElement("th");
    departmentTitleAttr.textContent = "Department";

    let departmentTitleValue = document.createElement("td");
    departmentTitleValue.textContent = currentArtworkJSON.department_title;

    departmentTitle.appendChild(departmentTitleAttr);
    departmentTitle.appendChild(departmentTitleValue);

    table.appendChild(departmentTitle);

    // Medium Display
    let mediumDisplay = document.createElement("tr");

    let mediumDisplayAttr = document.createElement("th");
    mediumDisplayAttr.textContent = "Type";

    let mediumDisplayValue = document.createElement("td");
    mediumDisplayValue.textContent = currentArtworkJSON.medium_display;

    mediumDisplay.appendChild(mediumDisplayAttr);
    mediumDisplay.appendChild(mediumDisplayValue);

    table.appendChild(mediumDisplay);

    // Description
    let description = document.createElement("tr");

    let descriptionAttr = document.createElement("th");
    descriptionAttr.textContent = "Description";

    let descriptionValue = document.createElement("td");

    if (currentArtworkJSON.description == null)
        descriptionValue.textContent = "none";
    else
        descriptionValue.innerHTML = currentArtworkJSON.description;

    description.appendChild(descriptionAttr);
    description.appendChild(descriptionValue);

    table.appendChild(description);

    // Append table to current artwork div
    currentArtwork.appendChild(image);
    currentArtwork.appendChild(table);
}

// Function to load the gallery of artworks
function loadGallery() {
    // Remove loading text
    document.getElementById("loadingText").remove();

    for (let i = 0; i < artworkJSON.length; ++i) {
        // Update statistics
        statTotalArtwork += 1;
        if (statCategories.hasOwnProperty(artworkJSON[i].department_title)) {
            statCategories[artworkJSON[i].department_title] += 1;
        } else {
            statCategories[artworkJSON[i].department_title] = 0;
        }

        // Store unique titles, artists, and categories
        artworkTitles.push(String(artworkJSON[i].title));
        artworkArtists.push(String(artworkJSON[i].artist_title));
        artworkCategories.push(String(artworkJSON[i].department_title));

        // Create gallery item div
        let artDiv = document.createElement("div");
        artDiv.classList.add("gallery-item");

        // Add click event listener to load detailed view
        artDiv.addEventListener("click", () => {
            currentArtworkJSON = artworkJSON[i];
            loadCurrentView();
        });

        // Create image element for the gallery item
        let image = document.createElement("img");
        image.classList.add("gallery-item-image");

        // Set image source based on whether image_id is available
        if (artworkJSON[i].image_id == null) {
            image.src = "./no-image.jpg";
        } else {
            image.src = imageBaseURL + "/" +
                artworkJSON[i].image_id +
                "/full/200,/0/default.jpg";
            statWithImage += 1;
        }

        // Append image to gallery item div
        artDiv.appendChild(image);

        // Create title and artist elements for the gallery item
        let title = document.createElement("span");
        title.classList.add("gallery-item-title");
        title.textContent = artworkJSON[i].title;

        let artist = document.createElement("p");
        artist.classList.add("gallery-item-artist");
        artist.textContent = artworkJSON[i].artist_display;

        let datetimeAdded = document.createElement("span");
        datetimeAdded.textContent = "UTC Time Added: " + artworkJSON[i].datetime_added;

        // Append title and artist to gallery item div
        artDiv.appendChild(title);
        artDiv.appendChild(artist);
        artDiv.appendChild(datetimeAdded);

        // Append gallery item to the gallery div
        galleryDiv.appendChild(artDiv);

        // Add event listeners for search functionality
        searchButton.addEventListener("click", function () {
            searchText = searchInput.value;

            switch (searchTypeSelect.value) {
                case "Title":
                    if (!artworkJSON[i].title.toLowerCase().includes(searchText.toLowerCase())) {
                        artDiv.style.display = "none";
                    } else {
                        artDiv.style.display = "flex";
                    }
                    break;
                case "Artist":
                    if (!String(artworkJSON[i].artist_title).toLowerCase().includes(searchText.toLowerCase())) {
                        artDiv.style.display = "none";
                    } else {
                        artDiv.style.display = "flex";
                    }
                    break;
                case "Type":
                    if (!String(artworkJSON[i].department_title).toLowerCase().includes(searchText.toLowerCase())) {
                        artDiv.style.display = "none";
                    } else {
                        artDiv.style.display = "flex";
                    }
                    break;
            }
        });

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                searchText = searchInput.value;

                switch (searchTypeSelect.value) {
                    case "Title":
                        if (!artworkJSON[i].title.toLowerCase().includes(searchText.toLowerCase())) {
                            artDiv.style.display = "none";
                        } else {
                            artDiv.style.display = "flex";
                        }
                        break;
                    case "Artist":
                        if (!String(artworkJSON[i].artist_title).toLowerCase().includes(searchText.toLowerCase())) {
                            artDiv.style.display = "none";
                        } else {
                            artDiv.style.display = "flex";
                        }
                        break;
                    case "Type":
                        if (!String(artworkJSON[i].department_title).toLowerCase().includes(searchText.toLowerCase())) {
                            artDiv.style.display = "none";
                        } else {
                            artDiv.style.display = "flex";
                        }
                        break;
                }
            }
        });
    }

    // Remove duplicate values from arrays
    artworkTitles = artworkTitles.filter((value, index, self) => self.indexOf(value) === index);
    artworkArtists = artworkArtists.filter((value, index, self) => self.indexOf(value) === index);
    artworkCategories = artworkCategories.filter((value, index, self) => self.indexOf(value) === index);

    // Store statistics in local storage
    localStorage.setItem('statTotalArtwork', statTotalArtwork);
    localStorage.setItem('statTotalArtist', artworkArtists.length);
    localStorage.setItem('statWithImage', statWithImage);
    localStorage.setItem('statNumCategories', Object.keys(statCategories).length);
}

// Event listener for search input
searchInput.addEventListener("keyup", function (event) {
    let optionList = document.getElementById('search-option');

    // Check for modifier keys
    if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        return;
    }

    // Check for valid keys (character or backspace)
    if (event.key.length === 1 || event.key === 'Backspace') {
        searchText = searchInput.value;

        let hasMatch = false;

        // Clear existing options
        optionList.innerHTML = "";

        // Switch based on selected search type
        switch (searchTypeSelect.value) {
            case "Title":
                for (let i = 0; i < artworkTitles.length; ++i) {
                    if (artworkTitles[i].toLowerCase().includes(searchText.toLowerCase())) {
                        hasMatch = true;

                        // Create option element
                        let option = document.createElement('li');
                        option.classList.add("search-option-item");
                        option.textContent = artworkTitles[i];

                        // Add click event listener to set search input and trigger search
                        option.addEventListener("click", () => {
                            searchInput.value = artworkTitles[i];
                            optionList.style.display = "none";
                            searchButton.click();
                        });

                        // Append option to list
                        optionList.appendChild(option);
                    }
                }
                break;
            case "Artist":
                for (let i = 0; i < artworkArtists.length; ++i) {
                    if (artworkArtists[i].toLowerCase().includes(searchText.toLowerCase())) {
                        hasMatch = true;

                        // Create option element
                        let option = document.createElement('li');
                        option.classList.add("search-option-item");
                        option.textContent = artworkArtists[i];
                        console.log(artworkArtists[i]);

                        // Add click event listener to set search input and trigger search
                        option.addEventListener("click", () => {
                            searchInput.value = artworkArtists[i];
                            optionList.style.display = "none";
                            searchButton.click();
                        });

                        // Append option to list
                        optionList.appendChild(option);
                    }
                }
                break;
            case "Type":
                for (let i = 0; i < artworkCategories.length; ++i) {
                    if (artworkCategories[i].toLowerCase().includes(searchText.toLowerCase())) {
                        hasMatch = true;

                        // Create option element
                        let option = document.createElement('li');
                        option.classList.add("search-option-item");
                        option.textContent = artworkCategories[i];

                        // Add click event listener to set search input and trigger search
                        option.addEventListener("click", () => {
                            searchInput.value = artworkCategories[i];
                            optionList.style.display = "none";
                            searchButton.click();
                        });

                        // Append option to list
                        optionList.appendChild(option);
                    }
                }
                break;
        }

        // If no match, display "No Match" option
        if (!hasMatch) {
            let option = document.createElement('li');
            option.textContent = "No Match";
            optionList.appendChild(option);
        }
    }

    // Show or hide option list based on input value
    if (searchInput.value == "") {
        optionList.style.display = "none";
    } else {
        optionList.style.display = "block";
    }
});

// Initial load of the gallery
loadGallery();
