const rform = document.querySelector("#r-form");
const loading = document.querySelector(".loading");
const rmessage = document.querySelector(".r-message");

let smallMessage = document.querySelector(".small-message");

const divMessage = document.querySelector(".f-message");
const logpop = document.querySelector(".loginpop");
rform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!localStorage.getItem("a")) {
    logpop.showModal();
    setTimeout(() => {
      logpop.close();
    }, 4000);
  } else {
    checkMessage(rmessage.value.trim(), true);
    if (checkMessage(rmessage.value.trim(), true)) {
      let id =
        rform.closest(".p-main-container").firstElementChild.firstElementChild
          .innerText;
      loading.showModal();
      fetch("https://renderapi-i55u.onrender.com/blogs/" + id + "/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("a"),
        },
        body: JSON.stringify({ message: rmessage.value }),
      }).then((res) => {
        loading.close();
        if (res.status == 200) {
          location.reload();
        }
      });
    }
  }
});

rmessage.addEventListener("input", () => {
  checkMessage(rmessage.value.trim(), false);
});

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
