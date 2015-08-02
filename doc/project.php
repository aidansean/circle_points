<?php
include_once($_SERVER['FILE_PREFIX']."/project_list/project_object.php") ;
$github_uri   = "https://github.com/aidansean/circle_points" ;
$blogpost_uri = "http://aidansean.com/projects/?tag=circle_points" ;
$project = new project_object("circle_points", "Circle from three points", "https://github.com/aidansean/circle_points", "http://aidansean.com/projects/?tag=circle_points", "circle_points/images/project.jpg", "circle_points/images/project_bw.jpg", "This project was thrown together rather quickly to solve a geometrical problem: How can you analytically find the circle which passes through three given points?  The construction simply demonstrates that the method works, and it not intended to give any further information to the user.", "Maths", "canvas,HTML,JavaScript") ;
?>