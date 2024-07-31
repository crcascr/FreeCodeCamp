const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const currentRound = document.getElementById("current-round");
const currentRoundRolls = document.getElementById("current-round-rolls");
const totalScore = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesBtn = document.getElementById("rules-btn");
const rulesContainer = document.querySelector(".rules-container");

let isModalShowing = false;
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let total = 0;
let round = 1;

const rollDice = () => {
  diceValuesArr = [];

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  }

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

const updateStats = () => {
  currentRound.textContent = round;
  currentRoundRolls.textContent = rolls;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScore.textContent = score;

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

const getHighestDuplicates = (arr) => {
  const counts = {};

  for (const num of arr) {
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }

  let highestCount = 0;

  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }

  const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice);
  }

  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice);
  }

  updateRadioOption(5, 0);
};

const detectFullHouse = (arr) => {
  const counts = {};
  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  const hasThreeOfAKind = Object.values(counts).includes(3);
  const hasPair = Object.values(counts).includes(2);

  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25);
  }

  updateRadioOption(5, 0);
};

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.value = 0;
    input.checked = false;
  });

  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

const resetGame = () => {
  listOfAllDice.forEach((dice) => {
    dice.textContent = 0;
  });

  resetRadioOptions();
  score = 0;
  total = 0;
  round = 1;
  rolls = 0;
  scoreHistory.innerHTML = "";
  updateStats();
};

const checkForStraights = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  let numberOfConsecutive = 1;
  let fourConsecutive = false;
  let fiveConsecutive = false;
  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i] + 1 === sortedArr[i + 1]) {
      numberOfConsecutive++;
    }
  }
  if (numberOfConsecutive === 4) {
    fourConsecutive = true;
  }
  if (numberOfConsecutive === 5) {
    fourConsecutive = true;
    fiveConsecutive = true;
  }

  if (fourConsecutive) {
    updateRadioOption(3, 30);
  }
  if (fiveConsecutive) {
    updateRadioOption(4, 40);
  }

  if (!fourConsecutive && !fiveConsecutive) {
    updateRadioOption(5, 0);
  }
};

rollDiceBtn.addEventListener("click", () => {
  resetRadioOptions();
  if (rolls >= 3) {
    alert("You can only roll 3 times!");
  } else {
    rolls++;
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
  }
});

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  rulesContainer.style.display = isModalShowing ? "block" : "none";
  rulesBtn.textContent = isModalShowing ? "Hide rules" : "Show rules";
});

keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }

  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);

    if (round > 6) {
      setTimeout(() => {
        alert(`Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("Please select an option or roll the dice");
  }
});
