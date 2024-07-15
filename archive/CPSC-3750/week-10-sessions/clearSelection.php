<?php
session_start();

if (isset($_POST['clearSession'])) {
    unset($_SESSION['selectedCars']);
    header('Location: selected.php');
    exit();
}
?>
