// //! NẾU CÓ ĐĂNG NHẬP RỒI THÌ HIỆN ĐĂNG XUẤT 
// document.addEventListener("DOMContentLoaded", function () {
//   // Kiểm tra xem có thông tin đăng nhập trong localStorage không
//   const loginInfo = localStorage.getItem("loginInfo");

//   // Tìm nút đăng xuất
//   const logoutLink = document.getElementById("logoutLink");

//   if (loginInfo) {
//     // Nếu có thông tin đăng nhập, hiển thị nút đăng xuất
//     logoutLink.style.display = "inline-block";
//   } else {
//     // Nếu không có thông tin đăng nhập, ẩn nút đăng xuất
//     logoutLink.style.display = "none";
//   }
// });

//! Gán và gọi sự kiện click cho nút đăng xuất
document.addEventListener("DOMContentLoaded", function () {
  // Gán sự kiện click cho thẻ <a> với id là "logoutLink"
  document
    .getElementById("logoutLink")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

      logout(); // Gọi hàm logout
    });
});

// Hàm logout để xóa thông tin đăng nhập từ local storage và chuyển hướng người dùng đến trang đăng nhập
function logout() {
  // Xóa thông tin đăng nhập từ local storage
  localStorage.removeItem("loginInfo");

  // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng xuất
  window.location.href = "loginPage.html"; // Thay đổi 'login.html' thành '../index.html' để chuyển về trang index ở ngoài
}
