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

// Toggle mobile menu
menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});

// Event listener for navigation links
function setupNavLink(selector) {
    const link = document.querySelector(selector);
    if (link) {
        link.addEventListener("click", function (event) {

            const targetHref = this.getAttribute("href");

            // Check if targetHref is null or an external link
            if (!targetHref || targetHref.startsWith("http://") || targetHref.startsWith("https://")) {
                return; // Exit the function early:  Do nothing for external links or null href
            }
             event.preventDefault(); // Prevent default if is an internal link

            const hashIndex = targetHref.indexOf("#");
            const targetHash = hashIndex !== -1 ? targetHref.substring(hashIndex) : "";

            if (window.location.pathname.includes(targetHref.split("#")[0]) ||
                window.location.pathname + "/" === targetHref.split("#")[0]) { //Changed the condition to match all of the use cases.
                if (targetHash) {
                    scrollToSection(targetHash);
                }
            } else {
                window.location.href = targetHref;
            }
        });
    }
}

// Set up event listeners for all navigation links
setupNavLink(".toHomeName-link");
setupNavLink(".toHome-link");
setupNavLink(".toProjects-link");
setupNavLink(".toProjects-btn"); // Button
setupNavLink(".toCV-link");

// Scroll to the section on initial page load (if there's a hash)
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.hash) {
        scrollToSection(window.location.hash);
    }
});