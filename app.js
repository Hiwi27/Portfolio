const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

// Helper function to normalize the pathname (treat "/" and "/index.html" the same)
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
    if (link) { // Check if the link exists (important for multiple pages)
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor jump

            const targetHref = this.getAttribute("href"); // Get the full href (e.g., "index.html#services")
            const hashIndex = targetHref.indexOf("#");
            const targetHash = hashIndex !== -1 ? targetHref.substring(hashIndex) : "";


            //If the page is the same.
            if (normalizePathname(window.location.pathname) === normalizePathname(targetHref.split("#")[0]) ||
                normalizePathname(window.location.pathname) + "/" === normalizePathname(targetHref.split("#")[0])
                )
            {
                if(targetHash)
                {
                    scrollToSection(targetHash);
                }
            } else {
                // Navigate to the other page, *then* scroll (using the hash)
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
if (window.location.hash) {
    scrollToSection(window.location.hash);
}