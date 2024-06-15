const userInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultsDiv = document.getElementById("result");

const palindromeChecker = (input) => {
  const originalInput = input;

  if (input === "") {
    alert("Please input a value");
    return;
  }

  resultsDiv.replaceChildren();

  const lowerCaseInput = input.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();

  let resultMsg = `<strong>${originalInput}</strong> ${
    lowerCaseInput === [...lowerCaseInput].reverse().join("") ? "is" : "is not"
  } a palindrome.`;

  const pElement = document.createElement("p");
  pElement.className = "user-input";
  pElement.innerHTML = resultMsg;
  resultsDiv.appendChild(pElement);

  resultsDiv.classList.remove("hidden");
};

checkButton.addEventListener("click", () => {
  palindromeChecker(userInput.value);
  userInput.value = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    palindromeChecker(userInput.value);
    userInput.value = "";
  }
});
