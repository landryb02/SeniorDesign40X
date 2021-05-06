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
//div.style.lineHeight = '25px';

//div.style.top = '0px';
//div.style.left = '0px';
div.style.width = '90px';
div.style.height = '24px';

//div.style.paddingLeft = '15px';
//div.style.paddingTop = '6px';
//div.style.paddingBottom = '6px';
//div.paddingRight = '20px';
div.style.borderRadius = '10px';

div.style.border = '1px solid #1C2833';
//div.style.backgroundColor = '#40E0D0';
div.style.background = 'linear-gradient(to right, #40E0D0 50%, black 80%)';
div.style.fontFamily = 'helvtica,courier';

div.style.textAlign = 'left';
div.style.color = 'white';
div.style.visibility = 'hidden';
div.innerHTML = '';

// append div element to the current webpage
document.body.appendChild( div );
