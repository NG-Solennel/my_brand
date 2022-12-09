setLocalStorage();

const tbody = document.querySelector("tbody");
const theader = document.querySelector("thead");
const posts = JSON.parse(localStorage.getItem("blogs"));
const edtModal = document.querySelector(".edt-modal");
let edtimage = document.querySelector("#p-edt-img");
let edtcancel = document.querySelector(".edt-cancel-btn");
if (posts.length < 1 || !posts) {
  tbody.innerHTML = "<h1>You have no blogs</h1>";
  theader.style.visibility = "hidden";
} else {
  theader.style.visibility = "visible";
}

for (let i = 0; i < posts.length; i++) {
  let row = document.createElement("tr");
  let data1 = document.createElement("td");
  let data2 = document.createElement("td");
  let data3 = document.createElement("td");
  let title = document.createElement("h4");
  title.className = "d-article-title";
  let date = document.createElement("span");
  let divBtns = document.createElement("div");
  divBtns.className = "buttons";
  let icondlt = document.createElement("i");
  let btndlt = document.createElement("button");
  btndlt.className = "d-dlt-btn";
  icondlt.className = "fa fa-trash fa-2x";
  let iconedt = document.createElement("i");
  let btnedt = document.createElement("button");
  btnedt.className = "d-edt-btn";
  iconedt.className = "fa-solid fa-pen-to-square fa-2x";
  let id = document.createElement("span");
  id.classList.add("idnone");
  id.innerText = posts[i]["id"];
  title.innerText = posts[i].title;
  date.innerText = posts[i].date;

  btndlt.appendChild(icondlt);
  btnedt.appendChild(iconedt);
  divBtns.appendChild(btnedt);
  divBtns.appendChild(document.createTextNode("\u00A0\u00A0"));
  divBtns.appendChild(btndlt);
  data1.appendChild(title);
  data2.appendChild(date);
  data3.appendChild(divBtns);
  row.appendChild(id);
  row.appendChild(data1);
  row.appendChild(data2);
  row.appendChild(data3);
  tbody.appendChild(row);
  edtimage.onchange = () => {
    let index = edtimage.closest(".edt-modal").firstElementChild.innerText;
    let a = posts.indexOf(posts.find((post) => post.id == index));
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      let url = reader.result;
      document.querySelector(".img-edt-preview").src = url;
      posts[a].image = url;
    });
    reader.readAsDataURL(edtimage.files[0]);
  };

  edtcancel.addEventListener("click", () => {
    edtModal.close();
  });
  btnedt.addEventListener("click", () => {
    let edtDialog = document.querySelector(".edt-modal");
    let edttitle = document.querySelector(".p-edt-title");
    let edtid = document.querySelector(".edt-idnone");
    let edtform = document.querySelector(".post-edt-form");
    edtform.style.dislay = "none";
    let reg = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    let preImg = document.querySelector(".img-edt-preview");
    edtDialog.showModal();
    let index = Number(
      btnedt.parentElement.parentElement.parentElement.firstElementChild
        .innerText
    );
    posts.forEach((post) => {
      if (post.id == index) {
        edtid.innerText = post.id;
        edttitle.value = post.title;
        preImg.setAttribute("src", post.image);
        CKEDITOR.instances.editor2.setData(post.content, () => {
          this.updateElement();
        });
        edtform.addEventListener("submit", () => {
          posts.map((post) => {
            if (post.id == index) {
              post.title = edttitle.value;
              post.content = CKEDITOR.instances.editor2.getData();
              post.text = post.content.replaceAll(reg, "");
              localStorage.setItem("blogs", JSON.stringify(posts));
              location.reload();
            }
          });
        });
      }
    });
  });

  btndlt.addEventListener("click", () => {
    let index = Number(
      btndlt.parentElement.parentElement.parentElement.firstElementChild
        .innerText
    );
    let newPosts = posts.filter((post) => {
      return post["id"] !== index;
    });
    localStorage.setItem("blogs", JSON.stringify(newPosts));
    location.reload();
  });
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
