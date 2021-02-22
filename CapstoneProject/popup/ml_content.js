// Creation of the popup element
// all style and other settings are carried out here

// create the dive element
var div = document.createElement( 'div' );

// attribute settings for the popup div
div.id = 'popup';

div.display = 'block';
div.style.position = 'fixed';
div.style.fontSize = '14px';
div.style.color = '#000000';
div.style.lineHeight = '25px';

div.style.top = '0px';
div.style.left = '0px';
div.style.width = '190px';
div.style.height = '30px';
div.style.padding = '10px';

div.style.border = '1px solid #666666';
div.style.backgroundColor = '#c0cedd';

div.style.textAlign = 'center';
div.style.visibility = 'hidden';
div.innerHTML = 'WARNING: Unsafe Link';

// append div element to the current webpage
document.body.appendChild( div );
