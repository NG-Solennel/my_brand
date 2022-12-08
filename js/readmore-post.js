setLocalStorage();

let p = JSON.parse(localStorage.getItem("blogs"));
let pContent = document.querySelector(".post-content");
let ptitle = document.querySelector(".post-title");
let pdate = document.querySelector(".post-date");
let id = document.querySelector(".idnone");
if (typeof p == "object") {
  let s = p.find(({ selected }) => {
    return selected === true;
  });
  let a = p.indexOf(s);

  id.innerText = s["id"];
  ptitle.innerText = s["title"];
  pdate.innerText = s["date"];
  pContent.innerHTML = s["content"];
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
