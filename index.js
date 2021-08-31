const url = 'https://api.fastforex.io';
const api_key = 'a2899aa92f-81d85e33bf-qyphb4';
const options = {method: 'GET', headers: {Accept: 'application/json'}};

const convertButton = document.getElementById('convertButton')
const toggleButton = document.getElementById('toggleButton')
const fromCurrency = document.getElementById('currencyFrom')
const toCurrency = document.getElementById('currencyTo')
const input = document.getElementById('currencyAmount')
const resultField = document.getElementById('result')

function convertCurrency() {
    let currencyAmount = input.value;

    // validate input
    if (Number(currencyAmount)) {
        let fromCurrencyCode = fromCurrency.value;
        let toCurrencyCode = toCurrency.value;

        // convert the from currency to USD
		if (fromCurrencyCode !== 'USD') {
            fetch(`${url}/convert?to=${fromCurrencyCode}&amount=${currencyAmount}&api_key=${api_key}`, options)
            .then(response => response.json())
            .then(response => {
                let convertedUsdAmount = (1 / response.result.rate) * currencyAmount
                
                // if to currency is not USD...convert to USD
                if (toCurrencyCode !== 'USD') {
                    fetch(`${url}/convert?to=${toCurrencyCode}&amount=${convertedUsdAmount}&api_key=${api_key}`, options)
                    .then(response => response.json())
                    .then(response => {
                        let result = response.result[toCurrencyCode].toFixed(2)
                        resultField.innerHTML = result
                    })
                } else {
                    // if to currency is USD...do not convert
                    let result = convertedUsdAmount.toFixed(2)
                    resultField.innerHTML = result
                }
            })
            .catch(err => console.error(err));
        } else {
            fetch(`${url}/convert?to=${toCurrencyCode}&amount=${currencyAmount}&api_key=${api_key}`, options)
            .then(response => response.json())
            .then(response => {
                let result = response.result[toCurrencyCode].toFixed(2)
                resultField.innerHTML = result
            })
        }

    } else {
        resultField.innerHTML = 'Please enter a valid amount'
    }
}


function populateSelectMenu() {

    fetch(`${url}/currencies?api_key=${api_key}`, options)
    .then(response => response.json())
    .then(response => {
        let currencies = response.currencies;
        if (currencies !== null) {
            for (let key in currencies) {
                const option1 = document.createElement('OPTION')
                option1.setAttribute('value', key)
                const option2 = document.createElement('OPTION')
                option2.setAttribute('value', key)
                const currencyCode1 = document.createTextNode(key)
                const currencyCode2 = document.createTextNode(key)
                option1.appendChild(currencyCode1)
                option2.appendChild(currencyCode2)
                fromCurrency.appendChild(option1);
			    toCurrency.appendChild(option2);
			    fromCurrency.value = 'USD';
			    toCurrency.value = 'NGN';
            }
        }
    })
    .catch(err => console.error(err));
}

populateSelectMenu()

// Event Listeners
convertButton.addEventListener('click', () => {
    convertCurrency()
})

fromCurrency.addEventListener('change', () => {
    convertCurrency()
})

toCurrency.addEventListener('change', () => {
    convertCurrency()
})

input.addEventListener('keyup', () => {
    convertCurrency()
})

toggleButton.addEventListener('click', () => {
    let formerFromCurrencyCode = fromCurrency.value;
    let formerToCurrencyCode = toCurrency.value;

    document.getElementById('currencyFrom').value = formerToCurrencyCode;
    document.getElementById('currencyTo').value = formerFromCurrencyCode;
    convertCurrency()
})