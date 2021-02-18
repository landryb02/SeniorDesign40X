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

// grab the logo's directory relative to the current URL 
img.src = chrome.runtime.getURL("images/Logo16.png");
popup.appendChild(img);

// Unique ID for the className.
var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';

// Previous dom, that we want to track, so we can remove the previous styling.
var prevDOM = null;
var isLink = false;

// Mouse listener for any move event on the current document.
document.addEventListener('mouseover', function (e) {
  var srcElement = e.srcElement;
  isLink= false;

  // Lets check if our underlying element is a DIV.
  if (srcElement.nodeName == 'DIV') {

    // loop through the child elements
    // of the "#container" div
    var eleClass = String(srcElement.getAttribute("class"));

    $("." + eleClass).children()
            .each(function () {

        // "this" is the current child
        // in the loop grabbing this
        var eleLink = $(this)
                .attr("href");

        if (eleLink != null) {
          isLink = true;
        }
    });

    // For NPE checking, we check safely. We need to remove the class name
    // Since we will be styling the new one after.
    if (prevDOM != null && srcElement != popup && isLink) {
      //prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);

      var offsetTop = 50;
      var offsetLeft = 100;

      var elementPos = srcElement.getBoundingClientRect();
      var posTop = elementPos.top + offsetTop;
      var posLeft = elementPos.left + offsetLeft;

      // if the current element is a URL then update the position of the popup
      // offset from the current element's position and change visibility to visible
      popup.style.visibility = "visible";
      popup.style.position = "fixed";
      popup.style.top = String(posTop) + 'px';
      popup.style.left = String(posLeft) + 'px';
    }

    //srcElement.classList.add(MOUSE_VISITED_CLASSNAME);

    // The current element is now the previous. So we can remove the class
    // during the next iteration.
    prevDOM = srcElement;
  } else {
    console.log("not URL");
    // if the element is not a URL hide the popup
    popup.style.visibility = "hidden";
  }
}, false);

// Mouse listener for any click event on the current document
document.addEventListener('click', function(e) {
  var srcElement = e.srcElement

  // check if the source element is a link
  if (srcElement.nodeName == 'DIV' && isLink) {
    console.log("WARNING");
  }

});
