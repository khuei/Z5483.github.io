<?php
$msg = "";

if (isset($_POST['name']) && $_POST['name'] !== "") {
    $msg .= "<strong>Username:</strong>    " . $_POST['name'] . "<br>";
} else {
    $msg .= "<strong>Username:</strong> (Not provided)" . "<br>";
}

if (isset($_POST['account']) && $_POST['account'] !== "") {
    $msg .= "<strong>Hidden Account ID:</strong>    " . $_POST['account'] . "<br>";
} else {
    $msg .= "<strong>Hidden Account ID:</strong> (Not provided)" . "<br>";
}

if (isset($_POST['about']) && $_POST['about'] !== "") {
    $msg .= "<strong>About:</strong>  " . $_POST['about'] . "<br>";
} else {
    $msg .= "<strong>About:</strong> (Not provided)" . "<br>";
}

if (isset($_POST['password']) && $_POST['password'] !== "") {
    $msg .= "<strong>Password:</strong> " . $_POST['password'] . "<br>";
} else {
    $msg .= "<strong>Password Type:</strong> (Not provided)" . "<br>";
}

if (isset($_POST['checkbox']) && !empty($_POST['checkbox'])) {
    $msg .= "<strong>Account Type:</strong> " . $_POST['checkbox'] . "<br>";
} else {
    $msg .= "<strong>Account Type:</strong> (Not provided)" . "<br>";
}

if (isset($_POST['radio']) && !empty($_POST['radio'])) {
    $msg .= "<strong>Action:</strong> " . $_POST['radio'] . "<br>";
} else {
    $msg .= "<strong>Action:</strong> (Not provided)" . "<br>";
}

if (isset($_POST['list']) && !empty($_POST['list'])) {
    $msg .= "<strong>Selected Number:</strong> " . $_POST['list'] . "<br>";
} else {
    $msg .= "<strong>Selected Number:</strong> (Not provided)" . "<br>";
}

if (isset($_POST['file']) && !empty($_POST['file'])) {
    $msg .= "<strong>Uploaded File:</strong> " . $_POST['file'] . "<br>";
} else {
    $msg .= "<strong>Uploaded File:</strong> (Not provided)" . "<br>";
}

if (isset($_POST['url']) && !empty($_POST['url'])) {
    $msg .= "<strong>Inserted URL:</strong> " . $_POST['url'] . "<br>";
} else {
    $msg .= "<strong>Inserted URL:</strong> (Not provided)" . "<br>";
}
?>
<!DOCTYPE html>
<style>
div {
  margin-left: 40%;
  font-size: 1.4em;
}
</style>
<html>
  <head>
    <link rel="stylesheet" href="/style/style.css">
    <link rel="stylesheet" href="/style/archive.css">
    <link rel="stylesheet" href="/style/header.css">
    <title>Forms | khuen</title>
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
    <title>Form Response | khuen</title>
    <center>
      <h1>Your Response</h1>
    </center>
    <div>
      <?php echo $msg; ?>
    </div>
  </body>
</html>
