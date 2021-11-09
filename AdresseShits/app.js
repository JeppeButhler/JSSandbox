//Initial shitty version. Does the trick but does so poorly.

getCityData();

async function getCityData()
{
    let prompt = require('prompt-sync')();
    let myZip = prompt('Enter the zipcode you want the name of and press enter. \n');
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let xhr = new XMLHttpRequest();
    let uri = `https://api.dataforsyningen.dk/postnumre/${myZip}`;
    
    xhr.open("GET", uri);
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = processRequest;

    async function processRequest() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);
            let cityName = response["navn"];
            console.log("The city with zipcode " + myZip + " is: " + cityName);
        }
    }
    xhr.send();
}