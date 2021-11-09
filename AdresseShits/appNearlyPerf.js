//This version does the trick better than app.js and appRe.js. However, the code could but shortened a bit to make more sense.
//This is done in appWorks.js.

const { reject } = require('async');
const { resolve } = require('path');

getCityData();

async function getCityData() {
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question1 = () => {
        return new Promise((resolve, reject) => {
            rl.question('Enter the zipcode you want the name of and press enter. \n', myZip => {


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
                        resolve();
                    } else if (xhr.readyState > 4 && (xhr.status != 200 || xhr.status > 0)) {
                        console.log(`An error ocurred, readystate: ${xhr.readyState} & statuscode: ${xhr.status}.`)
                        reject();
                    }
                }
                xhr.send();
            })
        })
    }

    const question2 = () => {
        return new Promise((resolve) => {
            rl.question('Search again? y/n. \n', looking => {
                if (looking === "y") {
                    question1();
                    resolve();
                }
                else {
                    console.log("Farewell, world.")
                    resolve();
                }
            });
        });
    }

    const main = async () => {
        await question1();
        await question2();
        rl.close();
    }

    main();
}