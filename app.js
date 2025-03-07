const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

document
  .querySelector(".toHomeName-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (window.location.pathname === "/index.html") {
      document.querySelector(".main").scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "index.html#main"; // This navigates and scrolls to the correct section on projects.html
    }
  });

  document
  .querySelector(".toHome-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (window.location.pathname === "/index.html") {
      document.querySelector(".main").scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "index.html#main"; // This navigates and scrolls to the correct section on projects.html
    }
  });

document
  .querySelector(".toProjects-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (window.location.pathname === "/index.html") {
      document
        .querySelector(".services")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "index.html#services"; // This navigates and scrolls to the correct section on projects.html
    }
  });

// Smooth scrolling for buttons or other links to the Services section (by class name)
document
  .querySelector(".toProjects-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    if (window.location.pathname === "/index.html") {
      document
        .querySelector(".services")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "index.html#services"; // Same as above, but for button links
    }
  });

// Smooth scrolling for links to the CV section (by class name)
document
  .querySelector(".toCV-link")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    if (window.location.pathname === "/index.html") {
      document.querySelector(".CV").scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "index.html#CV"; // Redirect to CV page with a hash
    }
  });

// Smooth scroll after page load when URL has a hash (if the user navigated directly)
if (window.location.hash) {
  const section = document.querySelector(window.location.hash); // Get the section by hash
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
