/*!
 * urban.js 
 *
 * Copyright 2017 Ralf Urban
 * Released under the MIT license
 * https://github.com/antiproton
 *
 * Date: 6.2.2017
 */
var stockfish = new Worker('stockfish.js');
var init = function() {


var board,
  game = new Chess();

// do not pick up pieces if the game is over
// only pick up pieces for White
var onDragStart = function(source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
  }
};

var makeMove = function() {
  var possibleMoves = game.moves();

  // game over
  if (possibleMoves.length === 0) return;

  
 
 var FEN = game.fen();
 
 document.getElementById('fen').value =  FEN;

 stockfish.postMessage("position fen"+" "+FEN);
stockfish.postMessage('go depth 15');
 stockfish.onmessage = function(event) {
  console.log(event.data);
 
 
  document.getElementById("ausgabe").innerHTML = event.data; 
  
 
    var  str = event.data;
    
    var res = str.match(/score/g);
  
    
    
    if (res == "score"){
      var meldung = str.split(" "); 
 document.getElementById("sc").innerHTML = meldung[9]; 
 
 
  }
    
   
      res = str.split(" "); 
   
   
   if (res[0] == "bestmove"){   
   
    zug = res[1].split(""); 
   
  botmovesource = zug[0]+zug[1];
  botmovetarget = zug[2]+zug[3];
  
    // document.getElementById("botmove").innerHTML = botmovesource;  
      
      source = botmovesource;
      target = botmovetarget; 
 
    var move = game.move({
    from: source,
    to:  target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });
 
  board.position(game.fen()); 
    
    document.getElementById("PGN").innerHTML = game.pgn(); 
    updateStatus();
    sound();
    }
       
  
};
 
 
};

var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';
  

  // make stockfish move for black
  
 
  window.setTimeout(makeMove, 150);
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
  document.getElementById("PGN").innerHTML = game.pgn();
  updateStatus(); 
  sound();
};

var updateStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }
 document.getElementById("status").innerHTML = status;

};


var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);


}; // end init()
$(document).ready(init);

function sound(){
	document.getElementById('sound').innerHTML = '<audio autoplay preload controls> <source src="sound/move.wav" type="audio/wav" /> </audio>';
	}
	


