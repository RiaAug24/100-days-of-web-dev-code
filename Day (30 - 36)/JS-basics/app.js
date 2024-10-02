let greeting_msg = "Hi, I'm Riyaz!";
let age = 19;
console.log(greeting_msg + "\nI'm " + age + " years old :).");

//Array eg:
let hobbies = ["Sports", "Coding", "Gaming"];
console.log("My hobbies are: " + hobbies + " :]");
console.log(hobbies.length);

//Objects in JS eg:
let job = {
  title: {
    engineer: ["sde", "web-dev", "app-dev"],
    doctor: "Dentist",
    civil: "DC Officer",
  },
  place: "New York",
  salary: 50000,
  skills : {
      FrontEnd : ["ReactJS", "NextJS", "Vite", "TypeScript", "ShadeCSN", "bootstrap"],
      VersionControl : "Git",
      BackEnd : "Python"
  }
};

console.log(job.skills.FrontEnd[2]);
job.salary += 10000;
console.log("I work as a " + job.title + " with the paid salary of $" + job.salary);

//functions eg:

function calcIncSalary() {
  job.salary += 10000;
  return job.salary;
}

// calcIncSalary();
console.log(
  "I work as a " + job.title + " with the paid salary of $" + calcIncSalary()
);

let totalAdultYears;

function calcAdultYears(userage) {
  return userage - 18;
}

totalAdultYears = calcAdultYears(age);

console.log(totalAdultYears);

let person = {
  name: "Riyaz",
  greet(name) {
    console.log("Hello! " + name);
  },
};

person.greet("Riyaz");
