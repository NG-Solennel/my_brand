window.addEventListener("load", () => {
  const token = localStorage.getItem("a");
  if (!token) {
    window.open("../login.html", "_self");
  } else {
    fetch("https://renderapi-i55u.onrender.com/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status == 200) {
        loading.close();
        window.open("./dashboard/dashboard.html", "_self");
      } else {
        loading.close();
        window.open("../login.html", "_self");
      }
    });
  }
});

let tbody = document.querySelector("tbody");
let theader = document.querySelector("thead");

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("a"),
  },
};
fetch("https://renderapi-i55u.onrender.com/messages", options)
  .then((res) => res.json())
  .then((data) => {
    let messages = data.messages;
    if (messages.length < 1) {
      tbody.innerHTML = "<h1>You have no messages</h1>";
      theader.style.visibility = "hidden";
    } else {
      theader.style.visibility = "visible";
    }
    for (let i = 0; i < messages.length; i++) {
      let row = document.createElement("tr");
      let data1 = document.createElement("td");
      let data2 = document.createElement("td");
      let data3 = document.createElement("td");
      let data4 = document.createElement("td");
      let data5 = document.createElement("td");
      data1.classList.add("person");
      let email = document.createElement("span");
      let br = document.createElement("br");
      let name = document.createElement("h3");
      let desc = document.createElement("span");
      desc.classList.add("about");
      let content = document.createElement("p");
      content.classList.add("d-message-content");
      let mdate = document.createElement("span");
      mdate.classList.add("mdate");
      let id = document.createElement("span");
      id.classList.add("idnone");
      id.innerText = messages[i]["_id"];
      let dbtn = document.createElement("button");
      dbtn.classList.add("d-dlt-btn");
      let dbtnIcon = document.createElement("i");
      dbtnIcon.className = "fa fa-trash fa-2x";
      dbtn.appendChild(dbtnIcon);
      email.innerText = messages[i]["email"];
      name.innerText = messages[i]["name"];
      if (messages[i].description) {
        desc.innerText = messages[i]["description"];
      } else {
        desc.style.display = "none";
      }

      data3.innerText = messages[i]["hiring"];
      content.innerText = messages[i]["message"];
      mdate.innerText = getToday();
      data1.appendChild(email);
      data1.appendChild(br);
      data1.appendChild(name);
      data1.appendChild(desc);
      data2.appendChild(content);
      data4.appendChild(mdate);
      data5.appendChild(dbtn);
      row.appendChild(id);
      row.appendChild(data1);
      row.appendChild(data2);
      row.appendChild(data3);
      row.appendChild(data4);
      row.appendChild(data5);
      document.querySelector("tbody").appendChild(row);
      if (messages[i]["description"] == "") {
        desc.style.display = "none";
      }
      dbtn.addEventListener("click", () => {
        let index =
          dbtn.parentElement.parentElement.firstElementChild.innerText;

        fetch("https://renderapi-i55u.onrender.com/messages/" + index, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("a"),
          },
        }).then((res) => {
          if (res.status == 204) {
            location.reload();
          } else {
            alert("Server Error");
          }
        });
      });
    }
  });

let messages = JSON.parse(localStorage.getItem("messages"));

dbtn.addEventListener("click", () => {
  let index = Number(
    dbtn.parentElement.parentElement.firstElementChild.innerText
  );

  let newMessages = messages.filter((m) => {
    return m.id !== index;
  });

  localStorage.removeItem("messages");
  localStorage.setItem("messages", JSON.stringify(newMessages));
  location.reload();
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
