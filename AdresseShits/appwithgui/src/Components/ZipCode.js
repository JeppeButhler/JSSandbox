import React from 'react';

export default function ZipCode() {
    const lookUpZipCode = (zipcode) => {
        let uri = `https://api.dataforsyningen.dk/postnumre/${zipcode}`;
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };

        fetch(uri, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(data => {
                return data.navn;
            })
            .catch(err => {
                alert("Something went wrong.")
            });

        const onClick = () => {
            let zipCodeFromInput = document.getElementById("myZip").value;
            return lookUpZipCode(zipCodeFromInput);
        };

        return (
            <div>
                <input id='myZip' type='number' placeholder='Enter zipcode here' />
                <button type='submit' onClick='onClick' value='Lookup' />
                <p id='cityName' value='' />
            </div>
        )
    };
};