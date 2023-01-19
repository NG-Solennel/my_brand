const loading = document.querySelector(".loading");
window.addEventListener("load", () => {
  const token = localStorage.getItem("a");
  if (!token) {
    window.open("../login.html", "_self");
  } else {
    loading.showModal();
    fetch("https://renderapi-i55u.onrender.com/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status == 200) {
        loading.close();
      } else {
        loading.close();
        window.open("../login.html", "_self");
      }
    });
  }
});

let trackingDiv = document.querySelector("#trackingDiv");
CKEDITOR.replace("editor1");
CKEDITOR.replace("editor2");
let failBtn = document.querySelector(".popupfail button");
let failModalTxt = document.querySelector(".popupfail p");
const addPostsBtn = document.querySelector(".d-post-btn");
const formDialog = document.querySelector(".form-modal");
const successDialog = document.querySelector(".popupreal");

const successCloseBtn = document.querySelector(".popupreal button");

failBtn.addEventListener("click", () => {
  location.reload();
});
addPostsBtn.addEventListener("click", () => {
  formDialog.showModal();
});

const pform = document.querySelector(".post-add-form");
const ptitle = document.querySelector(".p-title");
const pimg = document.querySelector(".p-img");
const cancel = document.querySelector(".add-cancel-btn");
const peditor = document.querySelector("p-from-item .p-editor");
const addbtn = document.querySelector(".p-add-btn.p-form-item");
const divsmallTitle = document.querySelector(".small-title-add");
const smallTitle = document.querySelector(".small-title-add small");
let pr = document.querySelector(".img-add-preview");
const divsmallPost = document.querySelector(".small-post-add");
const smallPost = document.querySelector(".small-post-add small");
const divsmallImg = document.querySelector(".small-img-add");
const smallImg = document.querySelector(".small-img-add small");
let n = 0;
let reg = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
let regLetters = /[A-Za-z]/g;
let pdata = [];
let p = JSON.parse(localStorage.getItem("blogs"));
if (p.length >= 1) {
  n = Number(p[p.length - 1]["id"]) + 1;
}
pform.addEventListener("submit", (e) => {
  e.preventDefault();
  let a = CKEDITOR.instances.editor1.getData();
  let b = a.replaceAll(reg, "");
  let c = b.replaceAll("&nbsp", " ");
  checkTitle(ptitle.value.trim());
  checkPost(b);
  checkImage(pimg.value);
  if (
    checkTitle(ptitle.value.trim()) &&
    checkPost(b) &&
    checkImage(pimg.value)
  ) {
    loading.showModal();
    const fr = new FileReader();
    fr.readAsDataURL(pimg.files[0]);
    fr.addEventListener("load", () => {
      const url = fr.result;
      let blog = {
        id: n,
        title: ptitle.value.trim(),
        content: a,
        text: c,
        image: url,
        date: getToday(),
        selected: false,
        comments: [],
        likes: 0,
      };

      n++;

      const formData = new FormData();
      formData.append("title", ptitle.value);
      formData.append("content", a);
      formData.append("image", pimg.files[0]);
      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("a"),
        },
        body: formData,
      };
      fetch("https://renderapi-i55u.onrender.com/blogs", options)
        .then((res) => {
          if (res.status == 200) {
            loading.close();
            successDialog.showModal();
          } else if (res.status == 500) {
            failModalTxt.innerText =
              "Error posting blog (Possible reasons: Not reaching cloudinary caused by poor internet connection)";
            failModal.showModal();
          } else {
            alert("Error posting blog");
          }
        })
        .catch((err) => {
          console.log(err);
          failModal.showModal();
        });
    });
  }
});
successCloseBtn.addEventListener("click", () => {
  successDialog.close();
  location.reload();
});

