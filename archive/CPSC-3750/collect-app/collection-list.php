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

// Retrieve and combine all artwork_data
$combinedArtworkData = "";
$selectArtworkQuery = "SELECT artwork_data FROM users";
$result = mysqli_query($link, $selectArtworkQuery);

if ($result) {
  while ($row = mysqli_fetch_assoc($result)) {
    if (empty($combinedArtworkData)) {
      $combinedArtworkData .= $row['artwork_data'];
    } else {
      $combinedArtworkData .= ',' . $row['artwork_data'];
    }
  }
}

$artworkJSON = str_replace(array("\r", "\n"), '', $combinedArtworkData);
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
      <h1>Collection List</h1>
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
    <script text="text/javascript" src="./script/collection-list.js"></script>
    <script text="text/javascript" src="./script/link-button.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </body>
</html>
