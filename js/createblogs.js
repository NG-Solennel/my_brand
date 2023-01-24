let bCont = document.querySelector(".blogs");
let regTags = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
let regEntities = /(&.+;)/gi;

const loading = document.querySelector(".loading");
window.addEventListener("load", () => {
  loading.showModal();
});
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
fetch("https://renderapi-i55u.onrender.com/blogs", options)
  .then((res) => res.json())
  .then((data) => {
    loading.close();

    if (data.Message == "No blogs available") {
      let header = document.createElement("h1");
      header.className = "stuned";
      header.innerText = "Stay tuned blogs are coming soon!!";
      bCont.appendChild(header);
    } else {
      const blogs = data.blogs;
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
        link.setAttribute("href", "./post1.html?id=" + blogs[i]._id);
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
        date.innerText = getToday(blogs[i].date);
        image.setAttribute("src", blogs[i]["image"]);
        title.innerText = blogs[i]["title"];
        description.innerText =
          blogs[i]["content"]
            .replaceAll(regTags, "")
            .replaceAll(regEntities, "")
            .substring(0, 120) + "...";
        likes.innerText = blogs[i].likes.Count;
        comments.innerText = blogs[i]["comments"].length;
        link.innerText = "Read More";
        id.innerText = blogs[i]["_id"];
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
        const logpop = document.querySelector(".loginpop");

        likecont.addEventListener("click", () => {
          if (!localStorage.getItem("a")) {
            logpop.showModal();
            setTimeout(() => {
              logpop.close();
            }, 4000);
          } else {
            loading.showModal();
            let index = likes.closest(".blog-post").firstElementChild.innerText;
            fetch(
              "https://renderapi-i55u.onrender.com/blogs/" + index + "/like",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("a"),
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                likes.innerText = data.likedBlog.likes.Count;
                loading.close();
              })
              .catch((err) => console.log(err));
          }
        });
      }
    }
  })
  .catch((err) => console.log(err));

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
  return day + " " + m + " " + " " + date.getFullYear();
}
