//Application slightly refactored. This performs the job better than app.js.

getCityData();

async function getCityData() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Enter the zipcode you want the name of and press enter. \n', myZip => {
        readline.close();

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
            } else if(xhr.readyState > 4 && (xhr.status != 200 || xhr.status > 0)) { console.log(`An error ocurred, readystate: ${xhr.readyState} & statuscode: ${xhr.status}.`) };
        }
        xhr.send();
    });
}