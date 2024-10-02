const userInputText = document.getElementById("feedback-form");

const remainingCharsElement = document.getElementById("remaining-characters");

let maxAllowedChars = userInputText.maxLength;

userInputText.addEventListener("input", (e) => {
  const enteredText = e.target.value;
  const enteredTextLength = enteredText.length;
  const remainingChars = maxAllowedChars - enteredTextLength;

  remainingCharsElement.textContent = remainingChars;

  if (remainingChars === 0) {
    userInputText.classList.add("error");
    remainingCharsElement.classList.add("error");
  } else if (remainingChars <= 10) {
    userInputText.classList.add("warning");
    remainingCharsElement.classList.add("warning");
    userInputText.classList.remove("error");
    remainingCharsElement.classList.remove("error");
  } else {
    userInputText.classList.remove("warning");
    remainingCharsElement.classList.remove("warning");
  }
});

