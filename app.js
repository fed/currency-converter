// Conversion rates
let rates = [];

// Selectors
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const fromAmount = document.getElementById('from-amount');
const toAmount = document.getElementById('to-amount');
const fromLabel = document.getElementById('from-label');
const toLabel = document.getElementById('to-label');

// Getters and setters
function getFromCurrency() {
  return fromCurrency.options[fromCurrency.selectedIndex].text;
}

function getToCurrency() {
  return toCurrency.options[toCurrency.selectedIndex].text;
}

function getFromCurrencyCode() {
  return fromCurrency.options[fromCurrency.selectedIndex].value;
}

function getToCurrencyCode() {
  return toCurrency.options[toCurrency.selectedIndex].value;
}

function setFromCurrency(currencyCode) {
  Array.from(fromCurrency.options).find(
    currency => currency.value === currencyCode
  ).selected = true;
}

function setToCurrency(currencyCode) {
  Array.from(toCurrency.options).find(
    currency => currency.value === currencyCode
  ).selected = true;
}

function getFromAmount() {
  return Number(fromAmount.value);
}

function getToAmount() {
  return Number(toAmount.value);
}

// Update labels
function updateLabels() {
  fromLabel.textContent = `${getFromAmount()} ${getFromCurrency()}`;
  toLabel.textContent = `${getToAmount()} ${getToCurrency()}`;
}

// Conversions
function calculateToAmount(from, to, amount) {
  const fromRate = rates.find(rate => rate.id === from).value;
  const toRate = rates.find(rate => rate.id === to).value;
  const normalizedAmount = amount / fromRate;

  return parseFloat(normalizedAmount * toRate).toFixed(2);
}

function calculateFromAmount(from, to, amount) {
  const fromRate = rates.find(rate => rate.id === from).value;
  const toRate = rates.find(rate => rate.id === to).value;
  const normalizedAmount = amount * fromRate;

  return parseFloat(normalizedAmount / toRate).toFixed(2);
}

// Update amounts based on calculations
function updateFromAmount() {
  const result = calculateFromAmount(
    getFromCurrencyCode(),
    getToCurrencyCode(),
    getToAmount()
  );

  fromAmount.value = result;
}

function updateToAmount() {
  const result = calculateToAmount(
    getFromCurrencyCode(),
    getToCurrencyCode(),
    getFromAmount()
  );

  toAmount.value = result;
}

// Populate currency options based on json file
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
  const audRate = Number(rates.find(rate => rate.id === 'AUD').value);

  fromAmount.value = 1;
  toAmount.value = audRate;

  setFromCurrency('USD');
  setToCurrency('AUD');

  updateLabels();
}

// Bind events
fromAmount.addEventListener('input', () => {
  updateToAmount();
  updateLabels();
});

toAmount.addEventListener('input', () => {
  updateFromAmount();
  updateLabels();
});

fromCurrency.addEventListener('change', () => {
  updateToAmount();
  updateLabels();
});

toCurrency.addEventListener('change', () => {
  updateToAmount();
  updateLabels();
});

// Cache conversion rates
function cacheRates(data) {
  rates = data;

  return data;
}

// Bootstrap app
fetch('data.json')
  .then(response => response.json())
  .then(cacheRates)
  .then(populate)
  .then(loadExample);
