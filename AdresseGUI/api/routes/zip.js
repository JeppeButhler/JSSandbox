var express = require("express");
var router = express.Router();
const https = require('https');
const retus = require("retus");


const getCityNameFromZipCode = (zipcode) => {
    let uri = `https://api.dataforsyningen.dk/postnumre/${zipcode}`;
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