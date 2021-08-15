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
            return jsonData.navn;
        })
        .then(navn => {
            document.getElementById("resultParagraph").innerText = navn;
        })
        .catch(err => {
            document.getElementById("resultParagraph").innerText = "En fejl opstod. Prøv igen.";
        });
    };

    const readInputAndPassRequest = () => {
        let zipcode = document.getElementById("zipCodeInput").value;
        if(zipcode >= 1000 && zipcode < 10000) {
            performLookup(zipcode);
        } else {
            document.getElementById("resultParagraph").innerText = "Et postnummer indeholder fire cifre."
        }
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