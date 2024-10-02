//First Example

let addBtn = document.getElementById("computeBtn");
let inputBox = document.getElementById("user-number");
let displayResult = document.getElementById("calculated-sum");
addBtn.addEventListener("click", () => {
  let sum = 0;
  if (inputBox.value < 0) {
    for (let i = 0; i >= inputBox.value; i--) {
      sum += i;
    }
  } else {
    for (let i = 0; i <= inputBox.value; i++) {
      sum += i;
    }
  }
  displayResult.style.display = "block";
  displayResult.innerText = sum;
});

//Highlight Links

const highlightLinksBtn = document.querySelector("#highlight-links button");

highlightLinksBtn.addEventListener("click", () => {
  const anchorElements = document.querySelectorAll("#highlight-links a");
  for (const anchor of anchorElements) {
    anchor.classList.add("highlight");
  }
});

//Display User-Data

const dummyUserData = {
  FirstName: "Riyaz",
  LastName: "Ahmed",
  Age: 19,
  Role: "Student",
};

const displayUserDataBtn = document.querySelector("#user-data button");
const displayDataTab = document.getElementById("output-user-data");
displayUserDataBtn.addEventListener("click", () => {
  displayDataTab.innerHTML = null;
  for (const key in dummyUserData) {
    const userDataInfo = document.createElement("li");
    const outputData = key.toUpperCase() + " : " + dummyUserData[key];
    userDataInfo.textContent = outputData;
    displayDataTab.append(userDataInfo);
  }
});

//Statistics || Role the dice

const rollDiceBtn = document.querySelector("#statistics button");
const targetElement = document.getElementById("user-target-number");

function rollDice() {
  return Math.floor(Math.random() * 6 + 1);
}

const diceRollListElement= document.getElementById('dice-rolls');
const outputTotalRolls = document.getElementById('output-total-rolls');
const outputTargetNumber = document.getElementById('output-target-number');

function getStatistics() {
  diceRollListElement.innerHTML = null;
  let count = 0;
  const targetNo = targetElement.value;
  if(targetNo == '') {
    alert("You didn't provide any input to the dice number!");
    return;
  }
    let hasRolledNo = false;
    while (!(hasRolledNo)) {
      const rolledNo = rollDice();
        count++;
        const diceListItemElement = document.createElement('li');
        diceListItemElement.textContent = 'Roll ' +count+ ' : ' + rolledNo;
        diceRollListElement.append(diceListItemElement);
        hasRolledNo = targetNo == rolledNo;
    }
    outputTargetNumber.textContent = targetNo;
    outputTotalRolls.textContent = count;
}

rollDiceBtn.addEventListener('click', getStatistics);
