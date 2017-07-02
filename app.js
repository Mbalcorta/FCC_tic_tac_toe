<!-- must create 3 * 3 square dynamically created-->
var total_boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
var box_Totals = []; 

_.each(total_boxes, function(boxNumber){
  $(".container").append("<div class=box id="+boxNumber+"></div>")
});

var arrayOfRowEnd = 
  _.filter(total_boxes, function(num){ 
    var numPosition = num + 1; 
    if(numPosition % 3 === 0){
      return num
     }  
  });

_.each(arrayOfRowEnd, function(boxNumber){
console.log(boxNumber)
    $("#"+boxNumber).css({"backgroundColor": "black"})
   <!--  $("#"+boxNumber).css({"clear": "right"}) -->
});

