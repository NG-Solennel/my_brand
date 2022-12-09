setLocalStorage();

let d = Number(
  rform.closest(".p-main-container").firstElementChild.firstElementChild
    .innerText
);
let blogs = JSON.parse(localStorage.getItem("blogs"));
blogs.forEach((blog) => {
  if (blog.id == d) {
    if (blog["comments"].length >= 1) {
      for (let i = 0; i < blog.comments.length; i++) {
        let divCont = document.createElement("div");
        divCont.className = "comment";
        let icon = document.createElement("i");
        icon.className = "fa fa-user fa-2x comments-item";
        let divMessage = document.createElement("div");
        divMessage.className = "message comments-item";
        let rname = document.createElement("h4");
        let rmessage = document.createElement("p");
        rmessage.className = "comments-message";
        let rdate = document.createElement("span");
        rdate.className = "c-t-date comments-item";
        rname.innerText = blog.comments[i]["name"];
        rmessage.innerText = blog.comments[i]["message"];
        rdate.innerText = getToday();
        divCont.appendChild(icon);
        divMessage.appendChild(rname);
        divMessage.appendChild(rmessage);
        divCont.appendChild(divMessage);
        divCont.appendChild(rdate);
        document.querySelector(".comments-container").appendChild(divCont);
      }
    }
  }
});

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
  return day + " " + m + " " + date.getFullYear();
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
