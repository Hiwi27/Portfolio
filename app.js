const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

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

            // --- IMPORTANT: Determine if the link is internal ---
            const isInternal = targetHref.startsWith("#") || !targetHref.includes("://"); // Correct internal link check
            console.log("isInternal:", isInternal);

            if (!isInternal) {
              console.log("Navigating to external URL:", targetHref);
              return; // Let the browser handle external links
            }

            event.preventDefault(); // Prevent default anchor jump (for internal links)

            const hashIndex = targetHref.indexOf("#");
            const targetHash = hashIndex !== -1 ? targetHref.substring(hashIndex) : "";
            console.log("targetHash:", targetHash);
            const baseURL = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
            const absoluteTargetHref = new URL(targetHref, baseURL).href;
            const absoluteCurrentHref = window.location.href;

            console.log("absoluteTargetHref:", absoluteTargetHref);
            console.log("absoluteCurrentHref:", absoluteCurrentHref);

            const targetUrl = new URL(absoluteTargetHref);
            const currentUrl = new URL(absoluteCurrentHref);

            console.log("targetUrl.pathname:", targetUrl.pathname);
            console.log("currentUrl.pathname:", currentUrl.pathname);


            if (targetUrl.pathname === currentUrl.pathname) {
                if (targetHash) {
                    console.log("Calling scrollToSection with:", targetHash);
                    scrollToSection(targetHash);
                }
            } else {
                 console.log("Navigating to:", targetHref); // Log navigation
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
document.addEventListener("DOMContentLoaded", function() { // THIS IS ESSENTIAL
  console.log("DOMContentLoaded event fired");
  if (window.location.hash) {
      console.log("Initial hash found:", window.location.hash);
      scrollToSection(window.location.hash); // Correctly inside the handler
  }
});