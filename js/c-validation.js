const cform = document.querySelector("#c-form");
const cname = document.querySelector('input[type="text"]');
const cemail = document.querySelector('input[type="email"');
const cdesc = document.querySelector('textarea[name="description"]');
const cmessage = document.querySelector(".c-message");
const smallEmail = document.querySelector(".small-email");
const smallMessage = document.querySelector(".small-message");
const smallName = document.querySelector(".small-name");
const divName = document.querySelector(".f-name");
const divEmail = document.querySelector(".f-email");
const divMessage = document.querySelector(".f-message");
cform.addEventListener("submit", (e) => {
  e.preventDefault();
  checkEmail(cemail.value.trim());
  checkMessage(cmessage.value.trim(), true);
  checkName(cname.value.trim());
});
cmessage.addEventListener("keydown", () => {
  checkMessage(cmessage.value.trim(), false);
});
cemail.addEventListener("keydown", () => {
  checkEmail(cemail.value.trim());
});
cname.addEventListener("keydown", () => {
  checkName(cname.value.trim());
});
function checkEmail(email) {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.match(pattern)) {
    divEmail.classList.add("success");
    divEmail.classList.remove("error");
  } else {
    divEmail.classList.add("error");
    divEmail.classList.remove("success");
    smallEmail.textContent = "This email is not valid";
  }
  // if (email.includes("gmail") === false || email.includes("yahoo")) {
  //   divEmail.classList.add("error");
  //   divEmail.classList.remove("success");
  //   smallEmail.textContent = "This email is not valid";
  // }
  if (email === "" || email === null) {
    divEmail.classList.add("error");
    divEmail.classList.remove("success");
    smallEmail.textContent = "Please fill in your email";
  }
}
function checkMessage(message, bool) {
  if (message === "" || message == null) {
    divMessage.classList.add("error");
    divMessage.classList.remove("success");
    smallMessage.textContent = "Please fill in your message";
  } else {
    divMessage.classList.remove("error");
    green(bool);
  }
}
const green = (bool) => {
  if (bool === true) {
    return divMessage.classList.add("success");
  }
};
function checkName(name) {
  let a = typeof name;
  let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  if (isNaN(name) === false) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "This is not a valid name";
  } else if (name.match(format) || containsNumbers(name) === true) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "This is not a valid name";
  } else {
    divName.classList.add("success");
    divName.classList.remove("error");
  }
  if (name === "" || name === null || name.length < 4) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "Please fill in your name";
  }
}
function containsNumbers(str) {
  return /\d/.test(str);
}
