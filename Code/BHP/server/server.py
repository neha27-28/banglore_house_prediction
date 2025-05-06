from flask import Flask, request, jsonify
import util  # This is your utility script (the one with prediction logic)

# Load the trained model and data columns when server starts
util.load_saved_artifacts()

# Create Flask app instance
app = Flask(__name__)

@app.route('/get_location_names')
def get_location_names():
    """
    API endpoint to get the list of locations used by the model.
    Returns:
        JSON response containing all location names.
    """
    response = jsonify({
        'locations': util.get_location_names()
    })
    # Allow cross-origin requests (important for frontend integration)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    """
    API endpoint to predict house price.
    Expects form-data with keys: total_sqft, location, bhk, bath.
    Returns:
        JSON response with the predicted price.
    """
    # Extract form data from the POST request
    total_sqft = float(request.form['total_sqft'])  # Area in sqft
    location = request.form['location']             # Location name
    bhk = int(request.form['bhk'])                  # Number of bedrooms
    bath = int(request.form['bath'])                # Number of bathrooms

    # Call utility function to get predicted price
    estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)

    # Prepare and return JSON response
    response = jsonify({
        'estimated_price': estimated_price
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Run the Flask app when this script is executed directly
if __name__ == "__main__":
    print("Starting Python Flask server for home price prediction...")
    app.run(debug=True)  # Runs the server in debug mode for development
