// Set completed to true for each course you have personally completed.
const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: false },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: false },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: false },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: false },
  { subject: "CSE", number: 250, title: "Web Development", credits: 2, completed: false },
  { subject: "CSE", number: 212, title: "Programming with Data Structures", credits: 2, completed: false },
  { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false },
  { subject: "CSE", number: 230, title: "Web Backend Development", credits: 2, completed: false }
];

const courseList = document.querySelector("#courseList");
const creditsTotal = document.querySelector("#creditsTotal");
const filterButtons = document.querySelectorAll(".filter-button");

function displayCourses(filter = "ALL") {
  const visibleCourses = courses.filter(course => filter === "ALL" || course.subject === filter);
  courseList.innerHTML = "";

  visibleCourses.forEach(course => {
    const card = document.createElement("article");
    card.className = `course-card${course.completed ? " completed" : ""}`;

    const title = document.createElement("strong");
    title.textContent = `${course.subject} ${course.number}`;

    const description = document.createElement("small");
    description.textContent = `${course.title} • ${course.credits} credits${course.completed ? " • Completed" : ""}`;

    card.append(title, description);
    courseList.append(card);
  });

  const totalCredits = visibleCourses.reduce((total, course) => total + course.credits, 0);
  creditsTotal.textContent = `The total credits for courses listed above is ${totalCredits}.`;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    displayCourses(button.dataset.filter);
  });
});

displayCourses();
