<?php
session_start();

if (isset($_POST['selectedCars'])) {
  if (isset($_SESSION['selectedCars']) && is_array($_SESSION['selectedCars'])) {
    $_SESSION['selectedCars'] = array_merge($_SESSION['selectedCars'], $_POST['selectedCars']);
  } else {
    $_SESSION['selectedCars'] = $_POST['selectedCars'];
  }
  echo "Selection stored in SESSION";
}
?>
