
$(document).ready(function(){
var player_one = "X";
var player_two = "O"
var firstPlayer = true;
var winnerFound = false; 

 // must create 3 * 3 square dynamically created
var total_boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
var box_Totals = [];

var winning_combo_array_x = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[2, 4, 6],[1, 4, 7], [2, 5, 8],[0, 3, 6], [0, 4, 8]]; 

var winning_combo_array_o = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[2, 4, 6],[1, 4, 7], [2, 5, 8],[0, 3, 6], [0, 4, 8]]; 


  // creates each box with an object  
  _.each(total_boxes, function(boxNumber){
    $(".containerBox").append("<div class=box id="+boxNumber+"></div>")
    box_Totals.push({
      box: boxNumber,
      active: false,
      selector: null    
    })
  });

// when box clicked it places an x or an o 
  $('.box').click(function(){
  var boxNotOccuplied = box_Totals[this.id].active;
    if(!boxNotOccuplied){
      if(firstPlayer){
        $(this).append('<div class=xSpot>'+player_one+'</div>');
        updateBoxObject(this.id, player_one);
        checkIfWinner(player_one, winning_combo_array_x);
        firstPlayer = false; 
      } else {
        $(this).append('<div class=oSpot>'+player_two+'</div>');
        updateBoxObject(this.id, player_two);
        checkIfWinner(player_two, winning_combo_array_o );
        firstPlayer = true; 
      }
    }
  });

// updates box object upon every click 
  function updateBoxObject(boxNumber, player){
      box_Totals[boxNumber].active = true;
      box_Totals[boxNumber].selector = player; 
  };

//updates winning Array for each player
function updatesWinningArray(onlyPlayerOneBoxes, array_tracker){
      for (var i = 0; i < array_tracker.length; i++) {
      
      for (var j = 0; j < onlyPlayerOneBoxes.length; j++) {
    
        if(array_tracker[i].indexOf(onlyPlayerOneBoxes[j]) > -1) {

         array_tracker[i].splice(array_tracker[i].indexOf(onlyPlayerOneBoxes[j]), 1)
        
        } 
        console.log('winning_combo_array', array_tracker)
       };
    };

}

function onlyOnePlayerBoxType(allBoxesArray, playerType){
  return _.filter(allBoxesArray, function(eachBoxObj){
       return eachBoxObj.selector === playerType; 
      }).map(function(obj){
        return obj.box; 
      })
}


  // create function that checks to see if we have a winner after each click
function checkIfWinner(player, array_tracker){
 
// returns array of players positions

  var allPlayerPosition = _.filter(box_Totals,function(object){   
      return object.selector === player; 
    }).map(function(obj) {
      return obj.box;
  });

//need to fix not sure what i'm trying to do
  if(firstPlayer && !winnerFound){

    var onlyPlayerOneBoxes = onlyOnePlayerBoxType(box_Totals, "X")

    if(onlyPlayerOneBoxes.length >= 3){
      updatesWinningArray(onlyPlayerOneBoxes, array_tracker)
      checkCounter(player, array_tracker); 
    }; 
  } else if(!winnerFound){
    var onlyPlayerTwoBoxes = onlyOnePlayerBoxType(box_Totals, "O")

    if(onlyPlayerTwoBoxes.length >= 3){
      updatesWinningArray(onlyPlayerTwoBoxes, array_tracker)
      checkCounter(player, array_tracker); 
    }; 
  }
}; 

  // when winner prompt which player is the winner and ask if game would want to be restarted 
function checkCounter(player, array){
  for (var i = 0; i < array.length; i++) {
    if(array[i].length === 0){
      console.log('we have a winner, congrats ! ', player)
      winnerFound = true; 
      }
    };
  };  
});

