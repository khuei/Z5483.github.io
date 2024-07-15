<!DOCTYPE html>
<meta charset="UTF-8">
<style>
#selectedLink {
  font-size: 1.4em;
}
</style>
<html lang="en">
  <head>
    <link rel="stylesheet" href="/style/style.css">
    <link rel="stylesheet" href="/style/archive.css">
    <link rel="stylesheet" href="/style/header.css">
    <title>Car Selection Page | khuen</title>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script>
      $(document).ready(function() {
        $("header").load("/header.html");

        $("#storeSelection").click(function() {
          const selectedCars = $("#cars option:selected").map(function() {
            return $(this).val();
          }).get();

          $.ajax({
          type: "POST",
            url: "process.php",
            data: { selectedCars: selectedCars },
            success: function(response) {
              console.log(response);
            }
          });
        });
      });
    </script>
  </head>
  <body>
    <header>
    </header>
    <center>
      <h1>Car Selection Page</h1>
      <form method="post" action="process.php">
        <label for="cars">Choose a car:</label>
        <select name="cars" id="cars" multiple>
          <option value="Toyota Camry">Toyota Camry</option>
          <option value="Toyota 4Runner">Toyota 4Runner</option>
          <option value="Toyota Corolla">Toyota Corolla</option>
          <option value="Toyota Highlander">Toyota Highlander</option>
          <option value="Toyota Tacoma">Toyota Tacoma</option>
          <option value="Toyota Prius">Toyota Prius</option>
          <option value="Toyota RAV4">Toyota RAV4</option>
        </select>
        <br><br>
        <button type="button" id="storeSelection">Select</button>
        <br><br>
        <button id="selectedLink">
          <a href="selected.php">View Selected Cars</a>
        </button>
      </form>
    </center>
  </body>
</html>
