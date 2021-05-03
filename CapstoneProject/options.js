// let page = document.getElementById('buttonDiv');
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function() {
//       chrome.storage.sync.set({color: item}, function() {
//         console.log('color is ' + item);
//       })
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);

//Slider code
chrome.storage.sync.get("CheckPos", function(data){
  if (data.CheckPos == "unchecked"){
    checkbox.checked = false
    console.log("unchecked");
  }
  else{
    checkbox.checked=true;
    console.log("checked");
  }
})

// Change Text Font and Size
function changeFont() {
    var myselect = document.getElementById("input-font");
    var font = myselect.options[myselect.selectedIndex].value;
    document.getElementById("output-text").style.fontFamily = font;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: font }, function(response) {
        console.log(response.farewell);
      });
    });
    chrome.storage.sync.set({"FontType" : font}, function(){console.log("saved font");})
};

function changeSize() {
	var myselect = document.getElementById("input-size");
    var size = myselect.options[myselect.selectedIndex].value;
	document.getElementById("output-text").style.fontSize = size + "px";

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: size }, function(response) {
      console.log(response.farewell);
    });
  });
  chrome.storage.sync.set({"FontSize" : size}, function(){console.log("saved size");})
};

// check an inputted link

document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('applybtn')
		.addEventListener('click', changeFont);

	document.getElementById('applybtn')
		.addEventListener('click', changeSize);

    // Slider function
    var checkbox = document.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {greeting: "checked" }, function(response) {
            console.log(response.farewell);
          });
        });
        chrome.storage.sync.set({"CheckPos" : "checked"}, function(){console.log("saved check");})
        console.log('Checked');
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {greeting: "unchecked" }, function(response) {
            console.log(response.farewell);
          });
        });
        chrome.storage.sync.set({"CheckPos" : "unchecked"}, function(){console.log("saved check");})
        console.log('Not checked');
      }
    });
});
