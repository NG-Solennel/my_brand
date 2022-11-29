//for the editor to work
let trackingDiv = document.querySelector("#trackingDiv");
CKEDITOR.replace("editor1");
// timer = setInterval(updateDiv, 100);
// function updateDiv() {
//   let editorText = CKEDITOR.instances.editor1.getData();
//   trackingDiv.innerHTML = editorText;
// }
const addPostsBtn = document.querySelector(".d-post-btn");
const formDialog = document.querySelector(".form-modal");

addPostsBtn.addEventListener("click", () => {
  formDialog.showModal();
});

const pform = document.querySelector(".post-add-form");
const ptitle = document.querySelector(".p-title");
const pimg = document.querySelector(".p-img");
const peditor = document.querySelector("p-from-item .p-editor");
const addbtn = document.querySelector(".p-add-btn.p-form-item");
const divsmallTitle = document.querySelector(".small-title");
const smallTitle = document.querySelector(".small-title small");
const divsmallPost = document.querySelector(".small-post");
const smallPost = document.querySelector(".small-post small");
const divsmallImg = document.querySelector(".small-img");
const smallImg = document.querySelector(".small-img small");
let reg = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
pform.addEventListener("submit", (e) => {
  e.preventDefault();
  let a = CKEDITOR.instances.editor1.getData();
  let b = a.replaceAll(reg, "");
  checkTitle(ptitle.value.trim());
  checkPost(b);
  checkImage(pimg.value);
  if (
    checkTitle(ptitle.value.trim() && checkPost(b) && checkImage(pimg.value))
  ) {
    formDialog.close();
  }
});
ptitle.addEventListener("keydown", () => {
  checkTitle(ptitle.value.trim());
});

const checkTitle = (title) => {
  if (title == "" || title == null) {
    divsmallTitle.style.visibility = "visible";
    smallTitle.innerText = "You forgot the title";
    setTimeout(() => {
      divsmallTitle.style.visibility = "hidden";
    }, 4000);
  } else if (title.length < 3) {
    divsmallTitle.style.visibility = "visible";
    smallTitle.innerText = "The title is too small";
    setTimeout(() => {
      divsmallTitle.style.visibility = "hidden";
    }, 4000);
  } else if (title.length > 40) {
    divsmallTitle.style.visibility = "visible";
    smallTitle.innerText = "The title is too long";
    setTimeout(() => {
      divsmallTitle.style.visibility = "hidden";
    }, 4000);
  } else {
    divsmallTitle.style.visibility = "hidden";
    return true;
  }
};

const checkPost = (post) => {
  if (post == "" || post == null) {
    divsmallPost.style.visibility = "visible";
    smallPost.innerText = "Please fill in the post content";
    setTimeout(() => {
      divsmallPost.style.visibility = "hidden";
    }, 4000);
  } else if (post.length < 100) {
    divsmallPost.style.visibility = "visible";
    smallPost.innerText = "Your post doesn't reach 100 characters";
    setTimeout(() => {
      divsmallPost.style.visibility = "hidden";
    }, 4000);
  } else if (post.length >= 100) {
    divsmallPost.style.visibility = "hidden";
    return true;
  }
};
const checkImage = (img) => {
  if (img == "" || img == null) {
    divsmallImg.style.visibility = "visible";
    smallImg.innerText = "Please provide an image";
    setTimeout(() => {
      divsmallImg.style.visibility = "hidden";
    }, 4000);
  } else {
    divsmallImg.style.visibility = "hidden";
    return true;
  }
};
