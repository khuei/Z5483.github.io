<?php

// Start a session
session_start();

// Check if the 'status' cookie is not set
if (!isset($_COOKIE['status'])) {
  // Create 'status' cookie
  $cookieValue = 'created';
  setcookie('status', $cookieValue);

  // Create empty files
  $primeFile = fopen('prime.txt', 'w');
  $armstrongFile = fopen('armstrong.txt', 'w');
  $fibonacciFile = fopen('fibonacci.txt', 'w');
  $noneFile = fopen('none.txt', 'w');
}

// Check if a POST request with 'numberInput' data is received
if (!empty($_POST['numberInput'])) {
  $numbers = explode(' ', $_POST['numberInput']);

  // Function to check if a number is an Armstrong number
  function isArmstrong($number) {
    $originalNumber = $number;
    $sum = 0;
    $numDigits = strlen($number);

    while ($number > 0) {
      $digit = $number % 10;
      $sum += pow($digit, $numDigits);
      $number = (int)($number / 10);
    }

    return $sum == $originalNumber;
  }

  // Function to check if a number is prime
  function isPrime($number) {
    if ($number == 0 || $number == 1) {
      return false;
    }

    for ($i = 2; $i <= $number / 2; $i += 1) {
      if ($number % $i == 0) {
        return false;
        break;
      }
    }

    return true;
  }

  // Function to check if a number is in the Fibonacci sequence
  function isFibonacci($number) {
    if ($number == 0 || $number == 1)
      return true;

    $a = 0;
    $b = 1;

    while (true) {
      $c = $a + $b;
      $a = $b;
      $b = $c;

      if ($c == $number) {
        return true;
      } else if ($c >= $number) {
        return false;
      }
    }
  }

  // Iterate through each input number
  foreach ($numbers as $number) {
    // Append number to appropriate file
    $has_written = false;

    if (isPrime($number)) {
      file_put_contents('prime.txt', $number . "\n", FILE_APPEND | LOCK_EX);
      $has_written = true;
    }

    if (isArmstrong($number)) {
      file_put_contents('armstrong.txt', $number . "\n", FILE_APPEND | LOCK_EX);
      $has_written = true;
    }

    if (isFibonacci($number)) {
      file_put_contents('fibonacci.txt', $number . "\n", FILE_APPEND | LOCK_EX);
      $has_written = true;
    }

    if (!$has_written) {
      file_put_contents('none.txt', $number . "\n", FILE_APPEND | LOCK_EX);
    }
  }
}

$showFile = false;
$fileContent = "";
$fileTitle = "";

// Check for button clicks and set file content and title accordingly
if (isset($_POST['armstrongBtn']) && $_POST['armstrongBtn'] == 'clicked') {
  $fileContent = file_get_contents('armstrong.txt');
  $fileTitle = 'Armstrong Number';
  $showFile = true;
}

if (isset($_POST['fibonacciBtn']) && $_POST['fibonacciBtn'] == 'clicked') {
  $fileContent = file_get_contents('fibonacci.txt');
  $fileTitle = 'Fibonacci Number';
  $showFile = true;
}

if (isset($_POST['primeBtn']) && $_POST['primeBtn'] == 'clicked') {
  $fileContent = file_get_contents('prime.txt');
  $fileTitle = 'Prime Number';
  $showFile = true;
}

if (isset($_POST['noneBtn']) && $_POST['noneBtn'] == 'clicked') {
  $fileContent = file_get_contents('none.txt');
  $fileTitle = 'None Number';
  $showFile = true;
}

// Handle the 'reset' button
if (isset($_POST['resetBtn']) && $_POST['resetBtn'] == 'clicked') {
  // Delete the 'status' cookie
  setcookie('status', '', -1);

  // Delete the text files
  if (file_exists('armstrong.txt')) {
    unlink('armstrong.txt');
  }

  if (file_exists('fibonacci.txt')) {
    unlink('fibonacci.txt');
  }

  if (file_exists('prime.txt')) {
    unlink('prime.txt');
  }

  if (file_exists('none.txt')) {
    unlink('none.txt');
  }
}

// Check if a file should be shown or display the default HTML content
if (!$showFile) {
  include 'index.html';
} else {
  include 'index.html';
  echo '<br><br><center>';
  echo '<div style="background-color: Tan;width: 50%;height:50%">';
  echo '<br><h2>' . $fileTitle . '</h2>';
  echo nl2br($fileContent);
  echo '<br></div></center>';
}

?>
