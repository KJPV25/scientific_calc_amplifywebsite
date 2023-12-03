function changeCalculator() {
  const calculatorType = document.getElementById('calculator-type').value;
  const calculators = ['scientific', 'age', 'interest', 'sip', 'date-difference', 'base', 'percentage', 'fuel-consumption', 'units', 'mortgage', 'geometry', 'bmi'];
  
  calculators.forEach((calcType) => {
    const calculatorDiv = document.getElementById(`${calcType}-calculator`);
    calculatorDiv.style.display = calculatorType === calcType ? 'block' : 'none';
  });
}

function appendToDisplay(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function backspace() {
  let displayValue = document.getElementById('display').value;
  document.getElementById('display').value = displayValue.slice(0, -1);
}

function calculateSquareRoot() {
  const currentValue = parseFloat(document.getElementById('display').value);

  if (!isNaN(currentValue) && currentValue >= 0) {
    document.getElementById('display').value = Math.sqrt(currentValue).toLocaleString('en-IN');
  } else {
    document.getElementById('display').value = 'Error! Use after the number';
  }
}

function calculateResult() {
  try {
    let expression = document.getElementById('display').value;
    expression = expression.replace(/sin\(/g, 'Math.sin(');
    expression = expression.replace(/cos\(/g, 'Math.cos(');
    expression = expression.replace(/tan\(/g, 'Math.tan(');
    expression = expression.replace(/log\(/g, 'Math.log10(');
    expression = expression.replace(/ln\(/g, 'Math.log(');
    expression = expression.replace(/,/g, '.');

    document.getElementById('display').value = eval(expression);
  } catch (error) {
    document.getElementById('display').value = 'Error';
  }
}

function calculateAge() {
  const dobInput = document.getElementById('dob');
  const timeInput = document.getElementById('time');
  const ageResultDiv = document.getElementById('age-result');

  const dob = new Date(dobInput.value);
  const time = timeInput.value.split(':');
  dob.setHours(time[0], time[1]); 

  const now = new Date();
  const ageInMilliseconds = now - dob;
  const ageInSeconds = Math.floor(ageInMilliseconds / 1000);

  const years = Math.floor(ageInSeconds / (365 * 24 * 60 * 60));
  const months = Math.floor((ageInSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
  const days = Math.floor((ageInSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
  const hours = Math.floor((ageInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((ageInSeconds % (60 * 60)) / 60);
  const seconds = ageInSeconds % 60;

  const dayOfBirth = dob.toLocaleDateString('en-US', { weekday: 'long' });

  ageResultDiv.innerHTML = `
  <h4>Age:</h4>
  <p>Years: ${years}</p>
  <p>Months: ${months}</p>
  <p>Days: ${days}</p>
  <p>Hours: ${hours}</p>
  <p>Minutes: ${minutes}</p>
  <p>Seconds: ${seconds}</p>
  <h4>Day of Birth:</h4>
  <p>${dayOfBirth}</p>
`;
}

function calculateInterest() {
  const interestType = document.getElementById('interest-type').value;
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const time = parseFloat(document.getElementById('time-interest').value);
  const numeralSystem = document.getElementById('numeral-system-interest').value;

  if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
    const interestResultDiv = document.getElementById('interest-result');
    interestResultDiv.innerHTML = 'Please enter valid numbers for principal, rate, and time.';
    return;
  }

  let interest = 0;
  let total = 0;

  if (interestType === 'Simple') {
    interest = (principal * rate * time) / 100;
  } else if (interestType === 'Compound') {
    const compoundInterest = principal * Math.pow((1 + rate / 100), time);
    interest = compoundInterest - principal;
  }
  total = principal + interest;

  const formattedPrincipal = principal.toLocaleString(numeralSystem);
  const formattedInterest = interest.toLocaleString(numeralSystem);
  const formattedTotal = total.toLocaleString(numeralSystem);

  const interestResultDiv = document.getElementById('interest-result');
  interestResultDiv.innerHTML = `
    <h4>${interestType} Interest: </h4>
    <p>${formattedInterest}</p>
    <h4>Total Value: </h4>
    <p>${formattedTotal}</p>
  `;
}

function updateInterestResult() {
  calculateInterest();
}

function calculateSIP() {
  const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
  const annualReturn = parseFloat(document.getElementById('annual-return').value);
  const sipPeriod = parseFloat(document.getElementById('sip-period').value);
  const numeralSystem = document.getElementById('numeral-system-sip').value;

  if (isNaN(monthlyInvestment) || isNaN(annualReturn) || isNaN(sipPeriod)) {
    const sipResultDiv = document.getElementById('sip-result');
    sipResultDiv.innerHTML = 'Please enter valid numbers for monthly investment, annual return, and SIP period.';
    return;
  }

  const monthlyRate = annualReturn / 12 / 100;
  const totalMonths = sipPeriod * 12;
  const investedAmount = monthlyInvestment * totalMonths;

  let futureValue = 0;

  for (let i = 0; i < totalMonths; i++) {
    futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
  }

  const estReturns = futureValue - investedAmount;

  const formattedInvestedAmount = investedAmount.toLocaleString(numeralSystem);
  const formattedEstReturns = estReturns.toLocaleString(numeralSystem);
  const formattedFutureValue = futureValue.toLocaleString(numeralSystem);

  const sipResultDiv = document.getElementById('sip-result');
  sipResultDiv.innerHTML = `
    <h4>Invested Amount :</h4>
    <p>${formattedInvestedAmount}</p>
    <h4>Estimated Returns :</h4>
    <p>${formattedEstReturns}</p>
    <h4>Future Value of SIP:</h4>
    <p>${formattedFutureValue}</p>
  `;
}

function updateSIPResult() {
  calculateSIP();
}

function calculateDateDifference() {
  const startDate = new Date(document.getElementById('start-date').value);
  const endDate = new Date(document.getElementById('end-date').value);
  const numeralSystem = document.getElementById('numeral-system-date-difference').value;

  if (isNaN(startDate) || isNaN(endDate)) {
    const dateDifferenceResultDiv = document.getElementById('date-difference-result');
    dateDifferenceResultDiv.innerHTML = 'Please enter valid dates.';
    return;
  }

  const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
  const yearsDifference = Math.abs(endDate.getFullYear() - startDate.getFullYear());
  const monthsDifference = Math.abs((endDate.getMonth() - startDate.getMonth()) + 12 * (endDate.getFullYear() - startDate.getFullYear()));
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const hoursDifference = Math.ceil(timeDifference / (1000 * 3600));
  const minutesDifference = Math.ceil(timeDifference / (1000 * 60));
  const secondsDifference = Math.ceil(timeDifference / 1000);

  const formattedYearsDifference = yearsDifference.toLocaleString(numeralSystem);
  const formattedMonthsDifference = monthsDifference.toLocaleString(numeralSystem);
  const formattedDaysDifference = daysDifference.toLocaleString(numeralSystem);
  const formattedHoursDifference = hoursDifference.toLocaleString(numeralSystem);
  const formattedMinutesDifference = minutesDifference.toLocaleString(numeralSystem);
  const formattedSecondsDifference = secondsDifference.toLocaleString(numeralSystem);

  const dateDifferenceResultDiv = document.getElementById('date-difference-result');
  dateDifferenceResultDiv.innerHTML = `
    <h2>Not including the end date</h2>
    <h4>Years Difference (Approx.) :</h4><p>${formattedYearsDifference} years</p>
    <h4>Months Difference (Approx.) :</h4><p>${formattedMonthsDifference} months</p>
    <h4>Days Difference :</h4><p>${formattedDaysDifference} days</p>
    <h4>Hours Difference :</h4><p>${formattedHoursDifference} hours</p>
    <h4>Minutes Difference :</h4><p>${formattedMinutesDifference} minutes</p>
    <h4>Seconds Difference :</h4><p>${formattedSecondsDifference} seconds</p>
  `;
}

function updateDateDifferenceResult() {
  calculateDateDifference();
}

function convertNumber() {
  const numberInput = document.getElementById('number').value;
  const fromRadix = parseInt(document.getElementById('from-radix').value, 10);

  if (isNaN(fromRadix)) {
    document.getElementById('result').innerHTML = 'Please select valid radix values.';
    return;
  }

  try {
    const decimalNumber = parseInt(numberInput, fromRadix);
    const binaryNumber = decimalNumber.toString(2).toUpperCase();
    const octalNumber = decimalNumber.toString(8).toUpperCase();
    const decimalNumberStr = decimalNumber.toString(10);
    const hexadecimalNumber = decimalNumber.toString(16).toUpperCase();

    const resultHtml = `
      <h4>Binary:</h4>
      <p>${binaryNumber}</p>
      <h4>Octal:</h4>
      <p>${octalNumber}</p>
      <h4>Decimal:</h4>
      <p>${decimalNumberStr}</p>
      <h4>Hexadecimal:</h4>
      <p>${hexadecimalNumber}</p>
    `;

    document.getElementById('result').innerHTML = resultHtml;
  } catch (error) {
    document.getElementById('result').innerHTML = 'Error converting the number.';
  }
}

function calculatePercentage() {
  const originalValue = parseFloat(document.getElementById('original-value').value);
  const percentage = parseFloat(document.getElementById('percentage').value);

  if (isNaN(originalValue) || isNaN(percentage)) {
    const percentageResultDiv = document.getElementById('percentage-result');
    percentageResultDiv.innerHTML = 'Please enter valid numbers for original value and percentage.';
    return;
  }

  const calculatedPercentage = (percentage / 100) * originalValue;
  const totalValue = originalValue + calculatedPercentage;

  const formattedCalculatedPercentage = calculatedPercentage.toLocaleString();
  const formattedTotalValue = totalValue.toLocaleString();

  const percentageResultDiv = document.getElementById('percentage-result');
  percentageResultDiv.innerHTML = `
    <h4>Calculated Percentage:</h4>
    <p>${formattedCalculatedPercentage}</p>
    <h4>Total Value:</h4>
    <p>${formattedTotalValue}</p>
  `;
}

function updatePercentageResult() {
  calculatePercentage();
}

function calculateFuelConsumption() {
  const distance = parseFloat(document.getElementById('distance').value);
  const fuelConsumed = parseFloat(document.getElementById('fuel').value);

  if (isNaN(distance) || isNaN(fuelConsumed)) {
    const fuelConsumptionResultDiv = document.getElementById('fuel-consumption-result');
    fuelConsumptionResultDiv.innerHTML = 'Please enter valid numbers for distance and fuel consumed.';
    return;
  }

  const consumptionPerKilometer = fuelConsumed / distance;

  const formattedConsumptionPerKilometer = consumptionPerKilometer.toFixed(2);

  const fuelConsumptionResultDiv = document.getElementById('fuel-consumption-result');
  fuelConsumptionResultDiv.innerHTML = `
    <h4>Fuel Consumption per Kilometer:</h4>
    <p>${formattedConsumptionPerKilometer} liters</p>
  `;
}

function updateFuelConsumptionResult() {
  calculateFuelConsumption();
}

function addOptionsToSelect(selectElement, options) {
  for (const option of options) {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.text = option;
    selectElement.add(optionElement);
  }
}

function changeUnitCategory() {
  const unitCategory = document.getElementById('unit-category').value;
  const unitSelect = document.getElementById('unit');
  const units = getUnitsForCategory(unitCategory);
  const unitValueInput = document.getElementById('unit-value');
  unitSelect.innerHTML = '';
  unitValueInput.value = '';
  addOptionsToSelect(unitSelect, units);
}

function convertUnits() {
  const unitCategory = document.getElementById('unit-category').value;
  const fromUnit = document.getElementById('unit').value;
  const fromUnitValue = parseFloat(document.getElementById('unit-value').value);

  if (isNaN(fromUnitValue)) {
    const unitConverterResultDiv = document.getElementById('unit-converter-result');
    unitConverterResultDiv.innerHTML = 'Please enter a valid number for conversion.';
    return;
  }

  const results = convertUnit(fromUnitValue, fromUnit, unitCategory);

  const unitConverterResultDiv = document.getElementById('unit-converter-result');
  unitConverterResultDiv.innerHTML = `
      <h4>Conversion Results:</h4>
      ${Object.entries(results).map(([unit, value]) => `<p>${value.toLocaleString()} ${unit}</p>`).join('')}
  `;
}

function getUnitsForCategory(category) {
  switch (category) {
    case 'distance':
      return ['km', 'miles', 'meters', 'yards'];
    case 'time':
      return ['hours', 'minutes', 'seconds'];
    case 'speed':
      return ['km/h', 'miles/h', 'm/s'];
    case 'power':
      return ['watts', 'horsepower'];
    case 'length':
      return ['cm', 'inches', 'feet', 'meters'];
    case 'weight':
      return ['grams', 'ounces', 'pounds', 'kg'];
    default:
      return [];
  }
}

function getConversionFactors(unitCategory) {
  switch (unitCategory) {
    case 'distance':
      return {
        'km': 1,
        'miles': 0.621371,
        'meters': 1000,
        'yards': 1094
      };
    case 'time':
      return {
        'hours': 1,
        'minutes': 60,
        'seconds': 3600
      };
    case 'speed':
      return {
        'km/h': 1,
        'miles/h': 0.621371,
        'm/s': 0.277778
      };
    case 'power':
      return {
        'watts': 1,
        'horsepower': 0.00134102
      };
    case 'length':
      return {
        'cm': 100,
        'inches': 39.3701,
        'feet': 3.28084,
        'meters': 1
      };
    case 'weight':
      return {
        'grams': 1000,
        'ounces': 35.27396,
        'pounds': 2.20462,
        'kg': 1
      };
    default:
      return {};
  }
}

function convertUnit(value, fromUnit, toUnitCategory) {
  const conversionFactors = getConversionFactors(toUnitCategory);

  if (!(fromUnit in conversionFactors)) {
    return 'Invalid fromUnit';
  }

  const fromFactor = conversionFactors[fromUnit];
  const results = {};

  for (const [unit, toFactor] of Object.entries(conversionFactors)) {
    results[unit] = value * (toFactor / fromFactor);
  }

  return results;
}

function calculateMortgage() {
  const loanAmount = parseFloat(document.getElementById('loan-amount').value);
  const interestRate = parseFloat(document.getElementById('interest-rate').value);
  const loanTerm = parseFloat(document.getElementById('loan-term').value);
  const numeralSystem = document.getElementById('numeral-system').value;

  if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
    document.getElementById('mortgage-result').innerHTML = 'Please enter valid numbers.';
    return;
  }

  const monthlyInterest = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPayment = (loanAmount * monthlyInterest) /
    (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  const formattedMonthlyPayment = formatNumber(monthlyPayment, numeralSystem);
  const formattedTotalPayment = formatNumber(totalPayment, numeralSystem);
  const formattedTotalInterest = formatNumber(totalInterest, numeralSystem);

  document.getElementById('mortgage-result').innerHTML = `
    <h4>Mortgage Calculation Results:</h4>
    <p>Monthly Payment: ${formattedMonthlyPayment}</p>
    <p>Total Payment: ${formattedTotalPayment}</p>
    <p>Total Interest: ${formattedTotalInterest}</p>
  `;
}

function formatNumber(number, numeralSystem) {
  if (numeralSystem === 'indian') {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(number);
  } else {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(number);
  }
}

// Geometry Calculator Functions
function changeShapeType() {
  const shapeType = document.getElementById('shape-type').value;
  const geometryInputsDiv = document.getElementById('geometry-inputs');
  geometryInputsDiv.innerHTML = '';

  switch (shapeType) {
    case 'square':
      geometryInputsDiv.innerHTML = `
        <label for="side">Enter Side:</label>
        <input type="text" id="side" placeholder="Enter Side">
      `;
      break;
    case 'rectangle':
      geometryInputsDiv.innerHTML = `
        <label for="length">Enter Length:</label>
        <input type="text" id="length" placeholder="Enter length">
        <label for="width">Enter Breadth/Width:</label>
        <input type="text" id="width" placeholder="Enter width">
      `;
      break;
    case 'triangle':
      geometryInputsDiv.innerHTML = `
        <label for="side1">Enter Side 1:</label>
        <input type="text" id="side1" placeholder="Enter side 1">
        <label for="side2">Enter Side 2:</label>
        <input type="text" id="side2" placeholder="Enter side 2">
        <label for="side3">Enter Side 3:</label>
        <input type="text" id="side3" placeholder="Enter side 3">
      `;
      break;
    case 'circle':
      geometryInputsDiv.innerHTML = `
        <label for="radius">Enter Radius:</label>
        <input type="text" id="radius" placeholder="Enter radius">
      `;
      break;
    case 'cuboid':
      geometryInputsDiv.innerHTML = `
        <label for="length-cuboid">Enter Length:</label>
        <input type="text" id="length-cuboid" placeholder="Enter Length">
        <label for="breadth-cuboid">Enter Breadth/Width:</label>
        <input type="text" id="breadth-cuboid" placeholder="Enter breadth">
        <label for="height-cuboid">Enter Height:</label>
        <input type="text" id="height-cuboid" placeholder="Enter height">
      `;
      break;
    case 'cube':
      geometryInputsDiv.innerHTML = `
        <label for="side-cube">Enter Side:</label>
        <input type="text" id="side-cube" placeholder="Enter side">
      `;
      break;
    case 'sphere':
      geometryInputsDiv.innerHTML = `
        <label for="radius-sphere">Enter Radius:</label>
        <input type="text" id="radius-sphere" placeholder="Enter radius">
      `;
      break;
    case 'cylinder':
      geometryInputsDiv.innerHTML = `
        <label for="radius-cylinder">Enter Radius:</label>
        <input type="text" id="radius-cylinder" placeholder="Enter radius">
        <label for="height-cylinder">Enter Height:</label>
        <input type="text" id="height-cylinder" placeholder="Enter height">
      `;
      break;
    case 'cone':
      geometryInputsDiv.innerHTML = `
        <label for="radius-cone">Enter radius:</label>
        <input type="text" id="radius-cone" placeholder="Enter radius">
        <label for="height-cone">Enter Height:</label>
        <input type="text" id="height-cone" placeholder="Enter height">
      `;
      break;
    default:
      break;
  }
}

function calculateGeometry() {
  const shapeType = document.getElementById('shape-type').value;
  const geometryResultDiv = document.getElementById('geometry-result');
  const geometryInputsDiv = document.getElementById('geometry-inputs');
  const inputs = geometryInputsDiv.querySelectorAll('input');
  let isValid = true;

  const values = Array.from(inputs).map(input => {
    const value = parseFloat(input.value);
    if (isNaN(value)) {
      isValid = false;
    }
    return value;
  });

  if (!isValid) {
    geometryResultDiv.innerHTML = 'Please enter valid numbers for calculations.';
    return;
  }

  let result;

  switch (shapeType) {
    case 'square':
      result = calculateSquare(values[0]);
      break;
    case 'rectangle':
      result = calculateRectangle(values[0], values[1]);
      break;
    case 'triangle':
      result = calculateTriangle(values[0], values[1], values[2]);
      break;
    case 'circle':
      result = calculateCircle(values[0]);
      break;
    
    case 'cube':
      result = calculateCube(values[0]);
      break;
    case 'cuboid':
      result = calculateCuboid(values[0],values[1],values[2]);
      break;
    case 'sphere':
      result = calculateSphere(values[0]);
      break;
    case 'cylinder':
      result = calculateCylinder(values[0], values[1]);
      break;
    case 'cone':
      result = calculateCone(values[0], values[1]);
      break;
    default:
      break;
  }

  geometryResultDiv.innerHTML = `
    <h4>Geometry Calculation Results:</h4>
    <p>${result}</p>
  `;
}

function calculateSquare(side) {
  const perimeter = 4 * side;
  const area = side * side;
  return `Perimeter : ${formatNumber(perimeter)} units <br> Area : ${formatNumber(area)} square units`;
}

function calculateCircle(radius) {
  const perimeter = 2 * Math.PI * radius;
  const area = Math.PI * Math.pow(radius, 2);
  return `Perimeter : ${formatNumber(perimeter)} units <br> Area : ${formatNumber(area)} square units`;
}

function calculateRectangle(length, width) {
  const perimeter = 2 * (length + width);
  const area = length * width;
  return `Perimeter : ${formatNumber(perimeter)} units <br> Area : ${formatNumber(area)} square units`;
}

function calculateTriangle(side1, side2, side3) {
  const s = (side1 + side2 + side3) / 2;
  const perimeter = 2 * s;
  const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
  return `Perimeter : ${formatNumber(perimeter)} units <br> Area : ${formatNumber(area)} square units`;
}

function calculateCuboid(length, width, height) {
  const lsa = 2 * height * (length + width);
  const tsa = 2 * ((length * width) + (length * height) + (height * width));
  const volume = length * width * height;
  return `
  Lateral Surface Area :  ${formatNumber(lsa)} square units<br>
  Total Surface Area :  ${formatNumber(tsa)} square units<br>
  Volume : ${formatNumber(volume)} cubic units`;
}

function calculateCube(side) {
  const lsa = 4 * (Math.pow(side, 2)); 
  const tsa = 6 * (Math.pow(side, 2));
  const volume = Math.pow(side, 3);
  return `
  Lateral Surface Area :  ${formatNumber(lsa)} square units<br>
  Total Surface Area :  ${formatNumber(tsa)} square units<br>
  Volume : ${formatNumber(volume)} cubic units`;
}

function calculateSphere(radius) {
  const csa = 4 * Math.PI * Math.pow(radius, 2);
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  return  `
  Curved Surface Area :  ${formatNumber(csa)} square units<br>
  Total Surface Area :  ${formatNumber(csa)} square units<br>
  Volume : ${formatNumber(volume)} cubic units`;
}

function calculateCylinder(radius, height) {
  const csa = 2 * Math.PI * radius * height;
  const tsa = 2 * Math.PI * radius * (radius + height);
  const volume = Math.PI * Math.pow(radius, 2) * height;
  return `
  Curved Surface Area :  ${formatNumber(csa)} square units<br>
  Total Surface Area :  ${formatNumber(tsa)} square units<br>
  Volume : ${formatNumber(volume)} cubic units`;
}

function calculateCone(radius, height) {
  const length = Math.sqrt((Math.pow(radius, 2)) + (Math.pow(height, 2)));
  const csa = Math.PI * radius * length;
  const tsa = Math.PI * radius * (radius + length);
  const volume = (1 / 3) * Math.PI * (Math.pow(radius, 2)) * height;
  return `
  Slant Length/Height : ${formatNumber(length)} units<br> 
  Curved Surface Area : ${formatNumber(csa)} square units<br>
  Total Surface Area : ${formatNumber(tsa)} square units<br>
  Volume : ${formatNumber(volume)} cubic units`;
}

function formatNumber(number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(number);
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const mHeight = height/39.3701;
  if (!isNaN(weight) && !isNaN(mHeight) && mHeight > 0) {
    const bmi = weight / Math.pow(mHeight, 2);
    document.getElementById('bmi-result').innerHTML = `<h4>BMI: </h4>${bmi.toFixed(2)}`;
  } else {
    document.getElementById('bmi-result').innerHTML = 'Please enter valid values for weight and height.';
  }
}
