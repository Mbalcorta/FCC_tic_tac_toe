
$(document).ready(function(){
<!-- must create 3 * 3 square dynamically created-->
  var total_boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
  var box_Totals = []; 
  _.each(total_boxes, function(boxNumber){
    $(".containerBox").append("<div class=box id="+boxNumber+"></div>")
    box_Totals.push({
      box: boxNumber,
      active: false,
      selector: null    
    })
  });

  $('.box').click(function(){
     $(this).append('<div class=xSpot>X</div>');
  })
});

