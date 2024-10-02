function greetUser(greetingPrefix = "Hello", userName = "user") {
  //   console.log(greetingPrefix + ' ' +userName + '!');
  console.log(`${greetingPrefix} ${userName}!`);
}

greetUser(undefined, "Riyaz");
greetUser("Hey");
greetUser("Hi", "Riyaz");

// function SumUp(num1, num2, num3) {
//     return num1 + num2 + num3;
// } no flexibility

//To be able to sum n elements
 
function SumUp(...nums) { //here ... acts as a rest parameter
  let result = 0;

  for (const num of nums) {
    result += num;
  }

  return result;
}

let inputNums = [9, 1, 67, 43, 21];

console.log(SumUp(8, 17, 89));
console.log(SumUp(...inputNums)); //... acts as a spread operator

// console.log(SumUp)
