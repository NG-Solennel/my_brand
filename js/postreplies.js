const loc = location.href.split("?")[1].split("=")[1];

fetch("https://renderapi-i55u.onrender.com/blogs/" + loc + "/comments", {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let comments = data.comments;
    if (comments.length >= 1) {
      for (let i = 0; i < comments.length; i++) {
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
        rname.innerText = comments[i]["name"];
        rmessage.innerText = comments[i]["message"];
        rdate.innerText = getToday(comments[i].date);
        divCont.appendChild(icon);
        divMessage.appendChild(rname);
        divMessage.appendChild(rmessage);
        divCont.appendChild(divMessage);
        divCont.appendChild(rdate);
        document.querySelector(".comments-container").appendChild(divCont);
      }
    }
  });
let blogs = JSON.parse(localStorage.getItem("blogs"));

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
  return day + " " + m + " " + date.getFullYear();
}
