//api for currency change
// const api1 = "https://api.exchangerate-api.com/v4/latest/USD";
// const api2 = "https://openexchangerates.org/api/latest.json?app_id=387c41165d7f4a9ba65d224fb4b0b429";

// api key 387c41165d7f4a9ba65d224fb4b0b429


// declared variable
var respFrom;
var respTo;
var searchValue;

const fromSelect = document.getElementById("from");
fromSelect.addEventListener("change", () => {
     respFrom = fromSelect.options[fromSelect.selectedIndex].value;
});

const toSelect = document.getElementById("to");
toSelect.addEventListener("change", () => {
  respTo = toSelect.options[toSelect.selectedIndex].value;
});



const searchBox = document.querySelector(".searchBox");
searchBox.addEventListener("input", updateValue);

function updateValue(e) {
    searchValue = e.target.value;
}
  

const convert = document.getElementById("slide_from_left");
convert.addEventListener("click", getResults);


function getResults() {
    console.log(respFrom, respTo, searchValue);
    const options = { method: "GET", headers: { Accept: "application/json" } };
    fetch(
      `https://api.fastforex.io/convert?from=${respFrom}&to=${respTo}&amount=${searchValue}&api_key=c85531cf1c-e93b786ce2-qyo7zr`,
      options
    )
      .then((currency) => {
        const data = currency.json();
        return data;
      }) 
      .then(displayResults => {
        console.log(displayResults.result);
        const finalValue = document.querySelector("#outPut");
        var numberValue = ""
        if (finalValue) {
          numberValue = finalValue.innerHTML = displayResults.result[respTo].toFixed(2);
         }
      }); 
}
