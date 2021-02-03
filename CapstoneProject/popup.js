let changeColor = document.getElementById('changeColor');

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

function documentEvents() {    
document.getElementById('ok_btn').addEventListener('click', 
  function() { myAction(document.getElementById('name_textbox'));
});

// you can add listeners for other objects ( like other buttons ) here 
}