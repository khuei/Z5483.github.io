let userListBtn = document.getElementById("user-list-button");
if (userListBtn) {
    userListBtn.onclick = function() {
        window.location.href = "user-list.php";
    };
}

let collectionListBtn = document.getElementById("collection-list-button");
if (collectionListBtn) {
    collectionListBtn.onclick = function() {
        window.location.href = "collection-list.php";
    };
}

let moveBackBtn = document.getElementById("move-back-btn");
if (moveBackBtn) {
    moveBackBtn.onclick = function() {
        window.location.href = "index.php";
    };
}

let myCollectionBtn = document.getElementById("my-collection-button");
if (myCollectionBtn) {
    myCollectionBtn.onclick = function() {
        window.location.href = "collection.php";
    };
}

let aboutGalleryBtn = document.getElementById("about-gallery-button");
if (aboutGalleryBtn) {
    aboutGalleryBtn.onclick = function() {
        window.location.href = "about.html";
    };
}

let galleryStatsBtn = document.getElementById("gallery-stats-button");
if (galleryStatsBtn) {
    galleryStatsBtn.onclick = function() {
        window.location.href = "stats.html";
    };
}

let moveToTopBtn = document.getElementById("move-to-top-btn");
if (moveToTopBtn) {
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            moveToTopBtn.style.display = "block";
        } else {
            moveToTopBtn.style.display = "none";
        }
    }

    moveToTopBtn.addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}
