const rform = document.querySelector("#r-form");
const rname = document.querySelector('input[type="text"]');
const remail = document.querySelector("#p-email");
const rmessage = document.querySelector(".r-message");
let smallEmail = document.querySelector(".small-email");
let smallMessage = document.querySelector(".small-message");
let smallName = document.querySelector(".small-name");
const divName = document.querySelector(".f-name");
const divEmail = document.querySelector(".f-email");
const divMessage = document.querySelector(".f-message");

rform.addEventListener("submit", (e) => {
  e.preventDefault();
  checkMessage(rmessage.value.trim(), true);
  checkName(rname.value.trim());
  checkEmail(remail.value.trim());
});
rname.addEventListener("input", () => {
  checkName(rname.value.trim());
});
remail.addEventListener("input", () => {
  checkEmail(remail.value.trim());
});

rmessage.addEventListener("input", () => {
  checkMessage(rmessage.value.trim(), false);
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
  if (email === "" || email === null) {
    divEmail.classList.add("error");
    divEmail.classList.remove("success");
    smallEmail.textContent = "Please fill in your email";
  }
}

function checkName(name) {
  let a = typeof name;
  let format = /^[a-z ,.'-]+$/gi;
  if (name === "" || name === null || name.length < 3) {
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

function checkMessage(message, bool) {
  let regLetters = /[A-Za-z]/g;
  if (message === "" || message == null) {
    divMessage.classList.add("error");
    divMessage.classList.remove("success");
    smallMessage.textContent = "Please fill in your message";
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
function containsNumbers(str) {
  return /\d/.test(str);
}
