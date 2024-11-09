import streamlit as st
import joblib
import pandas as pd
import numpy as np

# Load the trained model
model = joblib.load('brain_stroke_model.pkl')

# Function to convert "Yes" and "No" to 1 and 0, and to handle missing values as np.nan
def convert_condition(value):
    if value == 'Yes':
        return 1
    elif value == 'No':
        return 0
    else:
        return np.nan

# User input form
st.title("Brain Stroke Prediction")

# Input fields with placeholders and optional selection
age = st.number_input("Age", min_value=1, max_value=100, value=1)

# Gender input, allowing empty selection
gender = st.selectbox("Gender", ["", "Male", "Female"])

# Hypertension input, allowing empty selection
hypertension = st.selectbox("Hypertension", ["", "Yes", "No"])

# Heart disease input, allowing empty selection
heart_disease = st.selectbox("Heart Disease", ["", "Yes", "No"])

# Ever married input, allowing empty selection
ever_married = st.selectbox("Ever Married", ["", "Yes", "No"])

# Work type input, allowing empty selection
work_type = st.selectbox(
    "Work Type",
    ["", "Private", "Self-employed", "Govt_job", "children", "Never_worked"]
)

# Residence type input, allowing empty selection
residence_type = st.selectbox("Residence Type", ["", "Urban", "Rural"])

# Smoking status input, allowing empty selection
smoking_status = st.selectbox(
    "Smoking Status",
    ["", "formerly smoked", "never smoked", "smokes", "Unknown"]
)

# Average glucose level input with faster increment steps
avg_glucose_level = st.number_input("Average Glucose Level", min_value=0.0, max_value=300.0, step=5.0)

# BMI input with faster increment steps
bmi = st.number_input("BMI", min_value=10.0, max_value=60.0, step=1.0)

# Add a button to trigger the prediction
if st.button("Predict"):
    # Prepare the input data, converting missing values to np.nan
    input_data = {
        'age': age,
        'gender': gender if gender else np.nan,  # Handle blank as np.nan
        'hypertension': convert_condition(hypertension),
        'heart_disease': convert_condition(heart_disease),
        'ever_married': ever_married if ever_married else np.nan,  # Handle blank as np.nan
        'work_type': work_type if work_type else np.nan,  # Handle blank as np.nan
        'Residence_type': residence_type if residence_type else np.nan,  # Handle blank as np.nan
        'smoking_status': smoking_status if smoking_status else np.nan,  # Handle blank as np.nan
        'avg_glucose_level': avg_glucose_level,
        'bmi': bmi
    }

    input_data = pd.DataFrame([input_data])

    # Prediction with probability
    try:
        prediction = model.predict(input_data)
        prediction_probability = model.predict_proba(input_data)

        # Show the result
        if prediction[0] == 1:
            st.write("Prediction: The person is likely to have a stroke.")
            st.write(f"Prediction Confidence: {prediction_probability[0][1] * 100:.2f}%")
        else:
            st.write("Prediction: The person is less likely to have a stroke.")
            st.write(f"Prediction Confidence: {prediction_probability[0][0] * 100:.2f}%")
    except ValueError as e:
        st.error(f"Error in prediction: {e}")
