// Selectors
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const fromAmount = document.getElementById('from-amount');
const toAmount = document.getElementById('to-amount');
const fromLabel = document.getElementById('from-label');
const toLabel = document.getElementById('to-label');

// Currency dropdown menues getters and setters
function getSelectedFromCurrency() {
  return fromCurrency.options[fromCurrency.selectedIndex].text;
}

function getSelectedToCurrency() {
  return toCurrency.options[toCurrency.selectedIndex].text;
}

// Select currency
function selectFromCurrency(id) {
  console.log(fromCurrency.options);
  Array.from(fromCurrency.options).find(
    currency => currency.value === id
  ).selected = true;
}

function selectToCurrency(id) {
  Array.from(toCurrency.options).find(
    currency => currency.value === id
  ).selected = true;
}

// Calculate
function convert(from, to, value, rates) {
  if (from === 'USD') {
    const rate = rates.find(rate => rate.id === to).value;

    return value * rate;
  } else if (to === 'USD') {
    const rate = rates.find(rate => rate.id === from).value;

    return value / rate;
  } else {
    const fromRate = rates.find(rate => rate.id === from).value;
    const toRate = rates.find(rate => rate.id === to).value;
    const normalizedValue = value / fromRate;

    return normalizedValue * toRate;
  }
}

// Populate currency options
function populate(rates) {
  rates.forEach(rate => {
    const option = document.createElement('option');

    option.value = rate.id;
    option.textContent = rate.name;

    fromCurrency.appendChild(option);
    toCurrency.appendChild(option.cloneNode(true));
  });

  return rates;
}

// Load sample data
function loadExample(rates) {
  const audRate = rates.find(rate => rate.id === 'AUD');
  const result = Number(audRate.value);

  fromAmount.value = 1;
  toAmount.value = result;

  selectFromCurrency('USD');
  selectToCurrency('AUD');

  fromLabel.textContent = `${fromAmount.value} ${getSelectedFromCurrency()}`;
  toLabel.textContent = `${result} ${getSelectedToCurrency()}`;
}

// Rates data
fetch('data.json')
  .then(response => response.json())
  .then(populate)
  .then(loadExample);
