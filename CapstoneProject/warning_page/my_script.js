document.getElementById("myButton").addEventListener("click", myFunction);
//Function to go back to the previous website ("take me back to safety" button)
function myFunction(){
  console.log('my script');
  window.history.back();
}

document.getElementById("myButton2").addEventListener("click", myFunction2);
//Function to access current link from ml_popup.js ("ignore warning" button)
function myFunction2(){
  chrome.storage.sync.get("ForwardLink", function(data){
	location.href = data.ForwardLink;
	window.location = data.ForwardLink;})
}