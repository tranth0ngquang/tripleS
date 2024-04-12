const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnlogin-popup");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("emailInput");
  const emailError = document.getElementById("emailError");

  emailInput.addEventListener("input", function () {
    validateAndDisplayError();
  });

  function validateAndDisplayError() {
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
      emailError.textContent = "Invalid email address";
    } else {
      emailError.textContent = "";
    }
  }

  function validateEmail(email) {
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return re.test(email);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("nameInput");
  const nameError = document.getElementById("nameError");

  nameInput.addEventListener("input", function () {
    validateAndDisplayError();
  });

  function validateAndDisplayError() {
    const name = nameInput.value.trim().toLowerCase(); // Chuyển tất cả các ký tự về dạng lowercase

    if (!validateName(name)) {
      nameError.textContent = "Invalid name";
    } else {
      nameError.textContent = "";
    }
  }

  function validateName(name) {
    const re =
      /^[a-z_àáâãèéêìíòóôõùúăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỷỹý\s]+$/;
    return re.test(name);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phoneInput");
  const phoneError = document.getElementById("phoneError");

  phoneInput.addEventListener("input", function () {
    validateAndDisplayError();
  });

  function validateAndDisplayError() {
    const phone = phoneInput.value.trim();

    if (!validatePhoneNumber(phone)) {
      phoneError.textContent = "Invalid phone number, 10 Numbers";
    } else {
      phoneError.textContent = "";
    }
  }

  function validatePhoneNumber(phone) {
    const re = /\b(0|84)(([1]\d{2}|[9]\d{1})\d{7}\b)/g;
    return re.test(phone);
  }
});

// PASSWORDD
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordInput");
  const passwordError = document.getElementById("passwordError");
  const inputBox = document.querySelector(".input-boxError");

  passwordInput.addEventListener("input", function () {
    validateAndDisplayError();
  });

  function validateAndDisplayError() {
    const password = passwordInput.value;
    const errorText =
      "Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.";

    if (!validatePassword(password)) {
      passwordError.textContent = errorText;
      passwordError.style.display = "block"; // Hiển thị thông báo lỗi

      // Thêm margin cho .input-box nếu có thông báo lỗi đang hiển thị
      inputBox.style.marginBottom = "70px";
    } else {
      passwordError.textContent = "";
      passwordError.style.display = "none"; // Ẩn thông báo lỗi

      // Xóa margin cho .input-box nếu không có thông báo lỗi
      inputBox.style.marginBottom = "0";
    }
  }

  function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  }
});

// SHOW PASSWORD
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordLogin");
  const showPasswordCheckbox = document.getElementById("showPasswordCheckbox");

  showPasswordCheckbox.addEventListener("change", function () {
    if (showPasswordCheckbox.checked) {
      // Hiển thị mật khẩu
      passwordInput.type = "text";
    } else {
      // Ẩn mật khẩu
      passwordInput.type = "password";
    }
  });
});
