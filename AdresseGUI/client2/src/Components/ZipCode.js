const ZipCode = () => {

    const performLookup = (zipcode) => {
        fetch(`http://localhost:3001/zip?zipcode=${zipcode}`)
            .then(res => res.json())
            .then((data) => {
                return data.navn;
            })
            .catch(err => {
                console.error(err);
            });
    };

    const readInputAndPassRequest = () => {
        let zipcode = document.getElementById("zipCodeInput").value;
        performLookup(zipcode, (result) => {
            document.getElementById("resultParagraph").textContent = result;
        });
    }

    return (
        <div>
            <p id="resultParagraph"></p>
                <label>Enter zipcode to lookup.</label>
                <input id="zipCodeInput" type="number"/>
                <button onClick={readInputAndPassRequest}/>
        </div>
    )
}

export default ZipCode