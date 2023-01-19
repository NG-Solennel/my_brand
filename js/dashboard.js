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
