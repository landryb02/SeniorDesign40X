//document.documentElement.style.height = '100%';
//document.body.style.height = '100%';
//document.documentElement.style.width = '100%';
//document.body.style.width = '100%';

var div = document.createElement( 'div' );

//append all elements
document.body.appendChild( div );

//set attributes for div
div.id = 'popup';

div.display = 'block';
div.style.position = 'fixed';
div.style.fontSize = '14px';
div.style.color = '#000000';

div.style.lineHeight = '25px';

div.style.top = '0px';
div.style.left = '0px';
div.style.width = '170px';
div.style.height = '30px';
div.style.padding = '10px';

div.style.border = '1px solid #666666';
div.style.backgroundColor = '#c0cedd';

div.style.textAlign = 'left';
div.visibility = 'hidden';
div.innerHTML = 'WARNING: Unsafe Link';
