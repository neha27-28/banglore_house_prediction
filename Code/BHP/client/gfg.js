// Get selected BHK value from radio buttons
function getBHKValue() {
    const bhkRadios = document.getElementsByName("uiBHK");
    for (let i = 0; i < bhkRadios.length; i++) {
        if (bhkRadios[i].checked) {
            return parseInt(bhkRadios[i].value);
        }
    }
    return -1; // No selection
}

// Get selected bathroom value from radio buttons
function getBathValue() {
    const bathRadios = document.getElementsByName("uiBathrooms");
    for (let i = 0; i < bathRadios.length; i++) {
        if (bathRadios[i].checked) {
            return parseInt(bathRadios[i].value);
        }
    }
    return -1; // No selection
}

// Function called when "Estimate Price" is clicked
function onClickedEstimatePrice() {
    console.log("Estimate button clicked");
    const sqft = document.getElementById("uiSqft").value;
    const bhk = getBHKValue();
    const bath = getBathValue();
    const location = document.getElementById("uiLocations").value;
    const estPrice = document.getElementById("uiEstimatedPrice");

    if (!sqft || bhk === -1 || bath === -1 || !location) {
        estPrice.innerHTML = "<h4 style='color:red'>Please fill all fields</h4>";
        return;
    }

    const url = "http://127.0.0.1:5000/predict_home_price";
    const formData = new FormData();
    formData.append("total_sqft", sqft);
    formData.append("bhk", bhk);
    formData.append("bath", bath);
    formData.append("location", location);

    fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        estPrice.innerHTML = `<h2>Estimated Price: ₹ ${data.estimated_price} Lakh</h2>`;
    })
    .catch(error => {
        estPrice.innerHTML = "<h4 style='color:red'>Error predicting price</h4>";
        console.error("Prediction error:", error);
    });
}

// Load location list from backend and populate dropdown
function onPageLoad() {
    console.log("Page loading...");
    const url = "http://127.0.0.1:5000/get_location_names";
    const locationDropdown = document.getElementById("uiLocations");

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.locations) {
                locationDropdown.innerHTML = '<option value="" disabled selected>Select a Location</option>';
                data.locations.forEach(loc => {
                    const option = new Option(loc, loc);
                    locationDropdown.appendChild(option);
                });
                console.log("Locations loaded.");
            }
        })
        .catch(error => {
            console.error("Error loading locations:", error);
        });
}

// Trigger onPageLoad when the page finishes loading
window.onload = onPageLoad;
