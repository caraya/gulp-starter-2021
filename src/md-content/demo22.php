<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Client Hints Demo Document</title>
  <meta http-equiv="Accept-CH" content="Width, Viewport-Width, DPR, Device-Memory, RTT, Downlink, ECT, Sec-CH-UA-Full-Version, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch, Sec-CH-UA-Model, Sec-CH-UA-Mobile">
  <meta http-equiv="Accept-CH-Lifetime" content="86400">
</head>
<body>
<?php
// Check Accept for an "image/avif" substring.
$avif = stristr($_SERVER["HTTP_ACCEPT"], "image/avif") !== false ? true : false
// Check Accept for an "image/webp" substring.
$webp = stristr($_SERVER["HTTP_ACCEPT"], "image/webp") !== false ? true : false;
// Store the value of the DPR header
$dpr = $_SERVER["DPR"];

function generateSources(name) {
  if ( $avif ) {
    echo( "images/" . name . $dpr . "x" . ".avif" );
  }

  if ( $webp ) {
    echo( "images/" . name . $dpr . "x" . ".webp");
  }

  echo( "images/" . name . $dpr . "x" . ".png");
}
?>


</body>
</html>
