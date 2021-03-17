//var test = "http://malware.testing.google.test/testing/malware/*";
//var test2 = "http://malware.wicar.org/";
//use this for testing malware: http://malware.testing.google.test/testing/malware/*

//This portion covers grabbing the embedded links within a page and then stringifies the array for the JSON body
//var arr = [], l = document.links;
//This will serve as the array of non-safe links for use in mouse hovering code
var nonsafeURL = [];

/*
for(var i=0; i<l.length; i++)
{
    arr.push(l[i].href);
}
arr.push(test, test2);
*/
/////////////////////////////////////

//This function runs the safe browsing POST request and outputs information 
const userAction = async (urlLink) => 
{
    //var arrLength = arr.length;
    //for (var i = 0; i < arrLength; i++)
    //{
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
                    {"url": urlLink}
                    ]
                }
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const myJson = await response.json(); //extract JSON from the http response
        console.log("Request made");
        if (isEmpty(myJson))
        {
            //console.log("No matches were found!");
        }
        else
        {
            console.log("Here is a detected threat:", myJson.matches[0].threat.url);
            nonsafeURL.push(myJson.matches[0].threat.url);
        }
    //}
}
///////////////////////////////////////////////////////////////////////////////////////

//Run the request!
//console.log("Program is started");
//userAction();
//console.log("Program has finished");

//This function checks whether an object is empty
    //Useful for determing whether there was a matched url or not!
function isEmpty(obj)
{
    return Object.keys(obj).length === 0;
}