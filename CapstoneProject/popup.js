let changeColor = document.getElementById('changeColor');

document.addEventListener('DOMContentLoaded', documentEvents  , false);
var checkbox = document.querySelector('input[type="checkbox"]');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

//Test functionality for search field and "go button"
function myAction(input) {
  console.log("input value is : " + input.value);
  alert("The entered data is : " + input.value);
  // do processing with data
  // you need to right click the extension icon and choose "inspect popup"
  // to view the messages appearing on the console.
}

function reportPhish(){
  console.log("report was clicked")
  chrome.tabs.create({url: "https://safebrowsing.google.com/safebrowsing/report_phish/?hl=en"});
  window.close();
}
function reportMal(){
  console.log("report was clicked")
  chrome.tabs.create({url: "https://safebrowsing.google.com/safebrowsing/report_badware/?hl=en"});
  window.close();
}

function documentEvents() {

document.getElementById("reportPhish_btn").addEventListener('click',
function() { reportPhish()
});

document.getElementById("reportMal_btn").addEventListener('click',
function() { reportMal()
});

// you can add listeners for other objects ( like other buttons ) here
}


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


//Change Text Font and Size

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


document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('applybtn').addEventListener('click', changeFont);

	document.getElementById('applybtn').addEventListener('click', changeSize);

    document.getElementById('linkcheckbtn').addEventListener('click', checkLink);

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

function checkLink() {
  var link = document.getElementById("manualLink").value;

  const userAction = async (link) =>
  {
          const response = await fetch('https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyDvaIuvtO6mnLdhdJDpTcbK3_l6lElgaPg', {
              method: 'POST',
              body: JSON.stringify({
                  "client":
                  {
                      "clientId":      "yourcompanyname",
                      "clientVersion": "1.5.2"
                  },
                  "threatInfo": {
                      "threatTypes":      ["MALWARE", "SOCIAL_ENGINEERING"],
                      "platformTypes":    ["WINDOWS"],
                      "threatEntryTypes": ["URL"],
                  "threatEntries": [
                      {"url": link}
                      ]
                  }
              }),
              headers: {
              'Content-Type': 'application/json'
              }
          });
          const myJson = await response.json(); //extract JSON from the http response
          console.log(myJson);
          if (isEmpty(myJson))
          {
            alert("Nothing Found, Probably Safe");
          }
          else
          {
            alert("Unsafe Link");
          }
  }

  if (link == "") {
    alert("please enter a link");
  } else {
    userAction(link);
  }
}

function isEmpty(obj)
{
    return Object.keys(obj).length === 0;
}
