<?php
session_start();

date_default_timezone_set('UTC');

echo '<script>';
echo 'var isLoggedIn = false;';
echo '</script>';

if (isset($_SESSION['username'])) {
  echo '<script>';
  echo 'isLoggedIn = true;';
  echo '</script>';
}

$link = mysqli_connect(
  '104.225.208.23',
  'khuennet_artworkUser',
  'artworkUser12345',
  'khuennet_artworkDB'
);

// Check connection
if (!$link) {
  die("Connection failed: " . mysqli_connect_error());
}

if (isset($_SESSION['username'])) {
  $username = mysqli_real_escape_string($link, $_SESSION['username']);

  // Retrieve current artwork data from the database
  $getCurrentArtworkQuery = "SELECT artwork_data FROM users WHERE username = '$username'";
  $result = mysqli_query($link, $getCurrentArtworkQuery);

  if ($result) {
    $row = mysqli_fetch_assoc($result);
    $currentArtworkJSON = $row['artwork_data'];
    $artworkJSON = str_replace(array("\r", "\n"), '', $currentArtworkJSON);
  }
}

if (isset($_POST['removed-artwork-data']) && isset($_SESSION['username'])) {
  $removedArtworkJSON = substr(mysqli_real_escape_string($link, $_POST['removed-artwork-data']), 1, -1);
  $username = mysqli_real_escape_string($link, $_SESSION['username']);

  // Retrieve current artwork data from the database
  $getCurrentArtworkQuery = "SELECT artwork_data FROM users WHERE username = '$username'";
  $result = mysqli_query($link, $getCurrentArtworkQuery);

  if ($result) {
      $updateArtworkDataQuery = "UPDATE users SET artwork_data = '$removedArtworkJSON' WHERE username = '$username'";
      mysqli_query($link, $updateArtworkDataQuery);
  }

  // Retrieve current artwork data from the database
  $getCurrentArtworkQuery = "SELECT artwork_data FROM users WHERE username = '$username'";
  $result = mysqli_query($link, $getCurrentArtworkQuery);

  if ($result) {
    $row = mysqli_fetch_assoc($result);
    $currentArtworkJSON = $row['artwork_data'];
    $artworkJSON = str_replace(array("\r", "\n"), '', $currentArtworkJSON);
  }
}
?>
<!DOCTYPE html>
<meta charset="UTF-8">
<html lang="en">
  <head>
    <link rel="stylesheet" href="/style/style.css">
    <link rel="stylesheet" href="/style/archive.css">
    <link rel="stylesheet" href="/style/header.css">
    <link rel="stylesheet" href="./style/artwork.css">
    <title>Gallery Collection | khuen</title>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script text="text/javascript" src="./script/validation.js"></script>
    <script>
      $(document).ready(function() {
        $("header").load("/header.html");
        $("#current-artwork").fadeOut(0);
      });

      // Pass PHP values to JavaScript
      var artworkJSON = JSON.parse(<?php echo json_encode("[" . $artworkJSON . "]"); ?>);
    </script>
  </head>
  <header>
  </header>
  <body>
    <center>
      <h1>My Collection Gallery</h1>
      <div style="margin-bottom: 10px">
        <button id="move-back-btn">Move Back To Main Gallery</button>
      </div>
      <br><br>
      <div id="search-bar">
        <select id="search-type-select">
          <option value="Title">Search by Title</option>
          <option value="Artist">Search by Artist</option>
          <option value="Type">Search by Type</option>
        </select>
        <input type="text" id="search-input"></input>
        <ul id="search-option"></ul>
        <button id="search-button">Search</button>
      </div>
      <br>
      <span id="loadingText">loading ...</span>
      <br>
    </center>
    <div id="gallery">
    </div>
    <form id="current-artwork" action="<?= $_SERVER['PHP_SELF'] ?>" method="POST">
      <input type="hidden" id="current-artwork-value" name="customValue" value="default_value">
    </form>
    <button id="move-to-top-btn">Move to Top</button>
    <script text="text/javascript" src="./script/collection.js"></script>
    <script text="text/javascript" src="./script/link-button.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </body>
</html>
