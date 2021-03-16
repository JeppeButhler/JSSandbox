const ZipCode = () => {

    const performLookup = (zipcode, callback) => {
        fetch(`http://localhost:9000/zip?zipcode=${zipcode}`)
            .then(res => res.json())
                .then(callback);
    };

    const readInputAndPassRequest = () => {
        let zipcode = document.getElementById("zipCodeInput");
        performLookup(zipcode, (result) => {
            document.getElementById("resultParagraph").text = result.city;
        });
    }

    return (
        <div>
            <p id="resultParagraph"></p>
                <label>Indtast postnummer og du vil på magisk vis, få et bynavn frem :O</label>
                <input id="zipCodeInput" type="number"/>
                <button onClick="readInputAndPassRequest"/>
        </div>
    )
}

export default ZipCode