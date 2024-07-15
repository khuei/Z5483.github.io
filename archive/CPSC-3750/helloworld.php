<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<html lang="en">
  <head>
    <link rel="stylesheet" href="/style/archive.css">
    <link rel="stylesheet" href="/style/header.css">
    <title>PHP Helloworld — khuen</title>
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
  </head>
  <body>
    <header></header>
    <script>
      $(document).ready(function() {
        $("header").load("/header.html");
      });
    </script>
    <center>
      <?php echo "Hello World"?>
    </center>
    <?php phpinfo()?>
  </body>
</html>
