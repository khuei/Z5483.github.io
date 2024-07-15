<?php
session_start();

$buttonStr = '';

function compareWordLength($a, $b) {
    return strlen($a) - strlen($b);
}

function compareKeyNum($a, $b) {
    $numA = (int)str_replace('count_', '', $a);
    $numB = (int)str_replace('count_', '', $b);

    return $numA - $numB;
}

function getVowelNum($word) {
  $vowels = str_split("aeiouAEIOU");
  $count = 0;

  foreach (str_split($word) as $char) {
      if (in_array($char, $vowels)) {
          $count++;
      }
  }

  if ($count != 0) {
    // Convert count to string for a unique key
    $key = "count_" . $count;

    // Initialize the array if it doesn't exist
    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = array();
    }

    $_SESSION[$key][] = $word;
  }

  return $count;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Check if a file is selected
  if ($_FILES["file-input"]["error"] == 0) {
    $fileContent = file_get_contents($_FILES["file-input"]["tmp_name"]);

    // Split the content into an array of words using a regular expression
    $words = preg_split('/\s+/', $fileContent, -1, PREG_SPLIT_NO_EMPTY);

    // Iterate through each word and display
    foreach ($words as $word) {
      getVowelNum($word);
    }

    uksort($_SESSION, 'compareKeyNum');

    foreach ($_SESSION as &$words) {
        usort($words, 'compareWordLength');
    }

    // Display buttons for each unique vowel count
    $buttonStr .= "<h3>Press button to show words with correspond number of vowels<h3>";
    foreach ($_SESSION as $key => $words) {
      if (strpos($key, "count_") === 0) {
        $vowelCount = str_replace("count_", "", $key);
        $buttonStr .= "<button onclick=\"displayWords($vowelCount)\">$vowelCount</button> ";
      }
    }
  } else {
    echo "<p>Error uploading file. Please try again.</p>";
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
    <link rel="stylesheet" href="exam.css">
    <title>Programming Exam #2 | khuen</title>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script>
      $(document).ready(function() {
        $("header").load("/header.html");
      });

      // JavaScript function to display words for a specific vowel count
      function displayWords(vowelCount) {
          let words = <?php echo json_encode($_SESSION); ?>['count_' + vowelCount];
          let wordListDiv = document.getElementById('word-list');

          wordListDiv.style.display = "flex";
          wordListDiv.innerHTML = '<h3>Words with ' + vowelCount + ' vowels:</h3>';

          if (words.length > 0) {
              let ul = document.createElement('ul');
              words.forEach(function(word) {
                  let li = document.createElement('li');

                  li.draggable = true;
                  li.textContent = word;
                  li.ondragstart = function(event) {
                        event.dataTransfer.setData('text/plain', word);
                  };

                  ul.appendChild(li);
              });
              wordListDiv.appendChild(ul);
          } else {
              wordListDiv.innerHTML += '<p>No words found.</p>';
          }
      }

      function allowDrop(event) {
        event.preventDefault();
     }

      function handleDrop(event) {
        event.preventDefault();
        let data = event.dataTransfer.getData('text/plain');
        let areaNumber = event.target.getAttribute('data-area');
        console.log(areaNumber);

        // Update the drop area with the dropped word
        let dropArea = document.querySelector('.drop-area[data-area="' + areaNumber + '"]');
        let countSpan = document.querySelector('span#area-' + areaNumber + '-count');

        let ul = dropArea.querySelector('ul');
        let li = document.createElement('li');
        li.textContent = data;
        ul.appendChild(li);

        // Update the count of words in the drop area
        countSpan.textContent = ul.getElementsByTagName('li').length;
      }
    </script>
  </head>
  <header>
  </header>
  <body>
    <center>
      <h1>Programming Exam #2</h1>
      <form id="file-form" action="<?= $_SERVER['PHP_SELF'] ?>" method="POST" enctype="multipart/form-data">
        <h3>File Input Form</h3>
        <label for="file-input">Input a file:</label>
        <input type="file" id="file-input" name="file-input">
        <input type="submit" name="upload-file">
      </form>
      <div style="margin-bottom: 10px">
        <?php echo $buttonStr; ?>
      </div>
      <div id="word-list">
      </div>
      <h2>Drop Areas</h2>
      <div id="drop-areas">
        <div>
            <div class="drop-area" ondrop="handleDrop(event)" ondragover="allowDrop(event)" data-area="1">
                <ul></ul>
            </div>
            <span class="word-count">Number of Words: <span id="area-1-count">0</span></span>
        </div>
        <div>
            <div class="drop-area" ondrop="handleDrop(event)" ondragover="allowDrop(event)" data-area="2">
                <ul></ul>
            </div>
            <span class="word-count">Number of Words: <span id="area-2-count">0</span></span>
        </div>
        <div>
            <div class="drop-area" ondrop="handleDrop(event)" ondragover="allowDrop(event)" data-area="3">
                <ul></ul>
            </div>
            <span class="word-count">Number of Words: <span id="area-3-count">0</span></span>
        </div>
        <div>
            <div class="drop-area" ondrop="handleDrop(event)" ondragover="allowDrop(event)" data-area="4">
                <ul></ul>
            </div>
            <span class="word-count">Number of Words: <span id="area-4-count">0</span></span>
        </div>
      </div>
    </center>
  </body>
</html>
