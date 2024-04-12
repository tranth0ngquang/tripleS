document.addEventListener("DOMContentLoaded", function () {
  // Code xử lý sự kiện click của registerButton
  const registerButton = document.getElementById("registerButton");
  registerButton.addEventListener("click", function () {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const name = document.getElementById("nameInput").value;
    const gender =
      document.querySelector('input[name="gender"]:checked').value === "male";
    const phone = document.getElementById("phoneInput").value;

    const newUser = new User(email, password, name, gender, phone);
    const userDataJSON = JSON.stringify(newUser);

    axios
      .post("https://shop.cyberlearn.vn/api/Users/signup", userDataJSON, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Dữ liệu đã được gửi thành công:", response.data);
        console.log(response.data.content);
        Swal.fire({
          title: "Success!",
          text: "Register successfully! Please login to continue!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "../views/loginPage.html";
          }
        });
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi gửi dữ liệu:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Register failed! Error: Email is already in use!`,
        });
      });
  });

  // Code hiển thị popup đăng nhập khi trang loginPage.html được load
  window.addEventListener("load", function () {
    const btnLoginPopup = document.querySelector(".btnlogin-popup");
    if (btnLoginPopup.innerText === "Login") {
      btnLoginPopup.click();
    }
  });
});
