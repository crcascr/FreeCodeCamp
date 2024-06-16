const form = document.getElementById("form");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");
const numberInput = document.getElementById("number");

const decimalToRoman = (number) => {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let result = "";

  romanNumerals.forEach((romanNumeral) => {
    while (number >= romanNumeral[1]) {
      result += romanNumeral[0];
      number -= romanNumeral[1];
    }
  });
  return result;
};

const updateInterface = () => {
  output.classList.remove("hidden");
  const numberStr = numberInput.value;
  const number = parseInt(numberStr, 10);
  if (checkValidity(number)) {
    output.innerText = decimalToRoman(number);
  }
};

convertButton.addEventListener("click", updateInterface);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateInterface();
});

const checkValidity = (number) => {
  let errorText = "";
  if (isNaN(number)) {
    errorText = "Please enter a valid number";
  } else if (number < 1) {
    errorText = "Please enter a number greater than or equal to 1";
  } else if (number > 3999) {
    errorText = "Please enter a number less than or equal to 3999";
  } else {
    return true;
  }

  output.innerText = errorText;
  output.classList.add("alert");
  return false;
};
