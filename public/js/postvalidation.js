setLocalStorage();

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

  if (
    checkMessage(rmessage.value.trim(), true) &&
    checkName(rname.value.trim()) &&
    checkEmail(remail.value.trim())
  ) {
    let reply = {
      name: rname.value.trim(),
      email: remail.value.trim(),
      message: rmessage.value.trim(),
    };
    let blogs = JSON.parse(localStorage.getItem("blogs"));
    let id = Number(
      rform.closest(".p-main-container").firstElementChild.firstElementChild
        .innerText
    );
    blogs.forEach((blog) => {
      if (blog.id == id) {
        blog.comments.push(reply);
      }
    });
    localStorage.setItem("blogs", JSON.stringify(blogs));
    location.reload();
    // if (localStorage.getItem("replies") == false) {
    //   repliesArr.push(reply);
    //   localStorage.setItem("replies", JSON.stringify(repliesArr));
    // } else {
    //   let r = JSON.parse(localStorage.getItem("replies"));
    //   r.push(reply);
    //   localStorage.setItem("replies", JSON.stringify(r));
    // }
    // location.reload();
  }
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
function setLocalStorage() {
  if (!localStorage.getItem("blogs")) {
    localStorage.setItem("blogs", JSON.stringify([]));
  } else if (!localStorage.getItem("credentials")) {
    localStorage.setItem(
      "credentials",
      JSON.stringify(["ngsolennel@gmail.com", "andela"])
    );
  } else if (!localStorage.getItem("messages")) {
    localStorage.setItem("messages", []);
  }
}
