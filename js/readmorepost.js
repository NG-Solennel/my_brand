let at = location.href;
let pContent = document.querySelector(".post-content");
let ptitle = document.querySelector(".post-title");
let pdate = document.querySelector(".post-date");
let id = document.querySelector(".idnone");
let pimage = document.querySelector(".imgpost");
let idString = at.split("?")[1];
let blogId = idString.split("=")[1];
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
fetch("https://renderapi-i55u.onrender.com/blogs/" + blogId, options)
  .then((res) => res.json())
  .then((data) => {
    const blog = data.blog;
    console.log(blog);
    id.innerText = blog._id;
    ptitle.innerText = blog.title;
    pdate.innerText = getToday(blog.date);
    pContent.innerHTML = blog.content;
    pimage.src = blog.image;
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
