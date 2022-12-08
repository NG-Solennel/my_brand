setLocalStorage();

const cform = document.querySelector("#c-form");
const cname = document.querySelector('input[type="text"]');
const cemail = document.querySelector(".c-email");
const cdesc = document.querySelector('textarea[name="description"]');
const chire = document.querySelector("input[type='checkbox'");
const cmessage = document.querySelector(".c-message");
const smallEmail = document.querySelector(".small-email");
const smallMessage = document.querySelector(".small-message");
const smallName = document.querySelector(".small-name");
const smallDesc = document.querySelector(".small-description");
const divName = document.querySelector(".f-name");
const divEmail = document.querySelector(".f-email");
const divMessage = document.querySelector(".f-message");
const divDesc = document.querySelector(".f-description");
let sentModal = document.querySelector(".sentmessage");
document.querySelector(".close-btn").addEventListener("click", () => {
  location.reload();
});
let regLetters = /[A-Za-z]/g;
let messageArr = [];
let n = 0;
let m = JSON.parse(localStorage.getItem("messages"));
if (m.length >= 1) {
  n = Number(m[m.length - 1]["id"]) + 1;
}
cform.addEventListener("submit", (e) => {
  e.preventDefault();
  checkEmail(cemail.value.trim());
  checkMessage(cmessage.value.trim(), true);
  checkName(cname.value.trim());
  checkDesc(cdesc.value.trim());
  if (
    checkEmail(cemail.value.trim()) &&
    checkMessage(cmessage.value.trim(), true) &&
    checkName(cname.value.trim()) &&
    checkDesc(cdesc.value.trim())
  ) {
    sentModal.showModal();

    let message = {
      id: n,
      name: cname.value.trim(),
      email: cemail.value.trim(),
      message: cmessage.value.trim(),
      description: cdesc.value.trim(),
      hiring: getCheckbox(chire),
    };
    n++;
    if (localStorage.getItem("messages")) {
      messageArr = JSON.parse(localStorage.getItem("messages"));
    }
    messageArr.push(message);
    localStorage.setItem("messages", JSON.stringify(messageArr));
  }
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
cdesc.addEventListener("input", () => {
  checkDesc(cdesc.value.trim());
});

function getCheckbox(checkbox) {
  let p = "";
  if (checkbox.checked) {
    p = "Yes";
  } else {
    p = "No";
  }
  return p;
}

function checkEmail(email) {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.match(pattern)) {
    divEmail.classList.add("success");
    divEmail.classList.remove("error");
    return true;
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
//
function checkDesc(desc) {
  if (desc == null || desc == "") {
    divDesc.classList.remove("error");
    return true;
  } else if (desc.match(regLetters) == null) {
    divDesc.classList.add("error");
    divDesc.classList.remove("success");
    smallDesc.textContent = "That text is not valid";
    return false;
  } else if (desc.match(regLetters).length < desc.length - desc.length / 4) {
    divDesc.classList.add("error");
    divDesc.classList.remove("success");
    smallDesc.textContent = "That text is not valid";
    return false;
  } else if (desc.length < 10) {
    divDesc.classList.add("error");
    divDesc.classList.remove("success");
    smallDesc.textContent = "Too short of a description";
    return false;
  } else if (desc.length < 70) {
    divDesc.classList.add("error");
    divDesc.classList.remove("success");
    smallDesc.textContent = "Tell me more";
    return false;
  } else if (desc.length >= 70) {
    divDesc.classList.remove("error");
    return true;
  } else {
    return true;
  }
}

function checkMessage(message, bool) {
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
    message.length - message.length / 4
  ) {
    divMessage.classList.add("error");
    divMessage.classList.remove("success");
    smallMessage.textContent = "Your message contains no content";
  } else {
    divMessage.classList.remove("error");
    green(bool);
    return true;
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
  if (name === "" || name === null) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "Please fill in your name";
  } else if (name.match(format) == null) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "This is not a valid name";
  } else if (name.length < 3) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "Too short";
  } else if (isNaN(name) === false) {
    divName.classList.add("error");
    divName.classList.remove("success");
    smallName.textContent = "This is not a valid name";
  } else if (name.match(format) !== null) {
    divName.classList.add("success");
    divName.classList.remove("error");
    return true;
  }
}
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
