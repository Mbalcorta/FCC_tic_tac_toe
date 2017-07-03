
$(document).ready(function(){
var player_one = "X";
var player_two = "O"
var firstPlayer = true;
var counterForPlayerOne = 0;
var counterForPlayerTwo = 0; 

<!-- must create 3 * 3 square dynamically created-->
  var total_boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
  var box_Totals = [];
  var playerOnePositions;
  var playerTwoPositions;

  <!-- creates each box with an object --> 
  _.each(total_boxes, function(boxNumber){
    $(".containerBox").append("<div class=box id="+boxNumber+"></div>")
    box_Totals.push({
      box: boxNumber,
      active: false,
      selector: null    
    })
  });

<!-- when box clicked it places an x or an o -->
  $('.box').click(function(){
  var boxNotOccuplied = box_Totals[this.id].active;
    if(!boxNotOccuplied){
      if(firstPlayer){
        $(this).append('<div class=xSpot>'+player_one+'</div>');
        updateBoxObject(this.id, player_one);
        checkIfWinner(player_one);
        firstPlayer = false; 
      } else {
        $(this).append('<div class=xSpot>'+player_two+'</div>');
        updateBoxObject(this.id, player_two);
        checkIfWinner(player_two);
        firstPlayer = true; 
      }
    }
  });

<!--   updates box object upon every click -->
  function updateBoxObject(boxNumber, player){
      box_Totals[boxNumber].active = true;
      box_Totals[boxNumber].selector = player; 
  };

<!--   create function that checks to see if we have a winner after each click -->
function checkIfWinner(player){
  var winning_combo_array = [[0, 1, 2], [0, 3, 6], [0, 4, 8]]; 

<!-- returns array of players positions -->
  var allPlayerPosition = _.filter(box_Totals,function(object){   
      return object.selector === player; 
    }).map(function(obj) {
      return obj.box;
  });

<!--  updates players positions on each turn -->

    if(player === "X"){
      playerOnePositions = allPlayerPosition;
       console.log('playerOone ', playerOnePositions)
    } else {
      playerTwoPositions = allPlayerPosition;
       console.log('playertwo ', playerTwoPositions)
    };

<!-- @@@@@@@@@@@@@@@fix has syntax error -->
<!--     if(playerOnePositions.length >= 3 || playerTwoPositions.length >= 3) {
    _.each(winning_combo_array, function(eachWinningCombo){
        console.log('winning   ', eachWinningCombo)
    })
  };
   -->



};

<!--   when winner prompt which player is the winner and ask if game would want to be restarted -->

  if(counterForPlayerOne === 3|| counterForPlayerTwo === 3) {
    console.log('we have a winner, congrats ! ', box_Totals[this.id].selector)
  }
  

});

