const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

// Helper function to normalize the pathname
function normalizePathname(pathname) {
    console.log("normalizePathname called with:", pathname); // Log input
    if (pathname.endsWith("/index.html")) {
        let result = pathname.slice(0, -10); // Remove "index.html"
        console.log("normalizePathname returning:", result); // Log output
        return result;
    }
    console.log("normalizePathname returning:", pathname); // Log output
    return pathname;
}

// Function to scroll to a section (if it exists)
function scrollToSection(sectionId) {
    console.log("scrollToSection called with:", sectionId); // Log input
    const section = document.querySelector(sectionId);
    if (section) {
        console.log("scrollToSection: Section found:", section); // Log if found
        section.scrollIntoView({ behavior: "smooth" });
    } else {
        console.log("scrollToSection: Section NOT found:", sectionId); // Log if not found
    }
}

// Toggle mobile menu
menu.addEventListener("click", function () {
    console.log("Mobile menu toggled"); // Log menu toggle
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});

// Event listener for navigation links
function setupNavLink(selector) {
    console.log("setupNavLink called with selector:", selector); // Log selector
    const link = document.querySelector(selector);
    if (link) {
        console.log("setupNavLink: Link found:", link); // Log found link

        link.addEventListener("click", function (event) {
            console.log("Link clicked:", this); // Log clicked link

            const targetHref = this.getAttribute("href");
            console.log("targetHref:", targetHref); // Log href

            // Check if targetHref is null or an external link
            if (!targetHref || targetHref.startsWith("http://") || targetHref.startsWith("https://")) {
                console.log("External link or null href. Exiting."); // Log external/null
                return; // Exit
            }

            event.preventDefault(); // Prevent default if is an internal link

            const hashIndex = targetHref.indexOf("#");
            const targetHash = hashIndex !== -1 ? targetHref.substring(hashIndex) : "";
            console.log("targetHash:", targetHash); // Log hash

            console.log("window.location.pathname:", window.location.pathname); // Log current path

            let conditionResult = window.location.pathname.includes(targetHref.split("#")[0]) ||
                window.location.pathname + "/" === targetHref.split("#")[0];
            console.log("Condition result:", conditionResult);

            if (conditionResult) {
                if (targetHash) {
                    console.log("Calling scrollToSection with:", targetHash); // Log before calling
                    scrollToSection(targetHash);
                }
            } else {
                console.log("Navigating to:", targetHref); // Log navigation
                window.location.href = targetHref;
            }
        });
    } else {
        console.log("setupNavLink: Link NOT found for selector:", selector); // Log if link not found
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
    console.log("DOMContentLoaded event fired"); // Log DOMContentLoaded
    if (window.location.hash) {
        console.log("Initial hash found:", window.location.hash); // Log initial hash
        scrollToSection(window.location.hash);
    }
});