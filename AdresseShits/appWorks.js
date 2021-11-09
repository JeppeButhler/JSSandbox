//The superior version of the terminal application.

const { reject, timeout } = require('async');
const { resolve } = require('path');

getCityData();

async function getCityData() {
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the zipcode you want the name of and press enter. \n', myZip => {
        setTimeout(askAgain, 500);
        function askAgain() { 
            rl.question('Search again? y/n. \n', looking => {
            if (looking === "y") {
                rl.close();
                getCityData();
            }
            else {
                console.log("Farewell, world.")
                rl.close();
            }
        });
    }

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
            } else if (xhr.readyState < 4 && (xhr.status != 200 && xhr.status > 0)) {
                console.log(`An error ocurred, statuscode: ${xhr.status} ${xhr.statusText}.`)
                if(myZip.length != 4) {
                    console.log(`A danish zipcode is 4 digits, not ${myZip.length}.`)
                }
            }
        }
        xhr.send();
    });
}