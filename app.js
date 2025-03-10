const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

// Helper function to normalize the pathname
function normalizePathname(pathname) {
    if (pathname.endsWith("/index.html")) {
        return pathname.slice(0, -10); // Remove "index.html"
    }
    return pathname;
}

// Function to scroll to a section (if it exists)
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// Toggle mobile menu (This part stays the same)
menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});

// Event listener for navigation links (This part stays mostly the same)
function setupNavLink(selector) {
    const link = document.querySelector(selector);
    if (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetHref = this.getAttribute("href");
            const hashIndex = targetHref.indexOf("#");
            const targetHash = hashIndex !== -1 ? targetHref.substring(hashIndex) : "";

            if (normalizePathname(window.location.pathname) === normalizePathname(targetHref.split("#")[0]) ||
                normalizePathname(window.location.pathname) + "/" === normalizePathname(targetHref.split("#")[0])) {
                if (targetHash) {
                    scrollToSection(targetHash);
                }
            } else {
                window.location.href = targetHref;
            }
        });
    }
}

// Set up event listeners for all navigation links (This part stays the same)
setupNavLink(".toHomeName-link");
setupNavLink(".toHome-link");
setupNavLink(".toProjects-link");
setupNavLink(".toProjects-btn"); // Button
setupNavLink(".toCV-link");

// IMPORTANT: Wrap the initial hash check in DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.hash) {
        scrollToSection(window.location.hash);
    }
});