const hamburger = document.querySelector(".toggle-button");
const nav = document.querySelector(".dash-nav");
const navLinks = document.querySelector(".d-nav-item");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  nav.classList.toggle("nav-active");
  // this is for links to fade in one by one
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = ``;
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 25 + 0.5
      }s`;
    }
  });
});
