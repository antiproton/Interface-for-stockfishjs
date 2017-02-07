<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>Graphical User Interface for stockfish.js</title>
<link rel="stylesheet" href="css/chessboard.css" />
<style type="text/css">
<!--
body,td,th {
	font-family: Arial, Helvetica, sans-serif;
}
#hideme {display: none;}

-->
</style>
</head>
<body>
<!-- * index.php
 *
 * Copyright 2017 Ralf Urban
 * Released under the MIT license
 * https://github.com/antiproton
 *
 * Date: 6.2.2017 -->
<table>
<tr>
<td><div id="board" style="width: 400px"></div>
<input size="47" id="fen" style="color: #de5410;font-size: 12px; " type="text">
<form action=""><input type="submit" value="New Game"></form> 
</td>
<td valign=top>
<div style="display:inline">PGN: </div><div style="display:inline" id="PGN"></div> <br><br>
<div style="display:inline">STATUS: </div><div style="display:inline" id="status"></div> <br><br>
<div style="display:inline">BESTMOVE: </div><div style="display:inline" id="ausgabe"></div>  <br><br>
 <div style="display:inline">SCORE: </div><div style="display:inline" id="sc"></div>  <br><br> 
<div id="hideme">
 <span id="sound"></span>
</div>
</td>
</tr>
</table>
<script src="js/json3.min.js"></script>
<script src="js/jquery-1.10.1.min.js"></script>
<script src="js/chessboard.js"></script>
<script src="js/chess.js"></script>
<script src="js/urban.js"></script>
</body>
</html>
