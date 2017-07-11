
$(document).ready(function(){
var player_one = "X";
var player_two = "O";
var firstPlayer;
var winnerFound = false; 
var game_started = false; 
var chosenPiece;
var turns = true;
 // must create 3 * 3 square dynamically created
var total_boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
var box_Totals = [];
var catsGame = [];

var winning_combo_array_x = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[2, 4, 6],[1, 4, 7], [2, 5, 8],[0, 3, 6], [0, 4, 8]]; 

var winning_combo_array_o = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[2, 4, 6],[1, 4, 7], [2, 5, 8],[0, 3, 6], [0, 4, 8]]; 

//prompt user if they want to be x or o
  function askUser(){
     $('.container').prepend(
  '<div id="dialog_box" style= "display: none;"></div>');

$('body').css({ 'z-index':'1', 'background-color': 'white', 'opacity': '1' });
  
     $('#dialog_box').dialog({
      title: 'Which letter would you like to be?',
      width: 100,
      height: 50,
      modal: true,
      resizable: true,
      draggable: false,
      buttons: [
      {
      text: 'O',
      click: function() {
        $('#dialog_box').hide();
        $('.ui-dialog-content').dialog('close'); 
        chosenPiece = "O";
        }
      },
      {
      text: 'X',
      click: function(){
        $('#dialog_box').hide();
        $('.ui-dialog-content').dialog('close'); 
         chosenPiece = "X";
        }
      }]
    })
  }

  // creates each box with an object  
  function createBoxes(){

    if($('.containerBox').length < 1){
      $('.container').append('<div class=containerBox></div>');
       _.each(total_boxes, function(boxNumber){
   
      $(".containerBox").append("<div class=box id="+boxNumber+"></div>")
      box_Totals.push({
        box: boxNumber,
        active: false,
        selector: null    
       })
      });
    } else {
     _.each(total_boxes, function(boxNumber){
      $(".containerBox").append("<div class=box id="+boxNumber+"></div>")
        box_Totals.push({
        box: boxNumber,
        active: false,
        selector: null    
       })
      });
    } 
}; 

//initally sets up boxes for game
if(!game_started) {
  createBoxes()
  game_started = true; 
  askUser();
};

//if choosen piece is x then user goes first 

function playerPlacePiece(boxClicked, boxClickedId){
  var boxNotOccuplied = boxClicked;
  if(!boxNotOccuplied){
    $('#'+boxClickedId).append('<div class=xSpot>'+
        player_one+'</div>');
    updateBoxObject(boxClickedId, player_one);
    checkIfWinner(player_one, winning_combo_array_x);
  }
}


// when box clicked it places an x or an o 
 $(document).on("click", ".box", function(){
  if(chosenPiece === "X" && turns){
      var boxClicked = box_Totals[this.id].active; 
      var boxClickedId = box_Totals[this.id].box;
      firstPlayer = 'user';
      playerPlacePiece(boxClicked, boxClickedId);
      turns = false; 
      computerPlacement(); 
    } 
  });

 //build function that randomly puts o piece on the tic tac toe board
function computerPlacement(){
  if(!turns){
  var randomPlacement = _.filter(box_Totals, function(eachBoxObj){
       return !eachBoxObj.active  
      }).map(function(obj){
        return obj.box; 
      })

var randomValue = randomPlacement[Math.floor(randomPlacement.length * Math.random())];

  setTimeout(function(){ 
    $('#'+randomValue).append('<div class=oSpot>'+player_two+'</div>'); 
    }, 500);
  
  var boxChoosenId = box_Totals[randomValue].box;
  updateBoxObject(boxChoosenId, player_two);
  firstPlayer = 'computer'; 
  checkIfWinner(player_two, winning_combo_array_o );
  turns = true;

  }
}


// updates box object upon every click 
  function updateBoxObject(boxNumber, player){
      box_Totals[boxNumber].active = true;
//pushes box number into array to detemine if cats game
      catsGame.push(boxNumber);
      if(catsGame.length === box_Totals.length){
        resetGame('no one won')
        }
      box_Totals[boxNumber].selector = player; 
  };

//updates winning Array for each player
function updatesWinningArray(onlyPlayerOneBoxes, array_tracker){
      for (var i = 0; i < array_tracker.length; i++) {
      
      for (var j = 0; j < onlyPlayerOneBoxes.length; j++) {
    
        if(array_tracker[i].indexOf(onlyPlayerOneBoxes[j]) > -1) {

         array_tracker[i].splice(array_tracker[i].indexOf(onlyPlayerOneBoxes[j]), 1)        
        } 
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


  if(firstPlayer === "user" && !winnerFound){

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

//resets game when winner found
function resetGame(player){
  var title;

  if(player === 'no one won'){
    title = 'Cats Game! Would you like to play again?'
  } else {
    title = 'Congrats! '+player+' player you won! Would you like to play again?'
  }

function popUpConfirmBox(player){

 $('.container').prepend(
  '<div id="dialog_box" style= "display: none;"></div>');

$('body').css({ 'z-index':'1', 'background-color': 'white', 'opacity': '1' });

  $('#dialog_box').dialog({
      title: title,
      width: 500,
      height: 200,
      modal: true,
      resizable: false,
      draggable: false,
      buttons: [
      {
      text: 'no thanks',
      click: function() {
          $('#dialog_box').hide();
          $('body').hide();
          $('body').css({'background-image' : 'url(cat.jpg)',
      'background-repeat': 'no-repeat'});
        }
      },
      {
      text: 'sure',
      click: function(){
        $('#dialog_box').hide();
        $('.ui-dialog-content').dialog('close'); 
        winning_combo_array_x = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[2, 4, 6],[1, 4, 7], [2, 5, 8],[0, 3, 6], [0, 4, 8]]; 

        winning_combo_array_o = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[2, 4, 6],[1, 4, 7], [2, 5, 8],[0, 3, 6], [0, 4, 8]]; 
        box_Totals = [];
        catsGame = [];
        winnerFound = false;
        firstPlayer = "";
        turns = true; 
        $('.containerBox').detach();
          createBoxes()
          askUser()
        }
      }]
    })
  }
  popUpConfirmBox(player)
}

  // when winner prompt which player is the winner and ask if game would want to be restarted 
function checkCounter(player, array){
  for (var i = 0; i < array.length; i++) {
    if(array[i].length === 0){
      winnerFound = true;
      if(player === 'X'){
         resetGame('X'); 
      } else {
        resetGame('O')
        }
      } 
    };
  };  
});

