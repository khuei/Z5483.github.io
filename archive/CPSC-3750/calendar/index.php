<?php
session_start();

define("ADAY", (60 * 60 * 24));

if (!isset($_POST['month']) || !isset($_POST['year'])) {
  $nowArray = getdate();
  $month = $nowArray['mon'];
  $year = $nowArray['year'];
} else {
  $month = $_POST['month'];
  $year = $_POST['year'];
}

$start = mktime(12, 0, 0, $month, 1, $year);
$firstDayArray = getdate($start);

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
  "104.225.208.23",
  "khuennet_calendarUser",
  "calendarUser12345",
  "khuennet_calendar"
);

// Check connection
if (!$link) {
  die("Connection failed: " . mysqli_connect_error());
}

$tableCreationQueryUsers = "
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
      PRIMARY KEY (username)
  )
";

if (!mysqli_query($link, $tableCreationQueryUsers)) {
  echo "Error creating users table: " . mysqli_error($link) . "<br>";
}

$tableCreationQueryEvents = "
  CREATE TABLE IF NOT EXISTS calendar_events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      event_title VARCHAR(255) NOT NULL,
      event_shortdesc VARCHAR(255) NOT NULL,
      event_start DATETIME NOT NULL,
      CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES users(username)
  )
";

if (!mysqli_query($link, $tableCreationQueryEvents)) {
  echo "Error creating calendar_events table: " . mysqli_error($link) . "<br>";
}

if (isset($_POST['sign-up'])) {
  global $link;
  $username = mysqli_real_escape_string($link, $_POST['username']);
  $email = mysqli_real_escape_string($link, $_POST['email']);
  $password = mysqli_real_escape_string($link, $_POST['password']);
  $securityQuestionAnswer = mysqli_real_escape_string($link, $_POST['security-question-answer']);
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
  $created_at = date("Y-m-d H:i:s");

  $insertQuery = "INSERT INTO users (username, email, password, security_question, created_at, login_status, last_login_at, login_count, failed_count) VALUES ('$username', '$email', '$hashedPassword', '$securityQuestionAnswer', '$created_at', 0, NULL, 0, 0)";

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
  echo $_POST['reset-username'];

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

if (isset($link)) {
  mysqli_close($link);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/style/style.css">
  <link rel="stylesheet" href="/style/archive.css">
  <link rel="stylesheet" href="/style/header.css">
  <link rel="stylesheet" href="./style/calendar.css">
  <script src="/node_modules/jquery/dist/jquery.min.js"></script>
  <script>
    $(document).ready(function () {
      $("header").load("/header.html");
      $("#sign-out-form").fadeOut(0);
      $("#reset-password-section").fadeOut(0);

      if (typeof isLoggedIn !== 'undefined' && isLoggedIn) {
        $("#login-button").fadeOut(0);
        $("#sign-up-button").fadeOut(0);
        $("#sign-out-form").fadeIn(0);
        $("#my-collection-button").fadeIn(0);
      }
    });

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
  <title><?php echo "Calendar: " . $firstDayArray['month'] . " " . $firstDayArray['year']; ?></title>
  <style type="text/css">
    table {
      border: 1px solid black;
      border-collapse: collapse;
    }

    th {
      border: 1px solid black;
      padding: 6px;
      font-weight: bold;
      background: #ccc;
    }

    td {
      border: 1px solid black;
      padding: 6px;
      vertical-align: top;
      width: 100px;
    }
  </style>
</head>
<body>
  <header></header>
  <center>
    <h1>Calendar</h1>
    <div style="margin-bottom: 10px">
      <button id="login-button">Sign In</button>
      <button id="sign-up-button">Sign Up</button>
      <form id="sign-out-form" action="<?= $_SERVER['PHP_SELF'] ?>" method="POST">
        <button id="sign-out-button" type="submit" name="sign-out">Sign Out</button>
      </form>
    </div>
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
      <br>
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
      <div style="margin-bottom: 10px">
        <button type="button" id="sign-up-cancel-button">Cancel</button>
        <button type="submit" name="sign-up">Sign Up</button>
      </div>
    </form>
    <h1>Select a Month/Year Combination</h1>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
      <select name="month">
        <?php
        $months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        for ($x = 1; $x <= count($months); $x++) {
          echo "<option value=\"$x\"";
          if ($x == $month) {
            echo " selected";
          }
          echo ">" . $months[$x - 1] . "</option>";
        }
        ?>
      </select>
      <select name="year">
        <?php
        for ($x = 1990; $x <= 2030; $x++) {
          echo "<option";
          if ($x == $year) {
            echo " selected";
          }
          echo ">$x</option>";
        }
        ?>
      </select>
      <button type="submit" name="submit" value="submit">Go!</button>
    </form>
    <br>
    <?php
    $days = Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    echo "<table><tr>\n";
    foreach ($days as $day) {
      echo "<th>" . $day . "</th>\n";
    }
    for ($count = 0; $count < (6 * 7); $count++) {
      $dayArray = getdate($start);
      if (($count % 7) == 0) {
        if ($dayArray['mon'] != $month) {
          break;
        } else {
          echo "</tr><tr>\n";
        }
      }
      if ($count < $firstDayArray['wday'] || $dayArray['mon'] != $month) {
        echo "<td>&nbsp;</td>\n";
      } else {
        $event_title = "";
        $mysqli = mysqli_connect("104.225.208.23", "khuennet_calendarUser", "calendarUser12345", "khuennet_calendar");
        $loggedInUser = isset($_SESSION['username']) ? $_SESSION['username'] : '';
        $chkEvent_sql = "SELECT event_title FROM calendar_events WHERE
          username = '$loggedInUser' AND
          month(event_start) = '$month' AND
          dayofmonth(event_start) = '" . $dayArray['mday'] . "'
          AND year(event_start) = '$year' ORDER BY event_start";
        $chkEvent_res = mysqli_query($mysqli, $chkEvent_sql) or die(mysqli_error($mysqli));

        if (mysqli_num_rows($chkEvent_res) > 0) {
          while ($ev = mysqli_fetch_array($chkEvent_res)) {
            $event_title .= stripslashes($ev['event_title']) . "<br>";
          }
        } else {
          $event_title = "";
        }

        echo "<td><a href=\"javascript:eventWindow('event.php?m=" . $month .
          "&amp;d=" . $dayArray['mday'] . "&amp;y=$year');\">" . $dayArray['mday'] . "</a>
          <br>" . $event_title . "</td>\n";

        unset($event_title);

        $start += ADAY;
      }
    }
    echo "</tr></table>";

    //close connection to MySQL
    mysqli_close($mysqli);
    ?>

    <script type="text/javascript">
      function eventWindow(url) {
        event_popupWin = window.open(url, 'event', 'resizable=yes, scrollbars=yes, toolbar=no,width=400,height=400');
        event_popupWin.opener = self;
      }
    </script>
    <script text="text/javascript" src="./script/users.js"></script>
  </center>
</body>
</html>
