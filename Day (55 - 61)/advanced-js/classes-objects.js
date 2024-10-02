class Job {
  constructor(jobTitle, workPlace, curSalary) {
    // To construct objects or instances.
    this.title = jobTitle;
    this.place = workPlace;
    this.salary = curSalary; // here 'this' -> refers to the object initialized by this class
  }

  moreJobInfo() {
    console.log(
      `I'm a ${this.title}, I work in ${this.place} and I earn yearly upto \$${this.salary}.`
    );
  }
}

//initialize a object for class Job
const dev = new Job("Web Developer", "Tampa, Florida", 50000);
const cook = new Job("Chef", "Mumbai, India", 5000);
console.log(dev);
console.log(cook);

dev.moreJobInfo();
