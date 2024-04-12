//! GET NAME OF USER AND DISPLAY WHEN LOAD PAGE
function getNameOfUser() {
  const itemString = localStorage.getItem("loginInfo");
  const item = JSON.parse(itemString);

  if (item) {
    const userName = item.email;
    document.querySelector("#nameOfUser").innerText = userName;
  } else {
    document.querySelector("#nameOfUser").innerText = "";
  }
}
getNameOfUser();

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Xóa sản phẩm khỏi mảng giỏ hàng
  cart.splice(index, 1);

  // Lưu thay đổi vào Local Storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Cập nhật lại giỏ hàng và tổng bill sau khi lưu vào Local Storage
  renderTable(updateTotalBill);
}

function renderTable(callback) {
  // Lấy danh sách sản phẩm từ Local Storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let content = "";
  let total = 0;
  cart.map(function (item, index) {
    content += `
      <tr>
          <th scope="row">${index + 1}</th>
          <td>${item.name}</td>
          <td>
            <img class="img-fluid" src="${item.image}"  style="height: 50px;"/>
          </td>
          <td>${item.price}</td>
          <td class="table__quantity">
              <button class="table__buttonDown" onclick="decreaseQuantity(${index})">-</button>
              <span id="quantity-${index}">${item.quantity}</span>
              <button class="table__buttonUp" onclick="increaseQuantity(${index})">+</button>
          </td>
          <td class="table__total" id="total-${index}">${(
      item.price * item.quantity
    ).toLocaleString()}</td>
          <td class="table__delete">
          <button class="table__button" onclick="removeItem(${index})">Delete</button>
      </td>
    </tr>
      `;
  });

  document.querySelector("#innerTable").innerHTML = content;

  // Gọi callback nếu có
  if (callback && typeof callback === "function") {
    callback();
  }
}

// Hàm giảm số lượng
function decreaseQuantity(index) {
  // Giảm số lượng sản phẩm
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity === 1) {
    return;
  }
  cart[index].quantity -= 1;

  // Cập nhật hiển thị số lượng
  document.getElementById(`quantity-${index}`).innerText = cart[index].quantity;

  // Cập nhật giá tiền theo số lượng mới
  const totalPrice = cart[index].price * cart[index].quantity;
  document.getElementById(`total-${index}`).innerText =
    totalPrice.toLocaleString();

  // Lưu thay đổi vào Local Storage nếu cần
  localStorage.setItem("cart", JSON.stringify(cart));
  updateTotalBill();
}

// Hàm tăng số lượng
function increaseQuantity(index) {
  // Tăng số lượng sản phẩm
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].quantity += 1;

  // Cập nhật hiển thị số lượng
  document.getElementById(`quantity-${index}`).innerText = cart[index].quantity;

  // Cập nhật giá tiền theo số lượng mới
  const totalPrice = cart[index].price * cart[index].quantity;
  document.getElementById(`total-${index}`).innerText =
    totalPrice.toLocaleString();

  // Lưu thay đổi vào Local Storage nếu cần
  localStorage.setItem("cart", JSON.stringify(cart));
  updateTotalBill();
}

function calculateTotalBill() {
  let totalBill = 0;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    totalBill += item.price * item.quantity;
  });
  return totalBill;
}

function updateTotalBill() {
  // Tính toán lại tổng bill
  const totalBill = calculateTotalBill();

  // Cập nhật giá trị hiển thị của tổng bill lên giao diện
  document.getElementById("totalBill").innerText = totalBill.toLocaleString();
}
updateTotalBill();
renderTable();
