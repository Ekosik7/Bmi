const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (!isFinite(weight) || !isFinite(height) || weight <= 0 || height <= 0) {
    const errorHtml = `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Invalid input</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <main class="container">
        <h1 class="error">Invalid input</h1>
        <p>Please enter numeric values greater than 0 for weight and height.</p>
        <p><a class="btn" href="/">Back to form</a></p>
      </main>
    </body>
    </html>`;
    return res.status(400).send(errorHtml);
  }

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const bmiValue = Number.isFinite(bmi) ? bmi : 0;
  const bmiText = bmiValue.toFixed(2);

  let category = '';
  let className = '';

  if (bmiValue < 18.5) {
    category = 'Underweight';
    className = 'underweight';
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    category = 'Normal';
    className = 'normal';
  } else if (bmiValue >= 25 && bmiValue <= 29.9) {
    category = 'Overweight';
    className = 'overweight';
  } else {
    category = 'Obese';
    className = 'obese';
  }

  const resultHtml = `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>BMI Result</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <main class="container">
      <h1 class="title">Your BMI Result</h1>
      <div class="result ${className}">
        <p class="value">${bmiText}</p>
        <p class="category">${category}</p>
      </div>
      <p><a class="btn" href="/">Calculate again</a></p>
    </main>
  </body>
  </html>`;

  res.send(resultHtml);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});