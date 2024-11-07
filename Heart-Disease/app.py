import streamlit as st
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Load the trained model, label encoders, and scaler
model = joblib.load('Heart-Disease/heart_disease_model.pkl')
label_encoders = joblib.load('Heart-Disease/label_encoders.pkl')
scaler = joblib.load('Heart-Disease/scaler (6).pkl')

# Function to make predictions
def predict_heart_disease(new_data):
    """
    Predicts the presence of heart disease based on input data.
    
    Parameters:
    - new_data (pd.DataFrame): DataFrame containing features similar to the training data (except 'Heart Disease').

    Returns:
    - List of predictions (0: No Heart Disease, 1: Heart Disease)
    """
    # Preprocess new data: Drop Patient ID if present, split Blood Pressure, and encode categorical variables
    if 'Patient ID' in new_data.columns:
        new_data = new_data.drop(columns=['Patient ID'])
    
    # Split the 'Blood Pressure' column into systolic and diastolic
    new_data[['Systolic_BP', 'Diastolic_BP']] = new_data['Blood Pressure (mmHg)'].str.split('/', expand=True).astype(float)
    new_data = new_data.drop(columns=['Blood Pressure (mmHg)'])
    
    # Encode categorical variables using the same encoders as used during training
    for column, le in label_encoders.items():
        if column in new_data.columns and column != 'Heart Disease':
            new_data[column] = le.transform(new_data[column])

    # Standardize numerical features
    new_data[['Age', 'Cholesterol (mg/dL)', 'Systolic_BP', 'Diastolic_BP']] = scaler.transform(new_data[['Age', 'Cholesterol (mg/dL)', 'Systolic_BP', 'Diastolic_BP']])

    # Make predictions and get probabilities
    prediction = model.predict(new_data)
    prediction_proba = model.predict_proba(new_data)

    # Debug: print probabilities to understand model's decision
    st.write(f"Prediction Probabilities: {prediction_proba}")

    # Decode predictions to original labels
    predictions = label_encoders['Heart Disease'].inverse_transform(prediction)
    return predictions[0], prediction_proba[0]

# Streamlit UI
st.title('Heart Disease Prediction')

st.write("""
This application predicts whether a patient has heart disease based on their health data.
""")

# Create input fields for the user to enter the data
age = st.number_input('Age', min_value=0, max_value=120, value=60)
sex = st.selectbox('Sex', options=['Male', 'Female'])
race_ethnicity = st.selectbox('Race/Ethnicity', options=['White', 'Black', 'Asian', 'Hispanic', 'Other'])
smoking_status = st.selectbox('Smoking Status', options=['Current', 'Former', 'Never'])
cholesterol = st.number_input('Cholesterol (mg/dL)', min_value=0, value=200)
diabetes = st.selectbox('Diabetes', options=['Yes', 'No'])
family_history = st.selectbox('Family History of Heart Disease', options=['Yes', 'No'])
blood_pressure = st.text_input('Blood Pressure (mmHg)', '140/90')

# Create a button to make the prediction
if st.button('Predict'):
    # Create DataFrame from the input data
    new_data = pd.DataFrame({
        'Age': [age],
        'Sex': [sex],
        'Race/Ethnicity': [race_ethnicity],
        'Smoking Status': [smoking_status],
        'Cholesterol (mg/dL)': [cholesterol],
        'Diabetes': [diabetes],
        'Family History of Heart Disease': [family_history],
        'Blood Pressure (mmHg)': [blood_pressure]
    })

    # Make the prediction
    prediction, prediction_proba = predict_heart_disease(new_data)

    # Display prediction and probability
    if prediction == 'Yes':  # Assuming 'Yes' indicates heart disease
        st.write("Prediction: The patient has heart disease.")
    else:
        st.write("Prediction: The patient does not have heart disease.")

    # Show the prediction probabilities
    st.write(f"Probability of 'No Heart Disease': {prediction_proba[0]:.2f}")
    st.write(f"Probability of 'Heart Disease': {prediction_proba[1]:.2f}")
