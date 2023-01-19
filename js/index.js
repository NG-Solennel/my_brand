const dashAnchor = document.querySelector(".dashanchor");
const logpop = document.querySelector(".loginpop");
const loading = document.querySelector(".loading");
dashAnchor.addEventListener("click", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("a");
  if (!token) {
    logpop.showModal();
    setTimeout(() => {
      logpop.close();
    }, 5000);
  } else {
    loading.showModal();
    fetch("https://renderapi-i55u.onrender.com/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      loading.close();
      if (res.status == 200) {
        window.open("./dashboard/dashboard.html", "_self");
      }
    });
  }
});

document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("a");
  location.reload();
});
