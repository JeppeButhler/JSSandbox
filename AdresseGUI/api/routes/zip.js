var express = require("express");
var router = express.Router();
const https = require('https');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const retus = require("retus");


const getCityNameFromZipCode = (zipcode) => {
    let uri = `https://dawa.aws.dk/postnumre/${zipcode}`;
    let httpResponse = retus(uri, {
        method: "get",
        responseType: "json"
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