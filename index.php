
<html>

<head>
  <meta charset="UTF-8">
  <title>WiList</title>
  <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">


  <link rel="stylesheet" type="text/css" href="css/normalize.css">
  <link rel="stylesheet" href="assets/libraries/jquery/jquery-ui.min.css" media="screen" />
  <link rel="stylesheet" type="text/css" href="assets/libraries/roundSlider-1.3/roundslider.css">
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
  <div class="pages">
    <div class="page active">
        <h1 class="title">
          Welcome<br/> 
          the music is set at
          <span class="decibels">95db</span>
        </h1>
        <p>Set your ideal volume.<br/>
        It will be adjusted every 30 minutes<br/> based on average preference</p>
      <form action="/post.php" method="post">
        <section>
          <div class="control">
              <div id="volume"></div>
          </div>
        </section>
        <button type="submit"></button>
      </form>
      <div class="counter"></div>
      <div id="barchart"></div>
    </div>
  </div>  



  <!--
    <div class="feedback"></div>
    <div class="list"></div>-->

  <!-- build:js js/js.min.js-versioname- -->
  <script type="text/javascript" src="assets/libraries/jquery/jquery-3.1.1.min.js"></script>
  <script type="text/javascript" src="assets/libraries/jquery/jquery-ui.min.js"></script>
  <script type="text/javascript" src="assets/libraries/hammer/hammer.min.js"></script>
  <script type="text/javascript" src="assets/libraries/hammer/jquery.hammer.js"></script>
  <script type="text/javascript" src="assets/libraries/hammer/hammer-time.min.js"></script>
  <script type="text/javascript" src="assets/libraries/roundSlider-1.3/roundslider.min.js"></script>
  <script type="text/javascript" src="assets/libraries/d3/d3.min.js"></script>
  <script type="text/javascript" src="js/common.js"></script>
  <script type="text/javascript" src="js/dataCheckConversion.js"></script>
  <script type="text/javascript" src="js/form.js"></script>
  <script type="text/javascript" src="js/barchart.js"></script>
  <script type="text/javascript" src="js/init.js"></script>

    <!-- /build -->

</body>


</html>
