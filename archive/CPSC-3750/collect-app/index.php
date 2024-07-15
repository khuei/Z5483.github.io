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

$tableCreationQuery = "
  CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      security_question TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      login_status INT DEFAULT 0,
      last_login_at TIMESTAMP DEFAULT NULL,
      login_count INT DEFAULT 0,
      failed_count INT DEFAULT 0,
      artwork_data TEXT NOT NULL,
      PRIMARY KEY (username)
  )
";

if (!mysqli_query($link, $tableCreationQuery)) {
  echo "Error creating table: " . mysqli_error($link) . "<br>";
}

if (isset($_POST['sign-up'])) {
  $username = mysqli_real_escape_string($link, $_POST['username']);
  $email = mysqli_real_escape_string($link, $_POST['email']);
  $password = mysqli_real_escape_string($link, $_POST['password']);
  $securityQuestionAnswer = mysqli_real_escape_string($link, $_POST['security-question-answer']);
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
  $created_at = date("Y-m-d H:i:s");

  $insertQuery = "INSERT INTO users (username, email, password, security_question, created_at, login_status, last_login_at, login_count, failed_count, artwork_data) VALUES ('$username', '$email', '$hashedPassword', '$securityQuestionAnswer', '$created_at', 0, NULL, 0, 0, '')";

  if (mysqli_query($link, $insertQuery)) {
      echo '<script>alert("User registered successfully!")</script>';
  } else {
      echo '<script>alert("Error: " . mysqli_error($link))</script>';
  }
}

if (isset($_POST['sign-in'])) {
  $username = mysqli_real_escape_string($link, $_POST['username']);
  $enteredPassword = mysqli_real_escape_string($link, $_POST['password']);

  // Check if the username exists in the database
  $checkUsernameQuery = "SELECT * FROM users WHERE username = '$username'";
  $checkResult = mysqli_query($link, $checkUsernameQuery);

  if ($checkResult) {
    if (mysqli_num_rows($checkResult) > 0) {
      // Username exists, retrieve the hashed password from the database
      $row = mysqli_fetch_assoc($checkResult);
      $hashedPasswordFromDB = $row['password'];

      $getFailedCountQuery = "SELECT failed_count FROM users WHERE username = '$username'";
      $failedCountQueryResult = mysqli_query($link, $getFailedCountQuery);
      $row = mysqli_fetch_assoc($failedCountQueryResult);
      $failedCount = $row['failed_count'];

      // Verify the entered password against the hashed password from the database
      if (password_verify($enteredPassword, $hashedPasswordFromDB) && $failedCount < 2) {
        // Passwords match - user is authenticated
        // Update last_login_at and login_count in the database
        $currentDateTime = date("Y-m-d H:i:s");
        $updateQuery = "UPDATE users SET last_login_at = '$currentDateTime', login_count = login_count + 1, failed_count = 0, login_status = 1 WHERE username = '$username'";
        mysqli_query($link, $updateQuery);

        // Set the username in the session variable
        $_SESSION['username'] = $username;

        // Redirect or perform other actions for successful login
        echo '<script defer>alert("Sign in successful as ' . $username . '!")</script>';

        echo '<script defer>';
        echo 'isLoggedIn = true';
        echo '</script>';
      } else if (!password_verify($enteredPassword, $hashedPasswordFromDB) && $failedCount < 2) {
        $updateQuery = "UPDATE users SET failed_count = failed_count + 1 WHERE username = '$username'";
        mysqli_query($link, $updateQuery);

        // Passwords do not match
        echo '<script defer>alert("Incorrect password")</script>';
      } else {
        echo '<script defer>alert("Your account has been locked from too many wrong password attempt. Please reset your password to unlock your account!")</script>';
      }
    } else {
      // Username doesn't exist
      echo '<script defer>alert("Username doesn\'t exist")</script>';
    }
  } else {
    // Query failed
    echo '<script>alert("Error: ' . mysqli_error($link) . '")</script>';
  }
}

