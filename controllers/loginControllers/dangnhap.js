//! NẾU CÓ ĐĂNG NHẬP RỒI THÌ HIỆN ĐĂNG XUẤT
document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra xem có thông tin đăng nhập trong localStorage không
  const loginInfo = localStorage.getItem("loginInfo");

  // Tìm nút đăng nhập
  const login__popup = document.getElementById("login__popup");

  if (loginInfo) {
    // Nếu có thông tin đăng nhập, hiển thị nút đăng xuất
    login__popup.id = "logoutLink";
    login__popup.innerText = "Logout";
  }
});

//! Gọi hàm login() khi nút đăng nhập được nhấn
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút submit
    // Gọi hàm login() khi nút đăng nhập được nhấn
    login();
  });
});

//! FUCNTION LOGIN
function login() {
  // Lấy giá trị từ các ô input
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  // Tạo đối tượng dữ liệu đăng nhập
  const loginData = {
    email: email,
    password: password,
  };

  // Chuyển đối tượng dữ liệu thành chuỗi JSON
  const loginDataJSON = JSON.stringify(loginData);

  // Gửi yêu cầu POST đến API để đăng nhập
  axios
    .post("https://shop.cyberlearn.vn/api/Users/signin", loginDataJSON, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // Xử lý phản hồi từ API sau khi đăng nhập thành công
      console.log("Đăng nhập thành công:", response.data);
      // Lưu thông tin đăng nhập vào local storage hoặc cookie nếu cần
      const loginInfo = {
        email: response.data.content.email,
        accessToken: response.data.content.accessToken,
      };
      localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

      Swal.fire({
        title: "Success!",
        text: "Đăng nhập thành công!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "../index.html";
        }
      });
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      console.error("Đăng nhập thất bại:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed! Please check your email and password again!",
      });
    });
}
