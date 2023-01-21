const formData = new FormData();
let edttitle = document.querySelector(".p-edt-title");
let edtform = document.querySelector(".post-edt-form");
let predit = document.querySelector(".img-edt-preview");
const tbody = document.querySelector("tbody");
const theader = document.querySelector("thead");
const edtModal = document.querySelector(".edt-modal");
let edtimage = document.querySelector("#p-edt-img");
let edtcancel = document.querySelector(".edt-cancel-btn");
let failModal = document.querySelector(".popupfail");
let failModalBtn = document.querySelector(".popupfail button");

failModalBtn.addEventListener("click", () => {
  location.reload();
});
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
fetch("https://renderapi-i55u.onrender.com/blogs", options)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.Message == "No blogs available") {
      tbody.innerHTML = "<h1>You have no blogs</h1>";
      theader.style.visibility = "hidden";
    } else {
      theader.style.visibility = "visible";

      const posts = data.blogs;

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
        id.innerText = posts[i]["_id"];
        title.innerText = posts[i].title;
        date.innerText = getToday(posts[i].date);

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
          let index =
            edtimage.closest(".edt-modal").firstElementChild.innerText;
          let a = posts.indexOf(posts.find((post) => post.id == index));
          const reader = new FileReader();
          //   reader.addEventListener("load", () => {
          //     let url = reader.result;
          //    .src = url;
          //     // posts[a].image = url;
          //   });
          //   reader.readAsDataURL(edtimage.files[0]);
        };

        edtcancel.addEventListener("click", () => {
          edtModal.close();
        });
        btnedt.addEventListener("click", () => {
          let edtDialog = document.querySelector(".edt-modal");

          let edtid = document.querySelector(".edt-idnone");
          edtform.style.dislay = "none";
          let reg = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
          let preImg = document.querySelector(".img-edt-preview");
          edtDialog.showModal();
          loading.showModal();
          let index =
            btnedt.parentElement.parentElement.parentElement.firstElementChild
              .innerText;
          sessionStorage.setItem("id", index);
          fetch("https://renderapi-i55u.onrender.com/blogs/" + index)
            .then((res) => res.json())
            .then((data) => {
              loading.close();
              const blog = data.blog;
              edtid.innerText = blog._id;
              edttitle.value = blog.title;
              preImg.setAttribute("src", blog.image);
              CKEDITOR.instances.editor2.setData(blog.content, () => {
                this.updateElement();
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });

        btndlt.addEventListener("click", () => {
          let index =
            btndlt.parentElement.parentElement.parentElement.firstElementChild
              .innerText;
          loading.showModal();
          fetch("https://renderapi-i55u.onrender.com/blogs/" + index, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("a"),
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status == 204) {
                loading.close();
                location.reload();
              } else {
                failModal.showModal();
              }
            })
            .catch((err) => {
              console.log(err);
              failModal.showModal();
            });
        });
      }
    }
  });
edtform.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.showModal();
  formData.append("title", edttitle.value);
  formData.append("content", CKEDITOR.instances.editor2.getData());
  formData.append("image", edtimage.files[0]);

  fetch(
    "https://renderapi-i55u.onrender.com/blogs/" + sessionStorage.getItem("id"),
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("a"),
      },
      body: formData,
    }
  )
    .then((res) => {
      loading.close();
      if (res.status == 200) {
        successDialog.showModal();
        edtimage.value = null;
      } else {
        failModalTxt.innerText =
          "Error updating your post; (Possible reasons: Image upload failing due to internet connection";
        failModal.showModal();
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      failModal.showModal();
    });
});
edtimage.addEventListener("change", (event) => {
  console.log(edtimage);
  if (event.target.files.length > 0) {
    let src = URL.createObjectURL(event.target.files[0]);
    predit.src = src;
    predit.style.display = "block";
  }
});

function getToday(iso) {
  let date = new Date(iso);
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
