// Add an event listener for input events to handle both credit hour and mark input
document
  .querySelector(".container")
  .addEventListener("input", function (event) {
    if (event.target.classList.contains("mark")) {
      grader(event);
    }
  });

function grader(event) {
  let mark = event.target;
  let markValue = Number(mark.value);
  let grade = mark.parentElement.querySelector(".grade");
  let gradeValue = 0;

  grade.classList.remove("excellent", "good", "bad");

  if (markValue >= 90 && markValue <= 100) {
    grade.textContent = "A+";
    gradeValue = 4;
    grade.classList.add("excellent");
  } else if (markValue >= 85 && markValue < 90) {
    grade.textContent = "A";
    gradeValue = 4;
    grade.classList.add("excellent");
  } else if (markValue >= 80 && markValue < 85) {
    grade.textContent = "A-";
    gradeValue = 3.75;
    grade.classList.add("excellent");
  } else if (markValue >= 75 && markValue < 80) {
    grade.textContent = "B+";
    gradeValue = 3.5;
    grade.classList.add("excellent");
  } else if (markValue >= 70 && markValue < 75) {
    grade.textContent = "B";
    gradeValue = 3;
    grade.classList.add("good");
  } else if (markValue >= 65 && markValue < 70) {
    grade.textContent = "B-";
    gradeValue = 2.75;
    grade.classList.add("good");
  } else if (markValue >= 60 && markValue < 65) {
    grade.textContent = "C+";
    gradeValue = 2.5;
    grade.classList.add("good");
  } else if (markValue >= 50 && markValue < 60) {
    grade.textContent = "C";
    gradeValue = 2;
    grade.classList.add("good");
  } else if (markValue >= 45 && markValue < 50) {
    grade.textContent = "C-";
    gradeValue = 1.75;
    grade.classList.add("bad");
  } else if (markValue >= 40 && markValue < 45) {
    grade.textContent = "D";
    gradeValue = 1;
    grade.classList.add("bad");
  } else if (markValue >= 35 && markValue < 40) {
    grade.textContent = "Fx";
    gradeValue = 0;
    grade.classList.add("bad");
  } else if (markValue >= 0 && markValue < 35) {
    grade.textContent = "F";
    gradeValue = 0;
    grade.classList.add("bad");
  } else {
    grade.textContent = "";
  }

  mark.parentElement?.setAttribute("data-grade-value", gradeValue);
}

let container = document.querySelector(".container");
let gpaDisplay = document.querySelector(".gpaDisplay");
let resetBtn = document.querySelector(".bx-revision");
let btn = document.querySelector(".btn");
let courseCount = 1;

function newCourse() {
  courseCount++;
  let newCourseHTML = `
    <section class="course">
      <span class="courseName">Course ${courseCount}</span>
      <section class="courseContainer" data-gradeValue="0">
        <input
          type="text"
          class="creditHour"
          placeholder="Credit Hour"
        />
        <input
          type="text"
          class="mark"
          placeholder="Mark from 100"
          oninput="grader(event)"
        />
        <div class="grade"></div>
      </section>
    </section>`;

  if (courseCount <= 15) {
    container.insertAdjacentHTML("beforeend", newCourseHTML);
  } else {
    alert("Learning more than 15 courses at once is Crazy 💀");
  }
}

function evaluateX() {
  let courses = document.querySelectorAll(".courseContainer");

  let nominator = 0;
  let denominator = 0;

  courses.forEach((course) => {
    let markInput = course.querySelector(".mark");
    let creditInput = course.querySelector(".creditHour");

    let gradeValue = Number(course.dataset.gradeValue);
    let creditValue = Number(creditInput.value);

    if (!isNaN(gradeValue) && !isNaN(creditValue) && creditValue > 0) {
      nominator += gradeValue * creditValue;
      denominator += creditValue;
    }
  });

  let gpa = denominator === 0 ? "NG" : (nominator / denominator).toFixed(2);
  document.querySelector(".gpa").textContent = gpa;

  container.classList.add("hide");
  gpaDisplay.classList.add("show");
  resetBtn.classList.add("show");
  btn.classList.add("none");

  if (gpa >= 3.5) {
    gpaDisplay.classList.add("excellent");
  } else if (gpa >= 2.7) {
    gpaDisplay.classList.add("good");
  } else if (gpa <= 2.7) {
    gpaDisplay.classList.add("bad");
  } else {
    gpaDisplay.classList.remove("excellent", "good", "bad");
  }
}

function resetProcess() {
  gpaDisplay.classList.remove("excellent", "good", "bad");

  container.classList.remove("hide");
  gpaDisplay.classList.remove("show");
  resetBtn.classList.remove("show");
  btn.classList.remove("none");
}
