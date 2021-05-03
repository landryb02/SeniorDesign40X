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
img.src = chrome.runtime.getURL("images/Logo16Dark.png");
img.style.display = 'inline-block';
img.style.float = 'right';

img.style.lineHeight = '30px';

popup.appendChild(img);
img.style.verticalAlign = 'middle';

chrome.storage.sync.get("FontSize", function(data){
  popup.style.fontSize = data.FontSize +"px";
  console.log(data);
})

chrome.storage.sync.get("FontType", function(data){
  popup.style.fontFamily = data.FontType;
  console.log(data);
})



//This function will help with mitigating status retrieval issues
function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}



// global variables
// curLink: current link the mouse is hovering over
// mouseX: current X position of the client's mouse
// mouseY: current Y position of the client's mouse
// deleteMe: TEMPORARY alternating safety to test the features of both dangerous
//        and safe links
var curLink;
var mouseX;
var mouseY;


// mouse move event that updates the mouse coordinates
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// activates when the mouse enters a new URL or link
async function onMouseEnterLink(e) {
  // check if the current url is undefined
  if (e.target.protocol != undefined) {
    // position for the popup
    var posLeft = mouseX;
    var posTop = mouseY + 10;

    // update the current link to the new link
    curLink = e.target.protocol + "//" + e.target.host + e.target.pathname;
    userAction(curLink);
    await sleep(200);
    // Determine if the link is safe or unsafe
    if (nonsafeURL.includes(curLink)) {
      popup.paddingLeft = '6px';
      popup.innerHTML = "UNSAFE";
      div.style.lineHeight = '30px';
      div.style.paddingLeft = '5px';
      //popup.style.top = '50%';
      div.style.background = 'linear-gradient(to right, #FF5733 50%, black 80%)';
    } else {
      popup.paddingLeft = '15px';
      popup.innerHTML = "SAFE";
      div.style.lineHeight = '30px';
      div.style.paddingLeft = '5px';
      //popup.style.top = '50%';
      popup.style.background = 'linear-gradient(to right, #40E0D0 50%, black 80%)';
    }

    // update the popup's position, reappend the image, and make the popup visible
    popup.style.top = String(posTop) + 'px';
    popup.style.left = String(posLeft) + 'px';
    popup.appendChild(img);
    img.style.paddingRight = '7px';
    img.style.paddingTop = '7%';
    popup.style.visibility = "visible";

    await sleep(3000);
    popup.style.visibility = "hidden";
  }
}



// activates when the mouse leaves a link
function onMouseLeaveLink(e) {
  // make the popup invisible
  popup.style.visibility = "hidden";
}

// activates when the mouse clicks a link
function onMouseClick(e) {
  // checks the safety of the link
  if (!nonsafeURL.includes(curLink)) {
    // if link is true safe do nothing
    return
  } else {
    //stores the link for use for the warning page html's forward button
    chrome.storage.sync.set({"ForwardLink" : curLink}, function()
    {
		  console.log(curLink + "Is saved");
	  })

    // if link is unsafe then redirect to the warning page
    //warningPage
    location.href = warningPage;
    window.location = warningPage;
    //var warning = document.getElementByClass("button1");

    // temporarily replace warning page with confirm window
    //if (confirm("DO YOU WISH TO CONTINUE TO THE DANGEROUS PAGE? [this is a placeholder for the warning page]")) {
    //  window.location = curLink;
    //} else {
    //  window.stop();
    //}
  }
}

// attach listeners to all anchor elements in the document
function attachListenerToAllAnchors() {
  // cycle through each anchor element in the current webpage
  // attach a mouseenter, mouseleave, and mousedown event to each anchor
  for(let anchorElem of document.querySelectorAll('A')) {
    anchorElem.addEventListener("mouseenter", onMouseEnterLink, true);
    anchorElem.addEventListener("mouseleave", onMouseLeaveLink, true);
    anchorElem.addEventListener("mousedown", onMouseClick, true);
  }
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //slider
    if (request.greeting == "checked"){
      attachListenerToAllAnchors();
      console.log("slider was turned on");
      sendResponse({farewell: "goodbye"});
    }
    if (request.greeting == "unchecked"){
      for(let anchorElem of document.querySelectorAll('A')) {
        anchorElem.removeEventListener("mouseenter", onMouseEnterLink, true);
        anchorElem.removeEventListener("mouseleave", onMouseLeaveLink, true);
        anchorElem.removeEventListener("mousedown", onMouseClick, true);
      }
      console.log("slider was turned off");
      sendResponse({farewell: "goodbye"});
    }

    //font stuff
    if (request.greeting == "12"){
      popup.style.fontSize = "12px";
      console.log("12");
      sendResponse({farewell: "goodbye"});
    }
    if (request.greeting == "16"){
      popup.style.fontSize = "16px";
      console.log("16");
      sendResponse({farewell: "goodbye"});
    }
    if (request.greeting == "20"){
      popup.style.fontSize = "20px";
      console.log("20");
      sendResponse({farewell: "goodbye"});
    }
    if (request.greeting == "Times New Roman"){
      popup.style.fontFamily = "Times New Roman";
      console.log("Times New Roman");
      sendResponse({farewell: "goodbye"});
    }
    if (request.greeting == "Arial"){
      popup.style.fontFamily = "Arial";
      console.log("Arial");
      sendResponse({farewell: "goodbye"});
    }
    if (request.greeting == "fantasy"){
      popup.style.fontFamily = "fantasy";
      console.log("fantasy");
      sendResponse({farewell: "goodbye"});
    }
    if (request.greeting == "cursive"){
      popup.style.fontFamily = "cursive";
      console.log("cursive");
      sendResponse({farewell: "goodbye"});
    }
  }
);

chrome.storage.sync.get("CheckPos", function(data){
  if (data.CheckPos == "unchecked"){
    console.log("slider is off");
  }
  else{
    attachListenerToAllAnchors();
  }
})
