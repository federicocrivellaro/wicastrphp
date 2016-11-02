
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
      <div class="list"></div>
      <form action="/post.php" method="post">
        <input type="range" name="value">
        <!--
        <section>
          <div class="control">
              <div id="type"></div>
          </div>
        </section>
        -->
        <button type="submit"> SUBMIT</button>
      </form>
      
    </div>
    <div class="page">  
      <div class="container-fluid">
        <div id="dashboard" class="pieBarChart"></div>
      </div>  
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
  <script type="text/javascript" src="js/PieBarChart.js"></script>
  <script type="text/javascript" src="js/init.js"></script>

    <!-- /build -->

</body>


</html>
