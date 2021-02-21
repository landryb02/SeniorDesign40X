// add image to div popup
var popup = document.getElementById("popup");
var img = document.createElement("Img");

// grab the logo's directory relative to the current URL
img.src = chrome.runtime.getURL("images/Logo32.png");
popup.appendChild(img);
popup.style.color = "black";

var warningPage = chrome.runtime.getURL("warning_page/Warning.html");


// setup the extension
// global variables
var curLink;
const o = chrome.runtime.id;
var mouseX;
var mouseY;
var deleteMe = true;

function setup(e) {
  setTimeout(() => {
    chrome.storage.sync.get("isAppOn", e => {
      if (e.isAppOn) {
        attachListenerToAllAnchors()
      }
    })
  }, 1e3)
}

function generateCoordinates() {

}

// check link safety
function checkLinkSafety() {
  if (deleteMe) {
    deleteMe = !deleteMe;
    return true
  } else {
    deleteMe = !deleteMe;
    return false
  }
}

// mouse move for mouse coordinates
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// detect when the mouse enters a link
function onMouseEnterLink(e) {
  if (e.target.protocol != undefined) {
    //console.log(e.target);
    //

    // popup  bitch
    //var posTop = e.target.
    var posLeft = mouseX;
    var posTop = mouseY + 10;

    curLink = e.target.protocol + "//" + e.target.host + e.target.pathname;

    // Landry help
    if (checkLinkSafety()) {
      popup.innerHTML = "Link is Safe";
      popup.style.backgroundColor = "#00cc99";
    } else {
      popup.innerHTML = "WARNING: Link Unsafe";
      popup.style.backgroundColor = "#ff9999";
    }

    popup.style.top = String(posTop) + 'px';
    popup.style.left = String(posLeft) + 'px';
    popup.appendChild(img);
    popup.style.visibility = "visible";

    console.log("Current Link Is: " + curLink);
  }
}

// detect when the mouse leaves a link
function onMouseLeaveLink(e) {
  //if (e.target.tagName == "A" && curLink = 0) {
    //console.log(e.target);
  //}

  // popup
  popup.style.visibility = "hidden";
}

// detect when the mouse stops in link
function onMouseStopLink() {

}

// detect when the mouse clicks a link
function onMouseClick(e) {

  if (!checkLinkSafety()) {
    return
  } else {
    warningPage
    location.href = warningPage;
    //if (confirm("ARE YOU SURE YOU WISH TO CONTINUE????")) {

    //} else {
    //  window.stop();
    //}
  }
}

// attach listeners to all anchor elements in the document
function attachListenerToAllAnchors() {
  for(let anchorElem of document.querySelectorAll('A')) {
    anchorElem.addEventListener("mouseenter", onMouseEnterLink.bind(anchorElem), true);
    //anchorElem.addEventListener("mousestop", onMouseStopLink(), true);
    anchorElem.addEventListener("mouseleave", onMouseLeaveLink.bind(anchorElem), true);
    //anchorElem.querySelectorAll("iframe").forEach(e => {
    //  e.contentWindow.document.addEventListener("mouseenter", onMouseEnterLink(), true),
    //  e.contentWindow.document.addEventListener("mouseleave", onMouseLeaveLink(), true)
    //});
    anchorElem.addEventListener("mousedown", onMouseClick.bind(anchorElem), true);
  }
}




// TESTING
attachListenerToAllAnchors();