if (isset($_POST['sign-out'])) {
  if (isset($_SESSION['username'])) {
    $username = mysqli_real_escape_string($link, $_SESSION['username']);

    $checkUsernameQuery = "SELECT * FROM users WHERE username = '$username'";
    $checkResult = mysqli_query($link, $checkUsernameQuery);

    if ($checkResult) {
      if (mysqli_num_rows($checkResult) > 0) {
        $updateQuery = "UPDATE users SET login_status = 0 WHERE username = '$username'";
        mysqli_query($link, $updateQuery);

        unset($_SESSION['username']);
        echo '<script defer>';
        echo 'isLoggedIn = false';
        echo '</script>';
      }
    }
  }
}

if (isset($_POST['reset-password'])) {
  $username = mysqli_real_escape_string($link, $_POST['reset-username']);

  // Check if the username exists in the database
  $checkUsernameQuery = "SELECT * FROM users WHERE username = '$username'";
  $checkResult = mysqli_query($link, $checkUsernameQuery);

  if ($checkResult) {
    if (mysqli_num_rows($checkResult) > 0) {
      $resetSecurityAnswer = mysqli_real_escape_string($link, $_POST['reset-security-answer']);

      $getSecurityAnswerQuery = "SELECT security_question FROM users WHERE username = '$username'";
      $securityAnswerQueryResult = mysqli_query($link, $getSecurityAnswerQuery);
      $row = mysqli_fetch_assoc($securityAnswerQueryResult);
      $securityAnswer = $row['security_question'];

      if ($resetSecurityAnswer == $securityAnswer) {
        $newPassword = mysqli_real_escape_string($link, $_POST['reset-new-password']);
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        $updateQuery = "UPDATE users SET password = '$hashedPassword', failed_count = 0 WHERE username = '$username'";
        mysqli_query($link, $updateQuery);

        echo '<script defer>alert("Reset password successful for ' . $username . '!")</script>';
      }
    } else {
      // Username doesn't exist
      echo '<script defer>alert("Username doesn\'t exist")</script>';
    }
  } else {
    // Query failed
    echo '<script>alert("Error: ' . mysqli_error($link) . '")</script>';
  }
}

