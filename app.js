<!-- must create 3 * 3 square dynamically created-->
var total_boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
var box_Totals = []; 

_.each(total_boxes, function(eachBox){
  box_Totals.push(eachBox[eachBox] = {
    position: eachBox, eachBox,
    active: 0
  })
});
console.log(box_Totals)

$(".container").append("<div class=box></div>")