//$(document).ready(function(){
//  $("a").hover(function(){
//    $(this).css("background-color", "yellow");
//    var $PosTop = $(this).offset().top;
//    var $PosLeft = $(this).offset().left;
//
//    console.log($PosTop);
//
//    $(".hide").css({top: $PosTop+20, left: $PosLeft+100, position:'absolute'});
//    $(".hide").show()
//    }, function(){
//    $(this).css("background-color", "white");
//    $(".hide").hide()
//  });
//});

// add image to div popup
var popup = document.getElementById("popup");
var img = document.createElement("Img");
img.setAttribute("src", "images/Logo16.png");
popup.appendChild(img);

// Unique ID for the className.
var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';

// Previous dom, that we want to track, so we can remove the previous styling.
var prevDOM = null;

// Mouse listener for any move event on the current document.
document.addEventListener('mouseover', function (e) {
  var srcElement = e.srcElement;

  // Lets check if our underlying element is a DIV.
  if (srcElement.nodeName == 'DIV') {

    // For NPE checking, we check safely. We need to remove the class name
    // Since we will be styling the new one after.
    if (prevDOM != null) {
      prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);

      console.log(srcElement);

      var offsetTop = 50;
      var offsetLeft = 100;

      var elementPos = srcElement.getBoundingClientRect();
      var posTop = elementPos.top + offsetTop;
      var posLeft = elementPos.left + offsetLeft;


      popup.visibility = "visible";
      popup.style.position = "fixed";
      popup.style.top = String(posTop) + 'px';
      popup.style.left = String(posLeft) + 'px';
    }

    // Add a visited class name to the element. So we can style it.
    srcElement.classList.add(MOUSE_VISITED_CLASSNAME);

    // The current element is now the previous. So we can remove the class
    // during the next iteration.
    prevDOM = srcElement;
  }

  popup.visibility = "hidden";
}, false);
