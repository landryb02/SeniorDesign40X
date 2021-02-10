
document.addEventListener('DOMContentLoaded', printArr, false);

var arr = [], l = document.links;
for(var i=0; i<l.length; i++) 
{
  arr.push(l[i].href);
}
console.log(arr);
//arr is now an array of all the href attributes from the anchors in the page
//document.links grabs all of the links and then you must loop through,
//specifically getting the href valued links

console.log("This is the first element of arr: " + arr[0]);
document.getElementById("embeddedlink").innerHTML = ("<p>"+arr[0]+"</p><br>");

