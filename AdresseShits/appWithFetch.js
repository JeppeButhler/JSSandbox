//The superior version of the terminal application.

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

        let uri = `https://api.dataforsyningen.dk/postnumre/${myZip}`;
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };

        fetch(uri, requestOptions)
            .then(data => {
                if (data.ok) {
                    return data;
                }
                else if (myZip.length != 4) {
                    console.error(`A danish zipcode is 4 digits, not ${myZip.length}.`);
                }
                else {
                    console.error(`An error ocurred, statuscode: ${data.status}.`);
                }
            })
            .then(console.log("The city with zipcode " + myZip + " is: " + data.navn))
            .then(askAgain())
            .catch(err => {
                console.error(err);
            })
    });
}