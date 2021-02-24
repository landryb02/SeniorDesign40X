
const userAction = async () => {
    console.log("Successfully entered the function");
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
                {"url": "http://malware.testing.google.test/testing/malware/*"}
                ]
            }
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    console.log("Successful output!");
    }

userAction();

//console.log("Uhh did something happen?");

//use this for testing malware: http://malware.testing.google.test/testing/malware/*