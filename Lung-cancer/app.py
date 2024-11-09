import streamlit as st
import pandas as pd
import joblib

# Load the model and scaler
model = joblib.load('Lung-cancer/best_logistic_model.pkl')
scaler = joblib.load('Lung-cancer/scaler.pkl')

# Load the data
data = pd.read_csv('Lung-cancer/lung cancer data set.csv.csv')

# Ensure all columns except 'Level' are numeric
data.iloc[:, :-1] = data.iloc[:, :-1].apply(pd.to_numeric, errors='coerce')

# Extract feature names excluding non-predictive columns
feature_names = data.drop(columns=['Level', 'Patient Id', 'index'], errors='ignore').columns

# Streamlit App
st.title("Lung Cancer Prediction")
st.write("**User is requested to give the numeric value on a scale of 1-10 for each feature.**")

# Input form
user_input = {}
with st.form("user_input_form"):
    st.subheader("Please enter your details:")
    for feature in feature_names:
        if feature == "Gender":
            # Dropdown for Gender
            user_input[feature] = st.selectbox(feature, options=[None, 0, 1], format_func=lambda x: "Select" if x is None else ("Male" if x == 0 else "Female"))
        elif feature == "Age":
            user_input[feature] = st.number_input(feature, min_value=0, format='%d')
        else:
            user_input[feature] = st.number_input(feature, min_value=1, max_value=10, format='%d')

    # Submit button
    submitted = st.form_submit_button("Submit")

# Check for empty inputs
if submitted:
    if None in user_input.values() or any(val == '' or pd.isnull(val) for val in user_input.values()):
        st.error("Please provide all required inputs.")
    else:
        # Convert user input to DataFrame
        input_df = pd.DataFrame([user_input])

        # Drop non-predictive columns
        input_df = input_df.drop(columns=['Patient Id', 'index'], errors='ignore')

        # Scale the input
        input_scaled = scaler.transform(input_df)

        # Predict
        prediction = model.predict(input_scaled)
        prediction_proba = model.predict_proba(input_scaled)

        # Output results
        st.subheader("Prediction Results:")
        if prediction[0] == 1:
            st.write("The model predicts that there is no significant risk of lung cancer.")
        else:
            st.write("The model predicts that there is a risk of lung cancer.")

        st.write(f"Confidence: {prediction_proba[0][prediction[0]] * 100:.2f}%")
