<?php
session_start();
?>
<!DOCTYPE html>
<meta charset="UTF-8">
<style>
ul {
  list-style: none;
  font-size: 2em;
}
</style>
<html lang="en">
  <head>
    <link rel="stylesheet" href="/style/style.css">
    <link rel="stylesheet" href="/style/archive.css">
    <link rel="stylesheet" href="/style/header.css">
    <title>Car Display Page | khuen</title>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script>
      $(document).ready(function() {
        $("header").load("/header.html");
      });
    </script>
  </head>
  <body>
    <header>
    </header>
    <center>
      <h1>Car Display Page</h1>
      <ul>
        <?php
        session_start();
        if (isset($_SESSION['selectedCars'])) {
            $selectedCars = $_SESSION['selectedCars'];
            foreach ($selectedCars as $car) {
                echo "<li>$car</li>";
            }
        } else {
            echo "<li>No cars selected.</li>";
        }
        ?>
      </ul>
      <form method="post" action="clearSelection.php">
        <button type="submit" name="clearSession">Clear Selection</button>
      </form>
      <br><br>
      <button id="selectedLink">
        <a href="index.php">Go Back to Selection Page</a>
      </button>
    </center>
  </body>
</html>

