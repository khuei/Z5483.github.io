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

// Retrieve user information
$getUserInfoQuery = "SELECT username, created_at, last_login_at, login_count, failed_count FROM users";
$result = mysqli_query($link, $getUserInfoQuery);

$formatStr = "";
if ($result) {
    $formatStr .= '<table id="user-list-table">';
    $formatStr .= '<tr>';
    $formatStr .= '<th>Username</th>';
    $formatStr .= '<th>Created At</th>';
    $formatStr .= '<th>Last Login At (UTC)</th>';
    $formatStr .= '<th>Login Count</th>';
    $formatStr .= '<th>Failed Count</th>';
    $formatStr .= '</tr>';

    while ($row = mysqli_fetch_assoc($result)) {
        $formatStr .= '<tr>';
        $formatStr .= '<td>' . $row['username'] . '</td>';
        $formatStr .= '<td>' . $row['created_at'] . '</td>';
        $formatStr .= '<td>' . $row['last_login_at'] . '</td>';
        $formatStr .= '<td>' . $row['login_count'] . '</td>';
        $formatStr .= '<td>' . $row['failed_count'] . '</td>';
        $formatStr .= '</tr>';
    }

    $formatStr .= '</table>';
} else {
    echo 'Error retrieving user information: ' . mysqli_error($link);
}

mysqli_close($link);
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
      });
    </script>
  </head>
  <header>
  </header>
  <body>
    <center>
      <h1>User List</h1>
      <div style="margin-bottom: 10px">
        <button id="move-back-btn">Move Back To Main Gallery</button>
      </div>
      <?php echo $formatStr; ?>
    </center>
    <button id="move-to-top-btn">Move to Top</button>
    <script text="text/javascript" src="./script/collection.js"></script>
    <script text="text/javascript" src="./script/link-button.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </body>
</html>
