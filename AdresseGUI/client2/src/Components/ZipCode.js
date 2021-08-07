const ZipCode = () => {

    const performLookup = (zipcode) => {
        let uri = `https://api.dataforsyningen.dk/postnumre/${zipcode}`;
    let requestOptions = {
        method: "GET",
        responseType: "application/json",
        mode: 'cors'
    };

    fetch(uri, requestOptions)
        .then(data => {
            if(data.ok) {
                return data.json();
        }}) 
        .then(jsonData => {
            console.log(jsonData.navn);
            return jsonData.navn;
        })
        .catch(err => {
            console.error(err);
        });
    };

    const readInputAndPassRequest = () => {
        let zipcode = document.getElementById("zipCodeInput").value;
        performLookup(zipcode, (result) => {
            document.getElementById("resultParagraph").innerText = result;
        });
    }

    return (
        <div>
            <div id="resultDiv">
                <input id="zipCodeInput" type="number" placeholder="Enter zipcode"/>
            </div>
            <button onClick={readInputAndPassRequest}>Search</button> 
            <p id="resultParagraph"/>
        </div>
    )
}

export default ZipCode