
// ---- Mobile Menu Toggle ----
const menuToggle = document.getElementById("menu-toggle");
const mobileSidebar = document.getElementById("mobile-sidebar");
const mobileOverlay = document.getElementById("mobile-overlay");

menuToggle.addEventListener("click", () => {
  mobileSidebar.classList.remove("-translate-x-full");
  mobileOverlay.classList.remove("hidden");
});

function closeMobileMenu() {
  mobileSidebar.classList.add("-translate-x-full");
  mobileOverlay.classList.add("hidden");
}

// ---- Active Nav Link ----
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    const href = this.getAttribute("href");
    document.querySelectorAll(`.nav-link[href="${href}"]`).forEach((l) => {
      l.classList.add("active");
    });
  });
});

console.log("SwiftCart E-Commerce — App loaded");
