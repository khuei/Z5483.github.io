<?php
$displayStr = '';
$link = mysqli_connect(
    '104.225.208.23',
    'khuennet_queryUser',
    'queryUser12345',
    'khuennet_queryDB'
);

// Check connection
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['clear_table'])) {
    $clearTableQuery = "DELETE FROM Person";
    $displayStr = '';
    if (!mysqli_query($link, $clearTableQuery)) {
        echo "Error clearing table: " . mysqli_error($link) . "<br>";
    }
}

$tableCreationQuery = "
    CREATE TABLE IF NOT EXISTS Person (
        person_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )
";

if (!mysqli_query($link, $tableCreationQuery)) {
    echo "Error creating table: " . mysqli_error($link) . "<br>";
}

if (isset($_POST['submit'])) {
    $first_name = mysqli_real_escape_string($link, $_POST['first_name']);
    $last_name = mysqli_real_escape_string($link, $_POST['last_name']);
    $email = mysqli_real_escape_string($link, $_POST['email']);

    $sql = "INSERT INTO Person (first_name, last_name, email) VALUES ('$first_name', '$last_name', '$email')";
    mysqli_query($link, $sql);
}

if (isset($_POST['retrieve'])) {
    $retrieveQuery = "SELECT * FROM Person ORDER BY last_name COLLATE utf8mb4_general_ci";
    $result = mysqli_query($link, $retrieveQuery);

    if ($result) {
        $displayStr .= "<h3>Sorted by Last Name:</h3>";
        $displayStr .= "<ul>";
        while ($row = mysqli_fetch_assoc($result)) {
            $displayStr .= "<li>{$row['first_name']} {$row['last_name']} - Email: {$row['email']}</li>";
        }
        $displayStr .= "</ul>";
        mysqli_free_result($result);
    } else {
        $displayStr .= "Error retrieving records: " . mysqli_error($link) . "<br>";
    }
}

mysqli_close($link);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/style/style.css">
  <link rel="stylesheet" href="/style/archive.css">
  <link rel="stylesheet" href="/style/header.css">
  <link rel="stylesheet" href="/style/blog-post.css">
  <title>Create a DB | khuen</title>
  <script src="/node_modules/jquery/dist/jquery.min.js"></script>
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
    <h2>Create a Database</h2>
    <form method="POST" action="<?= $_SERVER['PHP_SELF'] ?>">
      <dl>
        <dt>Add Person</dt>
        <dd><input type="text" name="first_name" placeholder="First Name" required /></dd>
        <dd><input type="text" name="last_name" placeholder="Last Name" required /></dd>
        <dd><input type="email" name="email" placeholder="Email" required /></dd>
      </dl>
      <input type="submit" name="submit" value="Submit" />
    </form>
    <br>
    <form method="POST" action="<?= $_SERVER['PHP_SELF'] ?>">
      <button type="submit" name="clear_table">Clear Records</button>
    </form>
    <br>
    <form method="POST" action="<?= $_SERVER['PHP_SELF'] ?>">
      <button type="submit" name="retrieve">Display Records</button>
    </form>
    <?php echo $displayStr; ?>
  </center>
</body>
</html>
