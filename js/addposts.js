//for the editor to work
CKEDITOR.replace("editor1");

const addPostsBtn = document.querySelector(".d-post-btn");
const formDialog = document.querySelector(".form-modal");

addPostsBtn.addEventListener("click", () => {
  formDialog.showModal();
});