cancel.addEventListener("click", () => {
  formDialog.close();
  CKEDITOR.instances.editor1.setData("", () => {
    this.updateElement();
  });
  pimg.value = null;
  ptitle.value = null;
  pr.style.display = "none";
});
pimg.addEventListener("change", (event) => {
  if (event.target.files.length > 0) {
    let src = URL.createObjectURL(event.target.files[0]);
    pr.src = src;
    pr.style.display = "block";
  }
});
ptitle.addEventListener("input", () => {
  checkTitle(ptitle.value.trim());
});
pimg.addEventListener("input", () => {
  checkImage(pimg.value);
});
const checkTitle = (title) => {
  if (title == "" || title == null) {
    divsmallTitle.style.visibility = "visible";
    smallTitle.innerText = "You forgot the title";
  } else if (title.length < 3) {
    divsmallTitle.style.visibility = "visible";
    smallTitle.innerText = "The title is too small";
  } else if (title.length > 50) {
    divsmallTitle.style.visibility = "visible";
    smallTitle.innerText = "The title is too long";
  } else if (title.match(regLetters) == null) {
    divsmallTitle.style.visibility = "visible";
    smallTitle.innerText =
      "Your title should consist of more alphabetical characters";
  } else if (title.match(regLetters).length < title.length - title.length / 3) {
    divsmallTitle.style.visibility = "visible";
    smallTitle.innerText =
      "Your title should consist of more alphabetical characters";
  } else {
    divsmallTitle.style.visibility = "hidden";
    return true;
  }
};

const checkPost = (post) => {
  if (post == "" || post == null) {
    divsmallPost.style.visibility = "visible";
    smallPost.innerText = "Please fill in the post content";
  } else if (post.match(regLetters) == null) {
    divsmallPost.style.visibility = "visible";
    smallPost.innerText = "Your post content is not valid";
  } else if (post.match(regLetters).length < post.length - post.length / 3) {
    divsmallPost.style.visibility = "visible";
    smallPost.innerText =
      "Your title should consist of more alphabetical characters";
  } else if (post.length < 100) {
    divsmallPost.style.visibility = "visible";
    smallPost.innerText = "Your post doesn't reach 100 characters";
  } else if (post.length >= 100) {
    divsmallPost.style.visibility = "hidden";
    return true;
  } else {
    divsmallPost.style.visibility = "hidden";
    return true;
  }
};
const checkImage = (img) => {
  let start = img.indexOf(".");
  let imgExtension = img.substring(start + 1, img.length);
  if (img == "" || img == null) {
    divsmallImg.style.visibility = "visible";
    smallImg.innerText = "Please provide an image";
  } else if (checkImgExtension(imgExtension) == false) {
    divsmallImg.style.visibility = "visible";
    smallImg.innerText = "That was not an image";
  } else {
    divsmallImg.style.visibility = "hidden";
    return true;
  }
};

const checkImgExtension = (ext) => {
  if (
    ext === "jpg" ||
    ext === "png" ||
    ext === "webp" ||
    ext === "tiff" ||
    ext === "jpeg"
  ) {
    return true;
  } else {
    return false;
  }
};

function getToday() {
  let date = new Date();
  let day = "";
  let value = date.getMonth() + 1;
  if (date.getDate() < 10) {
    day = "0" + date.getDate();
  } else {
    day = date.getDate();
  }
  switch (value) {
    case 1:
      m = "Jan";
      break;
    case 2:
      m = "Feb";
      break;
    case 3:
      m = "March";
      break;
    case 4:
      m = "April";
      break;
    case 5:
      m = "May";
      break;
    case 6:
      m = "June";
      break;
    case 7:
      m = "July";
      break;
    case 8:
      m = "Aug";
      break;
    case 9:
      m = "Sept";
      break;
    case 10:
      m = "Oct";
      break;
    case 11:
      m = "Nov";
      break;
    case 12:
      m = "Dec";
      break;
    default:
      m = "Null";
      break;
  }
  let today = day + " " + m + " " + " " + date.getFullYear();
  return today;
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

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
