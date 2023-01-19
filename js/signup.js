const errorMessage = document.querySelector(".error-message");
const label = document.querySelectorAll("form .field input ~ label");
const labeltrue = document.querySelectorAll("form .field input:valid ~ label");
const labelfocus = document.querySelector("form .field input:focus ~ label");
const inputcss = document.querySelectorAll("form .field input:valid");
const form = document.querySelector("#signupform");
const emaildiv = document.querySelector(".emailfield");
const password1div = document.querySelector(".password1field");
const namediv = document.querySelector(".namefield");
const password2div = document.querySelector(".password2field");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const password1 = document.querySelector(".password1");
const password2 = document.querySelector(".password2");
const smallpass1 = document.querySelector("small .pass1");
const smallemail = document.querySelector("small .email");
const smallname = document.querySelector("small .name");
const smallpass2 = document.querySelector("small .pass2");
const loading = document.querySelector(".loading");
const popupfail = document.querySelector(".popupfail");
const popupfailtxt = document.querySelector(".popupfail p");
const popupfailBtn = document.querySelector(".popupfail button");
document.querySelector(".next").onclick = () => {
  window.open("./index.html", "_self");
};
popupfailBtn.addEventListener("click", () => {
  location.reload();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkName();
  checkEmail();
  checkPass();
  checkConfirmPass();

  if (checkName() && checkConfirmPass() && checkEmail() && checkPass()) {
    loading.showModal();
    fetch("https://renderapi-i55u.onrender.com/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password1.value,
      }),
    }).then((res) => {
      if (res.status == 200) {
        fetch("https://renderapi-i55u.onrender.com/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password1.value,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("a", data.token);
            loading.close();
            window.open("./index.html", "_self");
          });
      } else if (res.status == 409) {
        loading.close();
        popupfailBtn.innerText = "Ok";
        popupfail.showModal();
      } else {
        loading.close();
        popupfailtxt.innerText = "Server Error";
        popupfailBtn.innerText = "Try again";
        popupfail.showModal();
      }
    });
  }
});

password1.addEventListener("input", checkPass);
email.addEventListener("input", checkEmail);
name.addEventListener("input", checkName);
function checkPass() {
  if (password1.value == "" || password1.value == null) {
    smallpass1.textContent = "Please fill in your password";
    password1div.classList.add("fail");
    password1div.classList.remove("success");
    inputcss[2].style.borderColor = "#e74c3c";
  } else if (password1.value.length >= 1 && password1.value.length < 8) {
    smallpass1.textContent = "Password must be atleast 8 characters";
    password1div.classList.add("fail");
    password1div.classList.remove("success");
    label[2].style.color = "#008ccf";
    labeltrue[2].style.transform = "translate(0,-50%)";
    labeltrue[2].style.top = "0%";
    labeltrue[2].style.backgroundColor = "#fff";
    inputcss[2].style.borderColor = "#008ccf";
  } else if (password1.value.length >= 8 && password1.value.length < 15) {
    password1div.classList.remove("fail");
    inputcss[2].style.borderColor = "#2ecc71";
    password1div.classList.add("success");
    return true;
  } else if (password1.value.length > 12) {
    smallpass1.textContent = "Password too long";
    password1div.classList.add("fail");
    password1div.classList.remove("success");
    inputcss[2].style.borderColor = "#e74c3c";
  }
}

function checkConfirmPass() {
  if (password2.value == "" || password2.value == null) {
    smallpass2.textContent = "Confirm your password";
    password2div.classList.add("fail");
    password2div.classList.remove("success");
    inputcss[3].style.borderColor = "#e74c3c";
  } else if (password2.value.length >= 1) {
    password2div.classList.remove("success");
    label[3].style.color = "#008ccf";
    labeltrue[3].style.transform = "translate(0,-50%)";
    labeltrue[3].style.top = "0%";
    labeltrue[3].style.backgroundColor = "#fff";
    inputcss[3].style.borderColor = "#008ccf";
  }
  if (password2.value !== password1.value) {
    smallpass2.textContent = "Password don't match";
    password2div.classList.add("fail");
    password2div.classList.remove("success");
    inputcss[3].style.borderColor = "#e74c3c";
  } else if (password2.value === password1.value && password2.value !== "") {
    password2div.classList.remove("fail");
    inputcss[3].style.borderColor = "#2ecc71";
    password2div.classList.add("success");
    return true;
  }
}

function checkEmail() {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.value == "" || email == null) {
    smallemail.textContent = "Please fill in your email";
    emaildiv.classList.add("fail");
    emaildiv.classList.remove("success");
    inputcss[1].style.borderColor = "#e74c3c";
  } else if (email.value.length >= 1) {
    emaildiv.classList.add("fail");
    emaildiv.classList.remove("success");
    label[1].style.color = "#008ccf";
    labeltrue[1].style.transform = "translate(0,-50%)";
    labeltrue[1].style.top = "0%";
    labeltrue[1].style.backgroundColor = "#fff";
    inputcss[1].style.borderColor = "#008ccf";
  }
  if (email.value.match(pattern)) {
    emaildiv.classList.remove("fail");
    inputcss[1].style.borderColor = "#2ecc71";
    emaildiv.classList.add("success");
    return true;
  } else {
    smallemail.textContent = "Invalid Email";
    emaildiv.classList.add("fail");
    emaildiv.classList.remove("success");
    inputcss[1].style.borderColor = "#e74c3c";
  }
}

function checkName() {
  let format = /^[a-z ,.'-]+$/gi;
  if (name.value == "" || name.value == null) {
    smallname.textContent = "Please fill in your name";
    namediv.classList.add("fail");
    namediv.classList.remove("success");
    inputcss[0].style.borderColor = "#e74c3c";
  } else if (name.value.length >= 1 && name.value.match(format) == null) {
    smallname.textContent = "Invalid Name";
    namediv.classList.add("fail");
    namediv.classList.remove("success");
    label[0].style.color = "#008ccf";
    labeltrue[0].style.transform = "translate(0,-50%)";
    labeltrue[0].style.top = "0%";
    labeltrue[0].style.backgroundColor = "#fff";
    inputcss[0].style.borderColor = "#008ccf";
  } else if (name.value.match(format)) {
    namediv.classList.remove("fail");
    inputcss[0].style.borderColor = "#2ecc71";
    namediv.classList.add("success");
    label[0].style.color = "#008ccf";
    labeltrue[0].style.transform = "translate(0,-50%)";
    labeltrue[0].style.top = "0%";
    labeltrue[0].style.backgroundColor = "#fff";
    return true;
  }
}
