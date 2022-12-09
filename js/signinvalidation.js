setLocalStorage();

const myEmail = document.querySelector("input[type='text'");
const password = document.querySelector("input[type='password'");
const sform = document.querySelector(".login-form");
const div = document.querySelector(".error-message");
const small = document.querySelector(".small");
const smallPass = document.querySelector(".small-pass");
const smallEmail = document.querySelector(".small-name");

sform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (myEmail.value.trim() == "") {
    smallEmail.style.visibility = "visible";
    myEmail.focus();
    setTimeout(() => {
      smallEmail.style.visibility = "hidden";
    }, 9000);
  } else if (password.value.trim() == "") {
    smallPass.style.visibility = "visible";
    password.focus();
    setTimeout(() => {
      smallPass.style.visibility = "hidden";
    }, 9000);
  } else {
    checkCredentials(myEmail.value, password.value);
  }
});

myEmail.addEventListener("input", () => {
  checkEmail(myEmail.value);
});

password.addEventListener("input", () => {
  checkPass(password.value);
});

const checkEmail = (email) => {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email == "" || email == null) {
    smallEmail.style.visibility = "visible";
  } else {
    smallEmail.style.visibility = "hidden";
  }

  if (email.match(pattern)) {
    smallEmail.style.visibility = "hidden";
  } else {
    smallEmail.innerText = "Invalid Email";
    smallEmail.style.visibility = "visible";
  }
};
const checkPass = (pass) => {
  if (pass == "" || pass == null) {
    smallPass.style.visibility = "visible";
  } else {
    smallPass.style.visibility = "hidden";
  }
};
let credentials = JSON.parse(localStorage.getItem("credentials"));
const checkCredentials = (username, password) => {
  if (username !== credentials[0] || password !== credentials[1]) {
    small.innerText = "Incorrect Email or password";
    div.style.visibility = "visible";
    setTimeout(() => {
      div.style.visibility = "hidden";
    }, 3000);
  } else {
    div.style.visibility = "hidden";
    window.open("./dashboard/dashboard.html", "_self");
  }
};
function setLocalStorage() {
  if (!localStorage.getItem("blogs")) {
    localStorage.setItem("blogs", JSON.stringify([]));
  } else if (!localStorage.getItem("credentials")) {
    localStorage.setItem(
      "credentials",
      JSON.stringify(["ngsolennel@gmail.com", "andela"])
    );
  } else if (!localStorage.getItem("messages")) {
    localStorage.setItem("messages", JSON.stringify([]));
  }
}
