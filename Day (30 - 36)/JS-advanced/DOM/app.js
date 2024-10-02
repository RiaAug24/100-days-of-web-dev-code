// console.dir(document)

// let newAnchorElement = document.createElement("a");
// newAnchorElement.href = "https://www.youtube.com";
// newAnchorElement.textContent = "Youtube link";

// let firstPara = document.querySelector("p");
// firstPara.append(newAnchorElement);

// let mainheading = document.querySelector("h1");
// mainheading.remove();
// // mainheading.parentElement.removeChild(mainheading);//

// firstPara.parentElement.append(firstPara);

// let paraContainer = document.getElementById("para-2");

// paraContainer.innerHTML = `This is a paragraph. Click <a id="external-link" href="#">here</a><br>
//    Google site <a href="https://www.google.com">Google</a> `;

// let linkToWikiPedia = document.getElementById("external-link");
// linkToWikiPedia.href = "https://www.wikepedia.org";

let buttonElement = document.querySelector("button");

function changebuttonText() {
  buttonElement.textContent = "Clicked :)";
  console.log("Paragraph Clicked!");
}

buttonElement.addEventListener("click", changebuttonText);

let userInput = document.querySelector("input");

function retrieveUserInput(event) {
  // let enteredText = userInput.value;
  let enteredText = event.target.value;
  //let enteredText = event.data; => This is different!
  console.log(enteredText);
  // console.log(event);
}

userInput.addEventListener("input", retrieveUserInput);
let primaryButton = document.querySelector("button");
function changeBackgroundColor() {
  let bodyElement = primaryButton.parentElement;
    bodyElement.bgColor = 'Orange';
}

primaryButton.addEventListener("click", changeBackgroundColor);
