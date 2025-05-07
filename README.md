# Banglore House Prediction

This project aims to build a complete end-to-end machine learning application that predicts the price of houses in Bangalore based on user inputs like square footage, number of bedrooms, bathrooms, and location.

##  Project Structure

1. **Model Building**
   - Data cleaning and preprocessing
   - Outlier detection and removal
   - Feature engineering
   - Model selection and training (Linear Regression)
   - Hyperparameter tuning using GridSearchCV
   - Cross-validation for model validation

2. **Backend Development**
   - Python Flask server
   - Model saved using `pickle` 
   - Exposes a REST API endpoint for prediction

3. **Frontend Development**
   - Simple HTML/CSS/JavaScript-based UI
   - Sends user input to Flask server
   - Displays predicted house price in the UI

## Dataset

- File: `Bengaluru_House_Data.csv`

## Features Considered

- Total Square Footage (`total_sqft`)
- Number of Bedrooms (`bhk`)
- Number of Bathrooms (`bath`)
- Location (One-Hot Encoded)

## Tech Stack & Libraries

- **Language*: Python
- **Libraries*:
  - pandas, numpy for data manipulation
  - matplotlib for visualization
  - scikit-learn for model building
  - pickle for saving the model
- **Development Tools*:
  - Jupyter Notebook
  - Visual Studio Code / PyCharm
- **Web*:
  - Flask (Python web server)
  - HTML / CSS / JavaScript (frontend UI)
  - Postman (check for http requests)

## How to Run the Project

1. **Clone the repo**
git clone https://github.com/yourusername/house-price-prediction.git
cd house-price-prediction

2. **Install dependencies**
pip install -r requirements.txt

3. **Train the model**
python real_estate_prediction.py

4. **Run Flask Server**
python app.py

5. **Open in browser**

Visit: `http://127.0.0.1:5000/`

## Output

- Predicts house price in INR Lakhs based on user input.
- Real-time interaction between UI and model via Flask.
