
$(document).ready(function(){
var player_x = "X";
var player_o = "O";
var winnerFound = false; 
var game_started = false; 
var chosenPiece;
var playerGoesFirst; 
 // must create 3 * 3 square dynamically created
var total_boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
var box_Totals = [];
var catsGame = [];
var boxChoosenId;

var arraySpotsWanted = [4, 0, 8, 6, 2]; 

var winning_combo_array_x = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[2, 4, 6],[1, 4, 7], [2, 5, 8],[0, 3, 6], [0, 4, 8]]; 

var winning_combo_array_o = [[0, 1, 2], [3, 4, 5], [6, 7, 8],[2, 4, 6],[1, 4, 7], [2, 5, 8],[0, 3, 6], [0, 4, 8]]; 


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
        playerGoesFirst = "computer";
        $('#dialog_box').hide();
        $('.ui-dialog-content').dialog('close'); 
        chosenPiece = "O";
        var xDiv = 'xSpot';
        computerPlacement(xDiv, winning_combo_array_x, player_x);
        }
      },
      {
      text: 'X',
      click: function(){
        playerGoesFirst = "human"; 
        $('#dialog_box').hide();
        $('.ui-dialog-content').dialog('close'); 
         chosenPiece = "X";
        }
      }]
    })
  }

 //build function that randomly puts x or o piece on the tic tac toe board
//**** currently letters are being overwritten when squares occupied****///
function computerPlacement(divByLetterType, arrayType, playerType){
var placement; 
console.log(catsGame.length)
if(catsGame.length <= 9){

    var randomPlacement = _.filter(box_Totals, function(eachBoxObj){
       return !eachBoxObj.active  
      }).map(function(obj){
        return obj.box; 
      })
      
  function checkIfSpot(){

    checking:
    for (var i = 0; i < arraySpotsWanted.length; i++) {
      for (var j = 0; j < randomPlacement.length; j++) {
        if(arraySpotsWanted[i] === randomPlacement[j]){
        placement = arraySpotsWanted[i]; 
        console.log('######### ', randomPlacement, placement)
        arraySpotsWanted.splice(i, 1);
        break checking;
        };
      };
    };

  }; 

  checkIfSpot();
   console.log("************ ", box_Totals, randomPlacement)
  if(placement === undefined){ 
    setTimeout(function(){ 
    $('#'+randomPlacement[0]).append('<div class='+divByLetterType+'>'+playerType+'</div>');
    }, 1000);
    console.log('********** ', boxChoosenId, randomPlacement)
    boxChoosenId = box_Totals[randomPlacement[0]].box;
  } else {
  setTimeout(function(){ 
    $('#'+placement).append('<div class='+divByLetterType+'>'+playerType+'</div>');
     placement = "";  
    }, 1000);
    boxChoosenId = box_Totals[placement].box;
  }


  updateBoxObject(boxChoosenId, playerType);
  checkIfWinner(playerType, arrayType);

  if(!winnerFound){
    playerGoesFirst = "human"; 
  }; 
}
// var randomValue = randomPlacement[Math.floor(randomPlacement.length * Math.random())];


 
}


//if choosen piece is x then user goes first then computer piece is placed

function playerPlacePiece(boxClicked, boxClickedId, chosenPiece, div, arrayType, marker){
  var boxNotOccuplied = boxClicked;
  if(!boxNotOccuplied){
    $('#'+boxClickedId).append('<div class='+div+'>'+
        marker+'</div>');
    updateBoxObject(boxClickedId, marker);
    checkIfWinner(marker, arrayType);

    if(!winnerFound){
//opposite marker is chosen for computer to randomly place element
      if(marker === 'O' && playerGoesFirst === "human"){
        var xDiv = 'xSpot';
        console.log('place one')
        computerPlacement(xDiv, winning_combo_array_x, player_x);
      } else {
        var oDiv = 'oSpot';
        computerPlacement(oDiv, winning_combo_array_o, player_o);
      }
    }
  }
}


// when box clicked it places an x or an o 
 $(document).on("click", ".box", function(){
  console.log(chosenPiece, playerGoesFirst)
  if(chosenPiece === "O" && playerGoesFirst === "human"){
       var oDiv = 'oSpot';
      var oMarker = 'O';  
      var boxClicked = box_Totals[this.id].active; 
      var boxClickedId = box_Totals[this.id].box;
      playerPlacePiece(boxClicked, boxClickedId, chosenPiece, oDiv, winning_combo_array_o, oMarker);
    } else {
      var xDiv = 'xSpot'; 
      var xMarker = 'X';
      var boxClicked = box_Totals[this.id].active; 
      var boxClickedId = box_Totals[this.id].box;
      playerPlacePiece(boxClicked, boxClickedId, chosenPiece, xDiv, winning_combo_array_x, xMarker);
    }
  });


// updates box object upon every click 
  function updateBoxObject(boxNumber, player){
      box_Totals[boxNumber].active = true;
//pushes box number into array to detemine if cats game
      catsGame.push(boxNumber);
     
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

  var onlyOnePlayerBoxes = onlyOnePlayerBoxType(box_Totals, player)
  
  if(onlyOnePlayerBoxes.length >= 3){
    updatesWinningArray(onlyOnePlayerBoxes, array_tracker);
    checkCounter(player, array_tracker); 
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
        arraySpotsWanted = [4, 0, 8, 6, 2];
        winnerFound = false;
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
        setTimeout(function(){ 
          resetGame('X')  
        }, 1000);
        break;
      } else {
        setTimeout(function(){ 
          resetGame('O')  
          }, 1000);
        break;
        }
      } 
    };
//check if cats game
 if(catsGame.length === box_Totals.length && !winnerFound){
    setTimeout(function(){ 
      resetGame('no one won'); 
      }, 1000);
    }

  };  
});

