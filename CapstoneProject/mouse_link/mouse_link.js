$(document).ready(function(){
  $("a").hover(function(){
    $(this).css("background-color", "yellow");
    var $PosTop = $(this).offset().top;
    var $PosLeft = $(this).offset().left;

    console.log($PosTop);

    $(".hide").css({top: $PosTop+20, left: $PosLeft+100, position:'absolute'});
    $(".hide").show()
    }, function(){
    $(this).css("background-color", "white");
    $(".hide").hide()
  });
});
