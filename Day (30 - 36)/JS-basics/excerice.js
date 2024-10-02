let course_name = "Full Stack Development";
let fee = 800;
let goals = ["Front-end", "APIs", "Back-end"];
alert(course_name + " course\nFee of " + fee + "Rs." + "\nMy goals are: " + goals);

let career = {
  course_name: "Full Stack Development",
  fee: 800,
  goals: ["Front-end", "APIs", "Back-end"],
};

alert(career.goals[1]);

function accessListItems(main_goals) {
  return main_goals;
}

alert(accessListItems(goals[0]));
