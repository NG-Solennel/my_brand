const navSlider = () => {
  const burger = document.querySelector(".toggle-button");
  const nav = document.querySelector(".nav-items");
  const navLinks = document.querySelectorAll(".nav-item");
  burger.addEventListener("click", () => {
    //to make the nav-bar appear (used translate in css)
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
    //this is for the close (crossing lines)animation
    burger.classList.toggle("active");
  });
};

navSlider();
