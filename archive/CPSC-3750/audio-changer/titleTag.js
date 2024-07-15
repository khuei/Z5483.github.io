// Initialize an empty array to store tags
let titles = new Array();

// Initialize variables for tracking:
// 1) the number of title tags
// 2) the current playing tag
// 3) the current selected tag.
let numTitleTag = 0;
let currentTag = 0;
let currentSelectedTag = -1;

// Prebuilt title tags with their number, title, and timestamps.
let prebuiltTitleTags = [
    {
        "number": 1,
        "title": "Beginning",
        "begin_ts": "0:00",
        "ending_ts": "0:03"
    },
    {
        "number": 2,
        "title": "5 Minutes",
        "begin_ts": "0:03",
        "ending_ts": "0:12"
    },
    {
        "number": 3,
        "title": "4 Minutes 50 Seconds",
        "begin_ts": "0:12",
        "ending_ts": "0:31"
    },
    {
        "number": 4,
        "title": "4 Minutes 30 Seconds",
        "begin_ts": "0:31",
        "ending_ts": "1:01"
    },
    {
        "number": 5,
        "title": "4 Minutes",
        "begin_ts": "1:01",
        "ending_ts": "1:31"
    },
    {
        "number": 6,
        "title": "3 Minutes 30 Seconds",
        "begin_ts": "1:31",
        "ending_ts": "2:01"
    },
    {
        "number": 7,
        "title": "3 Minutes",
        "begin_ts": "2:01",
        "ending_ts": "2:31"
    },
    {
        "number": 8,
        "title": "2 Minutes 30 Seconds",
        "begin_ts": "2:31",
        "ending_ts": "3:01"
    },
    {
        "number": 9,
        "title": "2 Minutes",
        "begin_ts": "3:01",
        "ending_ts": "3:32"
    },
    {
        "number": 10,
        "title": "1 Minutes 30 Seconds",
        "begin_ts": "3:31",
        "ending_ts": "4:01"
    },
    {
        "number": 11,
        "title": "1 Minutes",
        "begin_ts": "4:01",
        "ending_ts": "4:31"
    },
    {
        "number": 12,
        "title": "30 Seconds",
        "begin_ts": "4:31",
        "ending_ts": "4:51"
    },
    {
        "number": 13,
        "title": "10 Seconds",
        "begin_ts": "4:51",
        "ending_ts": "5:01"
    },
    {
        "number": 14,
        "title": "0 Seconds",
        "begin_ts": "5:01"
    },
]

// Get a reference to the title playlist container element
let titlePlaylist = document.getElementById('title-playlist');

// Define a class for title tags with methods and properties
class titleTag {
    #number;
    #title;
    #begin_ts;
    #ending_ts;

    constructor(number, title, begin_ts, ending_ts) {
        this.#number = number;
        this.#title = title;
        this.#begin_ts = begin_ts;
        this.#ending_ts = ending_ts;
    }

    getNumber() {
        return this.#number;
    }

    setNumber(number) {
        this.#number = number;
    }

    setEndingTimestamp(ending_ts) {
        this.#ending_ts = ending_ts;
    }

    decNumber() {
        this.#number -= 1;
    }

    #timeToInt(timestamp) {
        let parts = timestamp.split(":");

        let minutes = parseInt(parts[0], 10);
        let seconds = parseInt(parts[1], 10);

