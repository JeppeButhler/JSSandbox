//The most superior version of the terminal application.

const fetch = require("node-fetch");

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
                if (looking.trim() === "y") {
                    rl.close();
                    getCityData();
                }
                else {
                    console.log("Farewell, world.");
                    rl.close();
                }
            });
        }

        let uri = `https://api.dataforsyningen.dk/postnumre/${myZip}`;
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };

        fetch(uri, requestOptions)
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                else if (isNaN(myZip) && myZip.trim() !== "n"){
                    throw new TypeError();
                }
                else if (myZip.length != 4) {
                    throw new EvalError();
                }
                else {
                    throw new fetch.FetchError();
                }
            })
            .then(data => {
                    console.log("The city with zipcode " + myZip + " is: " + data.navn);
            })
            .catch(err => {
                if(err instanceof TypeError) {
                    console.error("Just put one number of four digits there, it's not that hard. Moron!")
                }
                else if(err instanceof EvalError) {
                    console.error(`A danish zipcode is 4 digits, not ${myZip.length}.`);
                }
                else if (err instanceof fetch.FetchError) {
                    console.error("A problem occurred getting a response. Remember to only use 4-digit numbers.");
                }
                else {
                    console.error("Something went terribly wrong. This probably doesn't work at all, then.");
                }
            })
    });
}