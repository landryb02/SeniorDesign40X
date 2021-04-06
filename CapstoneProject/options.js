let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);

// Change Text Font and Size
function changeFont() {
    var myselect = document.getElementById("input-font");
    var font = myselect.options[myselect.selectedIndex].value;
    document.getElementById("output-text").style.fontFamily = font;
};

function changeSize() {
	var myselect = document.getElementById("input-size");
    var size = myselect.options[myselect.selectedIndex].value;
	document.getElementById("output-text").style.fontSize = size + "px";
};

// check an inputted link

document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('applybtn')
		.addEventListener('click', changeFont);

	document.getElementById('applybtn')
		.addEventListener('click', changeSize);
});