        return minutes * 60 + seconds;
    }

    getBeginTSNum() {
        return this.#timeToInt(this.#begin_ts);
    }

    getEndingTSNum() {
        return this.#timeToInt(this.#ending_ts);
    }

    getBeginTimestamp() {
        return this.#begin_ts;
    }

    getEndingTimestamp() {
        return this.#ending_ts;
    }

    // Generate the HTML div element for the title tag
    generateDiv() {
        let newDiv = document.createElement("div");
        newDiv.classList.add("title-item");

        // Store the initial background color.
        let initialBackground = newDiv.style.backgroundColor;

        // Change icon on mouseover.
        newDiv.addEventListener("mouseenter", function() {
            this.querySelector("span").innerHTML = "<ion-icon name=\"play-outline\"></ion-icon>";
        });

        // Restore the tag number on mouseleave.
        newDiv.addEventListener("mouseleave", () => {
            newDiv.querySelector("span").innerHTML = this.#number;
        });

        // Handle tag selection and highlight based on audio time.
        let setInitialPlay = false;
        audio.addEventListener("timeupdate", () => {
            if (currentSelectedTag == this.#number - 1) {
                if (!isPlaying && !setInitialPlay) {
                    audio.play();
                    setInitialPlay = true;
                }
            }

            if (audio.currentTime >= this.getBeginTSNum() &&
                audio.currentTime < this.getEndingTSNum()) {
                if (currentSelectedTag == this.#number - 1) {
                    newDiv.style.backgroundColor = "Violet";
                } else {
                    newDiv.style.backgroundColor = "YellowGreen";
                }
                currentTag = this.#number - 1;
            } else {
                if (currentSelectedTag == this.#number - 1) {
                    audio.pause();
                    newDiv.style.backgroundColor = initialBackground;
                    currentSelectedTag = -1;
                } else {
                    newDiv.style.backgroundColor = initialBackground;
                }
            }
        });

        // Create span elements for tag information.
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        let span3 = document.createElement("span");
        let span4 = document.createElement("span");

        // Add event listener to delete a tag.
        span4.addEventListener("click", () => {
            if (currentTag >= 2) {
                titles[currentTag - 1].setEndingTimestamp(titles[currentTag].getEndingTimestamp());
            }

            currentSelectedTag = (currentSelectedTag == currentTag) ? -1: currentSelectedTag;

            titles.splice(currentTag, 1);
            regeneratePlaylist();
        });

        // Handle mouseover and mouseleave events for the delete icon.
        span4.addEventListener("mouseenter", function() {
            this.style.color = "OrangeRed";
        });

        span4.addEventListener("mouseleave", function() {
            this.style.color = "Black";
        });

        // Add click event to select the tag and navigate the audio.
        newDiv.addEventListener("click", (event) => {
            if (!event.target.closest("span") || event.target !== span4) {
                currentSelectedTag = this.#number - 1;
                newDiv.style.backgroundColor = "YellowGreen";
                audio.currentTime = this.getBeginTSNum();
                alert("play tag #" + currentSelectedTag);
            }
        });

        // Set text content for span elements.
        span1.textContent = this.#number;
        span2.textContent = this.#title;
        span3.textContent = this.#begin_ts;
        span4.innerHTML = "<ion-icon name=\"trash-outline\"></ion-icon>";

        // Append span elements to the new div.
        newDiv.appendChild(span1);
        newDiv.appendChild(span2);
        newDiv.appendChild(span3);
        newDiv.appendChild(span4);

        return newDiv;
    }
}

// Generate prebuilt title tags and add them to the playlist
function generatePrebuiltTitleTag() {
    for (let i = 0; i < prebuiltTitleTags.length; ++i) {
        let newTitleTag = new titleTag(
            prebuiltTitleTags[i].number,
            prebuiltTitleTags[i].title,
            prebuiltTitleTags[i].begin_ts,
            prebuiltTitleTags[i].ending_ts,
            false
        );

        let newDiv = newTitleTag.generateDiv();

        numTitleTag += 1;
        titles.push(newTitleTag);
        titlePlaylist.appendChild(newDiv);
    }
}

// Call the function to generate prebuilt title tags.
generatePrebuiltTitleTag();

/* Regenerate Tag Playlist */

function regeneratePlaylist() {
    const childElements = titlePlaylist.children;

    for (let i = childElements.length - 1; i > 0; i--) {
        const childElement = childElements[i];
        childElement.remove();
    }

    titles.sort(function(a, b) {
        return a.getBeginTSNum() - b.getBeginTSNum();
    });

    let newDiv;
    for (let i = 0; i < titles.length; ++i) {
        titles[i].setNumber(i + 1);
        newDiv = titles[i].generateDiv();

        titlePlaylist.appendChild(newDiv);
    }
}

/* Handling Creating Tag Screen */

// Get references to UI elements for creating a new tag.
let newTagField = document.getElementById("new-tag-field");
let tagTime;

// Function to format time in seconds as "MM:SS".
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(1, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// Add event listener to show the tag creation interface.
document.getElementById("add-tag").addEventListener("click", () => {
    newTagField.style.display = "flex";
    tagTime = formatTime(audio.currentTime);
    document.getElementById("new-tag-field-time-label").textContent = tagTime;
});

// Add event listener to delete the current tag.
document.getElementById("delete-tag").addEventListener("click", () => {
    if (currentTag >= 2) {
        titles[currentTag - 1].setEndingTimestamp(titles[currentTag].getEndingTimestamp());
    }

    currentSelectedTag = (currentSelectedTag == currentTag) ? -1 : currentSelectedTag;

    titles.splice(currentTag, 1);
    regeneratePlaylist();
});

// Add event listener to cancel tag creation.
document.getElementById("cancel-new-tag-field").addEventListener("click", () => {
    newTagField.style.display = "none";
});

// Add event listener to create a new tag.
document.getElementById("close-new-tag-field").addEventListener("click", () => {
    let newTagTitleInput = document.getElementById("new-tag-title-input");

    if (newTagTitleInput.value.trim() === "") {
        alert("Please input a title");
        return;
    }

    let newTitleTag = new titleTag(
        numTitleTag++,
        document.getElementById("new-tag-title-input").value,
        tagTime,
        titles[currentTag].getEndingTimestamp()
    );

    titles[currentTag].setEndingTimestamp(tagTime);

    let newDiv = newTitleTag.generateDiv();

    titles.push(newTitleTag);
    titlePlaylist.appendChild(newDiv);

    alert("New tag created successfully!");

    newTagField.style.display = "none";
    regeneratePlaylist();
});
