const myName = document.querySelector("input[type='text'");
const password = document.querySelector("input[type='password'");
const sform = document.querySelector(".login-form");
const div = document.querySelector(".error-message");
const small = document.querySelector(".small");
const smallPass = document.querySelector(".small-pass");
const smallName = document.querySelector(".small-name");

sform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (myName.value.trim() == "") {
    smallName.style.visibility = "visible";
    myName.focus();
    setTimeout(() => {
      smallName.style.visibility = "hidden";
    }, 9000);
  } else if (password.value.trim() == "") {
    smallPass.style.visibility = "visible";
    password.focus();
    setTimeout(() => {
      smallPass.style.visibility = "hidden";
    }, 9000);
  } else {
    checkCredentials(myName.value, password.value);
  }
});

myName.addEventListener("input", () => {
  checkName(myName.value);
});

password.addEventListener("input", () => {
  checkPass(password.value);
});

const checkName = (name) => {
  if (name == "" || name == null) {
    smallName.style.visibility = "visible";
  } else {
    smallName.style.visibility = "hidden";
  }
};
const checkPass = (pass) => {
  if (pass == "" || pass == null) {
    smallPass.style.visibility = "visible";
  } else {
    smallPass.style.visibility = "hidden";
  }
};
const checkCredentials = (username, password) => {
  if (username !== "Solennel" || password !== "andela") {
    small.innerText = "Incorrect Username or password";
    div.style.visibility = "visible";
    setTimeout(() => {
      div.style.visibility = "hidden";
    }, 3000);
  } else {
    div.style.visibility = "hidden";
    window.open("./dashboard/dashboard.html", "_self");
  }
};
