var express = require("express");
var router = express.Router();
const https = require('https');


const getCityNameFromZipCode = (zipcode) => {
    let uri = `https://api.dataforsyningen.dk/postnumre/${zipcode}`;
    let requestOptions = {
        method: "GET",
        responseType: "json",
        mode: 'cors'
    };

    fetch(uri, requestOptions)
        .then(data => {
            if(data.ok) {
                return data.json();
            }
        }) 
        .then(data => {
            return data.navn;
        })
        .catch(err => {
            console.error(err);

        });
    };




    let httpResponse = retus(uri, {
        method: "GET",
        responseType: "json",
        mode: 'cors'
    });
    let body = httpResponse.body;
    return body;
};


router.get("/", function(req, res, next) {

    let zipcode = req.query.zipcode;
    try {
        let result = getCityNameFromZipCode(zipcode);
        console.log(result.navn);

        let jsonReturnObj = JSON.stringify({
            city: result['navn'],
            zipcode: zipcode,
            success: true
        });
        res.send(jsonReturnObj);

    } catch (e) {
        console.log(e);
        next();
    }
});

module.exports = router;