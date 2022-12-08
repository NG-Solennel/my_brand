setLocalStorage();

let bCont = document.querySelector(".blogs");

let blogs = JSON.parse(localStorage.getItem("blogs"));
if (blogs.length < 1) {
  let header = document.createElement("h1");
  header.className = "stuned";
  header.innerText = "Stay tuned blogs are coming soon!!";
  bCont.appendChild(header);
} else {
  for (let i = 0; i < blogs.length; i++) {
    let majorDiv = document.createElement("div");
    majorDiv.className = "blog-post swiper-slide";
    let image = document.createElement("img");
    image.className = "b-img";

    let title = document.createElement("h5");
    title.className = "blog-header";

    let description = document.createElement("p");
    description.className = "blog-desc";
    let divReadmore = document.createElement("div");
    divReadmore.className = "div-readmore";
    let btnReadmore = document.createElement("button");
    btnReadmore.className = "readmore";
    let link = document.createElement("a");
    link.setAttribute("href", "./post1.html");
    let divLast = document.createElement("div");
    divLast.className = "b-last-sec";
    let divLc = document.createElement("div");
    divLc.className = "like-comment";
    let likes = document.createElement("span");
    let likecont = document.createElement("span");
    likecont.classList.add("like");
    let comments = document.createElement("span");
    let iconLike = document.createElement("i");
    iconLike.className = "fa-solid fa-heart";
    let iconComment = document.createElement("i");
    iconComment.className = "fa-solid fa-comment";
    let date = document.createElement("span");
    let id = document.createElement("span");
    id.classList.add("idnone");
    date.className = "date";
    date.innerText = getToday();
    image.setAttribute("src", blogs[i]["image"]);
    title.innerText = blogs[i]["title"];
    description.innerText = blogs[i]["text"].substring(0, 120);
    likes.innerText = blogs[i]["likes"];
    comments.innerText = blogs[i]["comments"].length;
    link.innerText = "Read More";
    id.innerText = blogs[i]["id"];
    likecont.appendChild(likes);
    likecont.appendChild(iconLike);
    divLc.appendChild(likecont);
    divLc.appendChild(document.createTextNode("\u00A0\u00A0\u00A0"));
    divLc.appendChild(comments);
    divLc.appendChild(iconComment);
    divLast.appendChild(divLc);
    divLast.appendChild(date);
    btnReadmore.appendChild(link);
    divReadmore.appendChild(btnReadmore);
    majorDiv.appendChild(id);
    majorDiv.appendChild(image);
    majorDiv.appendChild(title);
    majorDiv.appendChild(description);
    majorDiv.appendChild(divReadmore);
    majorDiv.appendChild(divLast);
    bCont.appendChild(majorDiv);

    btnReadmore.addEventListener("click", () => {
      let index = Number(
        btnReadmore.parentElement.parentElement.firstElementChild.innerText
      );
      blogs.forEach((b) => {
        if (b.id == index) {
          b.selected = true;
        } else {
          b.selected = false;
        }
      });
      localStorage.setItem("blogs", JSON.stringify(blogs));
    });
    let bool = false;
    likecont.addEventListener("click", () => {
      let index = likes.closest(".blog-post").firstElementChild.innerText;
      let i = blogs.indexOf(blogs.find((post) => post.id == index));
      if (!bool) {
        bool = true;
        blogs[i].likes++;
        likes.innerText = blogs[i].likes;
        localStorage.setItem("blogs", JSON.stringify(blogs));
      } else {
        bool = false;
        blogs[i].likes--;
        likes.innerText = blogs[i].likes;
        localStorage.setItem("blogs", JSON.stringify(blogs));
      }
    });
  }
}

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
  return day + " " + m + " " + " " + date.getFullYear();
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
