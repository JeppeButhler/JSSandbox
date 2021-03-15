const ZipCode = () => {
    const lookUpZipCode = (zipcode) => {
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let xhr = new XMLHttpRequest();
        let uri = `https://dawa.aws.dk/postnumre/${zipcode}`;

        xhr.open("GET", uri);
        xhr.setRequestHeader("Accept", "application/json");
        await xhr.onreadystatechange;
        let response = JSON.parse(xhr.responseText);
        document.getElementById("cityName").value = response["navn"];
    };

    const onClick = () => {
        let zipCodeFromInput = document.getElementById("myZip").value;
        return lookUpZipCode(zipCodeFromInput);
    }

    return (
        <div>
            <input id='myZip' type='number' placeholder='Indtast postnummer her' />
            <p id='cityName' value='' />
            <button type='submit' onClick='onClick' value='Find bynavn' />
        </div>
    )
}

export default ZipCode