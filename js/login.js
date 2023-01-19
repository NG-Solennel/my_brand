const email = document.querySelector(".email");
const emaildiv = document.querySelector(".emailfield");
const passworddiv = document.querySelector(".passwordfield");
const password = document.querySelector(".password");
const loginform = document.querySelector("#loginform");
const errorMessage = document.querySelector(".error-message");
const label = document.querySelectorAll("form .field input ~ label");
const labeltrue = document.querySelectorAll("form .field input:valid ~ label");
const labelfocus = document.querySelector("form .field input:focus ~ label");
const inputcss = document.querySelectorAll("form .field input:valid");
const loading = document.querySelector(".loading");
document.querySelector(".next").onclick = () => {
  window.open("./index.html", "_self");
};

email.addEventListener("input", checkEmail);
password.addEventListener("input", checkPass);
loginform.addEventListener("submit", (e) => {
  e.preventDefault();
  checkEmail();
  checkPass();

  if (checkEmail() == true && checkPass() == true) {
    checkCredentials();
  }
});

function checkEmail() {
  if (email.value == "" || email.value == null) {
    emaildiv.classList.add("fail");
  } else if (email.value != null || email.value != "") {
    emaildiv.classList.remove("fail");
    label[0].style.color = "#008ccf";
    labeltrue[0].style.transform = "translate(0,-50%)";
    labeltrue[0].style.top = "0%";
    labeltrue[0].style.backgroundColor = "#fff";
    inputcss[0].style.borderColor = "#008ccf";
    return true;
  }
}

function checkPass() {
  if (password.value == "" || password.value == null) {
    passworddiv.classList.add("fail");
  } else if (password.value != null || password.value != "") {
    passworddiv.classList.remove("fail");
    label[1].style.color = "#008ccf";
    labeltrue[1].style.transform = "translate(0,-50%)";
    labeltrue[1].style.top = "0%";
    labeltrue[1].style.backgroundColor = "#fff";
    inputcss[1].style.borderColor = "#008ccf";
    return true;
  }
}
function checkCredentials() {
  loading.showModal();
  const data = { email: email.value, password: password.value };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch("https://renderapi-i55u.onrender.com/users/login", options)
    .then((res) => {
      loading.close();
      if (res.status == 400) {
        errorMessage.style.visibility = "visible";
      } else if (res.status == 200) {
        errorMessage.style.visibility = "hidden";
        return res.json();
      }
    })
    .then((data) => {
      localStorage.setItem("a", data.token);
      window.open("./index.html", "_self");
    });
}
