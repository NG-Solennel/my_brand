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
cmessage.addEventListener("input", () => {
  checkMessage(cmessage.value.trim(), false);
});
cemail.addEventListener("input", () => {
  checkEmail(cemail.value.trim());
});
cname.addEventListener("input", () => {
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
  let regLetters = /[A-Za-z]/g;
  if (message === "" || message == null) {
    divMessage.classList.add("error");
    divMessage.classList.remove("success");
    smallMessage.textContent = "Please fill in your message";
  } else if (message.length < 5) {
    divMessage.classList.add("error");
    divMessage.classList.remove("success");
    smallMessage.textContent = "The message is too short";
  } else if (message.match(regLetters) == null) {
    divMessage.classList.add("error");
    divMessage.classList.remove("success");
    smallMessage.textContent = "Your message contains no content";
  } else if (
    message.match(regLetters).length <
    message.length - message.length / 6
  ) {
    divMessage.classList.add("error");
    divMessage.classList.remove("success");
    smallMessage.textContent = "Your message contains no content";
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
  let format = /^[a-z ,.'-]+$/gi;
  if (name === "" || name === null || name.length < 4) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "Please fill in your name";
  } else if (isNaN(name) === false) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "This is not a valid name";
  } else if (name.match(format) == null) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "This is not a valid name";
  } else if (name.match(format) !== null) {
    divName.classList.add("success");
    divName.classList.remove("error");
    return true;
  }
}
