# BMI Calculator (Express)

Small Express app that shows a friendly BMI form and returns the BMI value and category.

Run locally:

```powershell
cd e:\nodejs\BMI
npm install
npm start

# open http://localhost:3000 in your browser
```

Features:
- GET `/` serves a styled HTML form (weight in kg, height in cm)
- POST `/calculate-bmi` validates inputs and returns BMI value + category
- Result color coded: blue (Underweight), green (Normal), yellow (Overweight), red (Obese)