if (isset($_POST['artwork-data'])) {
  $newArtworkJSON = mysqli_real_escape_string($link, $_POST['artwork-data']);

  if (isset($_SESSION['username'])) {
    $username = mysqli_real_escape_string($link, $_SESSION['username']);

    // Retrieve current artwork data from the database
    $getCurrentArtworkQuery = "SELECT artwork_data FROM users WHERE username = '$username'";
    $result = mysqli_query($link, $getCurrentArtworkQuery);

    if ($result) {
      $row = mysqli_fetch_assoc($result);
      $currentArtworkJSON = $row['artwork_data'];

      $updatedArtworkJSON = '';

      if (!empty($currentArtworkJSON)) {
        // Concatenate new artwork data to the existing data
        $updatedArtworkJSON = $currentArtworkJSON . ',' . $newArtworkJSON;
      } else {
        $updatedArtworkJSON = $newArtworkJSON;
      }

      // Update the database with the concatenated data
      $updateArtworkDataQuery = "UPDATE users SET artwork_data = '$updatedArtworkJSON' WHERE username = '$username'";
      mysqli_query($link, $updateArtworkDataQuery);
    }
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
    <script>
      $(document).ready(function() {
        $("header").load("/header.html");
        $("#current-artwork").fadeOut(0);
        $("#sign-out-form").fadeOut(0);
        $("#my-collection-button").fadeOut(0);
        $("#reset-password-section").fadeOut(0);

        if (typeof isLoggedIn !== 'undefined' && isLoggedIn) {
          $("#login-button").fadeOut(0);
          $("#sign-up-button").fadeOut(0);
          $("#sign-out-form").fadeIn(0);
          $("#my-collection-button").fadeIn(0);
        }
      })

      function resetPassword() {
        $("#reset-password-section").fadeIn(200, "linear");
        $("#sign-in-username").removeAttr('required');
        $("#sign-in-password").removeAttr('required');
        $("#reset-username").prop('required', true);
        $("#reset-password").prop('required', true);
        $("#reset-repeated-password").attr('required', true);
        $("#reset-security").prop('required', true);
      }

      function validateSignUpForm() {
        let password = document.getElementById('sign-up-password').value;
        let confirmPassword = document.getElementById('sign-up-password-repeated').value;

        let resetPassword = document.getElementById('reset-password').value;
        let resetConfirmPassword = document.getElementById('reset-repeated-password').value;

        if ((password !== confirmPassword) || (resetPassword !== resetConfirmPassword)) {
          alert("Passwords do not match. Please check and try again.");
          return false;
        }

        return true;
      }

      var currentUsername = '';

      <?php
      if (isset($_SESSION['username'])) {
        echo 'currentUsername = "' . $_SESSION['username'] . '";';
      }
      ?>
    </script>
  </head>
  <header>
  </header>
  <body>
    <center>
      <h1>Artwork Gallery</h1>
      <div style="margin-bottom: 10px">
        <button id="my-collection-button">My Collection</button>
        <button id="about-gallery-button">About Gallery</button>
        <button id="gallery-stats-button">Gallery Statistics</button>
      </div>
      <div style="margin-bottom: 10px">
        <button id="user-list-button">User List</button>
        <button id="collection-list-button">Collection List</button>
      </div>
      <div style="margin-bottom: 10px">
        <button id="login-button">Sign In</button>
        <button id="sign-up-button">Sign Up</button>
        <form id="sign-out-form" action="<?= $_SERVER['PHP_SELF'] ?>" method="POST">
          <button id="sign-out-button" type="submit" name="sign-out">Sign Out</button>
        </form>
      </div>
      <br><br>
      <form class="sign-form" id="login-form" action="<?= $_SERVER['PHP_SELF'] ?>" method="POST" onsubmit="return validateSignUpForm()">
        <h3>Sign In</h3>
        <label for="sign-in-username"><b>Username</b></label>
        <input type="text" id="sign-in-username" placeholder="Enter Username" name="username" required>
        <label for="sign-in-password"><b>Password</b></label>
        <input type="password" id="sign-in-password" placeholder="Enter Password" name="password" required>
        <div>
          <button type="button" id="login-cancel-button">Cancel</button>
          <button type="submit" name="sign-in">Login</button>
        </div>
        <br>
        <span>Forgot <a onclick="resetPassword()" href="#">password?</a></span>
        <div id="reset-password-section" style="display: flex; flex-direction: column; margin-bottom: 10px">
          <h3>Reset Password</h3>
          <label for="reset-username"><b>Username</b></label>
          <input type="text" id="reset-username" placeholder="Enter Username" name="reset-username">
          <label for="reset-password"><b>New Password</b></label>
          <input type="password" id="new-password" placeholder="Enter New Password" name="reset-new-password">
          <label for="reset-repeated-password"><b>Repeat Password</b></label>
          <input type="password" id="reset-repeated-password" placeholder="Repeat Password" name="reset-repeated-password">
          <label for="reset-security-answer"><b>Security Question: What is your favorite food?</b></label>
          <input type="password" id="reset-security-answer" placeholder="Your Favorite Food" name="reset-security-answer">
          <div>
            <button type="button" id="reset-cancel-button">Cancel</button>
            <button type="submit" name="reset-password">Reset Password</button>
          </div>
        </div>
      </form>
      <form class="sign-form" id="sign-up-form" action="<?= $_SERVER['PHP_SELF'] ?>" method="POST" onsubmit="return validateSignUpForm()">
        <h3>Sign Up</h3>
        <span>Please fill in this form to create an account.</span>
        <hr>
        <label for="username"><b>Username</b></label>
        <input type="username" placeholder="Enter Username" name="username" required>
        <label for="email"><b>Email</b></label>
        <input type="email" placeholder="Enter Email" name="email" required>
        <label for="password"><b>Password</b></label>
        <input type="password" id="sign-up-password" placeholder="Enter Password" name="password" required>
        <label for="password-repeated"><b>Repeat Password</b></label>
        <input type="password" id="sign-up-password-repeated" placeholder="Repeat Password" name="password-repeated" required>
        <label for="security-question"><b>Security Question: What is your favorite food?</b></label>
        <input type="password" id="security-question-input" placeholder="Your Favorite Food" name="security-question-answer" required>
        <div>
          <button type="button" id="sign-up-cancel-button">Cancel</button>
          <button type="submit" name="sign-up">Sign Up</button>
        </div>
      </form>
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
    <center>
      <button id="load-more-button">Load More</button>
    </center>
    <button id="move-to-top-btn">Move to Top</button>
    <script text="text/javascript" src="./script/artwork.js"></script>
    <script text="text/javascript" src="./script/link-button.js"></script>
    <script text="text/javascript" src="./script/users.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </body>
</html>
