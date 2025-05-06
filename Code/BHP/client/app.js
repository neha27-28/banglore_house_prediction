// Function to get selected number of bathrooms from radio buttons
function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;  // Return index + 1 as selected value
        }
    }
    return -1; // No selection made
}

// Function to get selected number of BHKs from radio buttons
function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;  // Return index + 1 as selected value
        }
    }
    return -1; // No selection made
}

// Function triggered when "Estimate Price" button is clicked
function onClickedEstimatedPrice() {
    console.log("Estimate price button clicked");

    // Get input values
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    // Backend API endpoint for price prediction
    var url = "http://127.0.0.1:5000//predict_home_price";

    // Make a POST request to backend with the form data
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function(data, status) {
        // Display the estimated price in the UI
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
}

// Function triggered when the page loads
function onPageLoad() {
    console.log("Document loaded");

    // Backend API endpoint to get list of location names
    var url = "http://127.0.0.1:5000/get_location_names";

    // Fetch locations and populate the location dropdown
    $.get(url, function(data, status) {
        console.log("got response for get_location_names request");

        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");

            $('#uiLocations').empty(); // Clear previous options

            // Add each location as an option in the dropdown
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

// Run onPageLoad function when the window is loaded
window.onload = onPageLoad;
