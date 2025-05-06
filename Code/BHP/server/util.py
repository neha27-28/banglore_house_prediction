import json     # To load column data from JSON
import pickle   # To load the trained model
import numpy as np  # For creating input array for prediction
import os       # To construct cross-platform paths

# Global variables to hold data and model
__locations = None       # List of all available locations
__data_columns = None    # All column names used in model (sqft, bath, bhk, and locations)
__model = None           # Trained ML model

def get_estimated_price(location, sqft, bhk, bath):
    """
    Predicts the price of a house based on location, sqft area, number of bedrooms (BHK), and bathrooms.
    Returns a float rounded to 2 decimal places.
    """
    try:
        # Find the index of the location in data columns (used for one-hot encoding)
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1  # Location not found in model's data columns

    # Create an input array of zeros with length equal to number of model features
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1  # One-hot encoding the location

    # Predict and return the price, rounded to 2 decimal places
    return round(__model.predict([x])[0], 2)

def get_location_names():
    """
    Returns the list of all available location names used by the model.
    """
    return __locations

def load_saved_artifacts():
    """
    Loads the trained model and column information from the disk.
    Must be called before making predictions.
    """
    print("Loading saved artifacts... start")
    global __data_columns
    global __locations
    global __model

    # Construct full path to the artifacts directory
    current_dir = os.path.dirname(__file__)
    artifacts_path = os.path.join(current_dir, 'artifacts')

    try:
        # Load the data columns from JSON file
        columns_file = os.path.join(artifacts_path, "columns.json")
        with open(columns_file, "r") as f:
            __data_columns = json.load(f)["data_columns"]
            __locations = __data_columns[3:]  # First 3 are sqft, bath, bhk

        # Load the pre-trained model using pickle
        model_file = os.path.join(artifacts_path, "banglore_home_prices_model.pickle")
        with open(model_file, 'rb') as f:
            __model = pickle.load(f)

        print("Loading saved artifacts... done")

    except FileNotFoundError as e:
        print(f"Error: Required file not found. Details: {e}")
    except Exception as e:
        print(f"An error occurred while loading artifacts: {e}")

# Run the script directly to test functionality
if __name__ == '__main__':
    load_saved_artifacts()  # Load model and data
    print(get_location_names())  # Print list of locations

    # Predict and print sample prices
    print(get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
    print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))
    print(get_estimated_price('Kalhalli', 1000, 2, 2))  # Location might not be in model
    print(get_estimated_price('Ejipura', 1000, 3, 3))
