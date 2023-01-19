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
let sentModal = document.querySelector(".popupreal");
let sentModalBtn = document.querySelector(".popupreal button");
const loading = document.querySelector(".loading");
let failModal = document.querySelector(".popupfail");
let failModalBtn = document.querySelector(".popupfail button");

sentModalBtn.addEventListener("click", () => {
  location.reload();
});
failModalBtn.addEventListener("click", () => {
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
    loading.showModal();
    let message = {};
    if (cdesc.value.trim() == "" || cdesc.value.trim() == null) {
      message = {
        name: cname.value.trim(),
        email: cemail.value.trim(),
        message: cmessage.value.trim(),
        hiring: getCheckbox(chire),
      };
    } else {
      message = {
        name: cname.value.trim(),
        email: cemail.value.trim(),
        message: cmessage.value.trim(),
        description: cdesc.value.trim(),
        hiring: getCheckbox(chire),
      };
    }
    fetch("https://renderapi-i55u.onrender.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => {
        loading.close();
        if (res.status == 200) {
          sentModal.showModal();
        } else {
          failModal.showModal();
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => {
        failModal.showModal();
      });
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
    p = true;
  } else {
    p = false;
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
  } else if (desc.length < 5) {
    divDesc.classList.add("error");
    divDesc.classList.remove("success");
    smallDesc.textContent = "Too short of a description";
    return false;
  } else if (desc.length < 10) {
    divDesc.classList.add("error");
    divDesc.classList.remove("success");
    smallDesc.textContent = "Tell me more";
    return false;
  } else if (desc.length >= 10 && desc.length < 200) {
    divDesc.classList.remove("error");
    return true;
  } else {
    divDesc.classList.add("error");
    divDesc.classList.remove("success");
    smallDesc.textContent = "Too long";
    return false;
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
  } else if (message.length > 400) {
    divMessage.classList.add("error");
    divMessage.classList.remove("success");
    smallMessage.textContent = "The message is too long";
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
