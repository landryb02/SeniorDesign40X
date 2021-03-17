document.getElementById("myButton").addEventListener("click", myFunction);

function myFunction(){
  console.log('my script');
  window.history.back();
}

document.getElementById("myButton2").addEventListener("click", myFunction2);

function myFunction2(){
  chrome.storage.sync.get("ForwardLink", function(data){
	location.href = data.ForwardLink;
	window.location = data.ForwardLink;})
}
}