// Name: Link Hover/Click Popup
// Description: Registers when the mouse hovers over an element that is a link
//      in a webpage. Provides a popup of this link that reads out the link's
//      safety.

// locate the popup div element that is added to the webpage via the content file
var popup = document.getElementById("popup");
var img = document.createElement("Img");
// variable to hold location of the warning page
var warningPage = chrome.runtime.getURL("warning_page/Warning.html");

// Grab the logo's directory relative to the current URL and append this image
// to the ppopup div element
img.src = chrome.runtime.getURL("images/Logo32.png");
popup.appendChild(img);


// global variables
// curLink: current link the mouse is hovering over
// mouseX: current X position of the client's mouse
// mouseY: current Y position of the client's mouse
// deleteMe: TEMPORARY alternating safety to test the features of both dangerous
//        and safe links
var curLink;
var mouseX;
var mouseY;
var deleteMe = true;


//function setup(e) {
//  setTimeout(() => {
//    chrome.storage.sync.get("isAppOn", e => {
//      if (e.isAppOn) {
//        attachListenerToAllAnchors()
//      }
//    })
//  }, 1e3)
//}

// mouse move event that updates the mouse coordinates
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// check if the current link being hovered over is safe
// this is the connection between the hover popup and Landry's work
function checkLinkSafety() {
  if (deleteMe) {
    deleteMe = !deleteMe;
    return true
  } else {
    deleteMe = !deleteMe;
    return false
  }
}

// activates when the mouse enters a new URL or link
function onMouseEnterLink(e) {
  // check if the current url is undefined
  if (e.target.protocol != undefined) {
    // position for the popup
    var posLeft = mouseX;
    var posTop = mouseY + 10;

    // update the current link to the new link
    curLink = e.target.protocol + "//" + e.target.host + e.target.pathname;

    // Determine if the link is safe or unsafe
    if (checkLinkSafety()) {
      popup.innerHTML = "Link is Safe";
      popup.style.backgroundColor = "#00cc99";
    } else {
      popup.innerHTML = "WARNING: Link Unsafe";
      popup.style.backgroundColor = "#ff9999";
    }

    // update the popup's position, reappend the image, and make the popup visible
    popup.style.top = String(posTop) + 'px';
    popup.style.left = String(posLeft) + 'px';
    popup.appendChild(img);
    popup.style.visibility = "visible";

    // Display current link being hovered in the console
    console.log("Current Link Is: " + curLink);
  }
}

// activates when the mouse leaves a link
function onMouseLeaveLink(e) {
  // make the popup invisible
  popup.style.visibility = "hidden";
}

// detect when the mouse stops in link
//function onMouseStopLink() {
//
//}

// activates when the mouse clicks a link
function onMouseClick(e) {
  // checks the safety of the link
  if (!checkLinkSafety()) {
    // if link is safe do nothing
    return
  } else {
    // if link is unsafe then redirect to the warning page
    warningPage
    location.href = warningPage;
    window.location = warningPage;
    //var warning = document.getElementByClass("button1");

    // temporarily replace warning page with confirm window
    //if (confirm("DO YOU WISH TO CONTINUE TO THE DANGEROUS PAGE? [this is a placeholder for the warning page]")) {
      //window.location = curLink;
    //} else {
      //window.stop();
    //}
  }
}

// attach listeners to all anchor elements in the document
function attachListenerToAllAnchors() {
  // cycle through each anchor element in the current webpage
  // attach a mouseenter, mouseleave, and mousedown event to each anchor
  for(let anchorElem of document.querySelectorAll('A')) {
    anchorElem.addEventListener("mouseenter", onMouseEnterLink.bind(anchorElem), true);
    anchorElem.addEventListener("mouseleave", onMouseLeaveLink.bind(anchorElem), true);
    anchorElem.addEventListener("mousedown", onMouseClick.bind(anchorElem), true);
  }
}

attachListenerToAllAnchors();