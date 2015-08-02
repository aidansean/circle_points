<?php
$title = 'A circle from three points' ;
$js_scripts = array('functions.js') ;
include_once('project.php') ;
include_once($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>
  <div class="right">
    <p>This page makes a circle from three points.</p>
  </div>
  
  <div class="right">
    <h3>The solution</h3>
    <div class="blurb">
      <div id="canvas_container" style="text-align:center">
        <canvas id="circle_canvas" width="500" height="500" style="border:1px solid black;margin-top:10px;margin:auto"></canvas>
      </div>
    </div>
  </div>
  
<?php foot() ; ?>