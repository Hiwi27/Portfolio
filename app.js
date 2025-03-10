const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

// Helper function to normalize the pathname
function normalizePathname(pathname) {
    console.log("normalizePathname called with:", pathname);
    if (pathname.endsWith("/index.html")) {
        let result = pathname.slice(0, -10);
        console.log("normalizePathname returning:", result);
        return result;
    }
    console.log("normalizePathname returning:", pathname);
    return pathname;
}

// Function to scroll to a section (if it exists)
function scrollToSection(sectionId) {
    console.log("scrollToSection called with:", sectionId);
    const section = document.querySelector(sectionId);
    if (section) {
        console.log("scrollToSection: Section found:", section);
        section.scrollIntoView({ behavior: "smooth" });
    } else {
        console.log("scrollToSection: Section NOT found:", sectionId);
    }
}

// Toggle mobile menu
menu.addEventListener("click", function () {
    console.log("Mobile menu toggled");
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});

// Event listener for navigation links
function setupNavLink(selector) {
    console.log("setupNavLink called with selector:", selector);
    const link = document.querySelector(selector);
    if (link) {
        console.log("setupNavLink: Link found:", link);

        link.addEventListener("click", function (event) {
            console.log("Link clicked:", this);

            const targetHref = this.getAttribute("href");
            console.log("targetHref:", targetHref);

            // Check if targetHref is null or an external link
            if (!targetHref || targetHref.startsWith("http://") || targetHref.startsWith("https://")) {
                console.log("External link or null href. Exiting.");
                return; // Exit
            }

            event.preventDefault(); // Prevent default if it is an internal link

            const hashIndex = targetHref.indexOf("#");
            const targetHash = hashIndex !== -1 ? targetHref.substring(hashIndex) : "";
            console.log("targetHash:", targetHash);

            console.log("window.location.pathname:", window.location.pathname);

            // Get the base path of the target URL (without the hash)
            let targetBasePath = targetHref.split("#")[0];
            console.log("targetBasePath (before normalization):", targetBasePath);

            // Normalize BOTH the current path and the target path
            let normalizedCurrentPath = normalizePathname(window.location.pathname);
            let normalizedTargetPath = normalizePathname(targetBasePath);
             // Ensure trailing slash consistency for comparison
            if (!normalizedCurrentPath.endsWith("/")) {
                normalizedCurrentPath += "/";
            }
            if (normalizedTargetPath.length > 0 && !normalizedTargetPath.endsWith("/")) {
                normalizedTargetPath += "/";
           }
            console.log("normalizedCurrentPath:", normalizedCurrentPath);
            console.log("normalizedTargetPath:", normalizedTargetPath);


            let conditionResult = (normalizedCurrentPath === normalizedTargetPath);
            console.log("Condition result:", conditionResult);
            if (conditionResult)
            {
                if (targetHash) {
                    console.log("Calling scrollToSection with:", targetHash);
                    scrollToSection(targetHash);
                }
            }
             else
            {
                console.log("Navigating to:", targetHref);
                window.location.href = targetHref;
            }
        });
    } else {
        console.log("setupNavLink: Link NOT found for selector:", selector);
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
    console.log("DOMContentLoaded event fired");
    if (window.location.hash) {
        console.log("Initial hash found:", window.location.hash);
        scrollToSection(window.location.hash);
    }
});