//! LOADING TASK
// Hiển thị hiệu ứng loading
document.getElementById("loading-animation").style.display = "block";

// Thiết lập thời gian chờ đợi 1.5 giây
setTimeout(function () {
  // Ẩn hiệu ứng loading
  document.getElementById("loading-animation").style.display = "none";
  // Hiển thị nội dung trang web chính
  document.getElementById("fullContent").style.display = "block";
}, 1500);

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

//! RENDER PRODUCT DETAILS
// Lấy thông tin sản phẩm từ query parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

// Gọi API để lấy thông tin sản phẩm dựa trên productId
let objAxios = axios({
  method: "get",
  url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`,
});
objAxios
  .then(function (response) {
    // CREATE PRODUCT INFO
    const productInfo = response.data.content;
    console.log(productInfo);
    const reLatedProduct = response.data.content.relatedProducts;
    hienThiProduct(reLatedProduct);
    // RENDER PRODUCT DETAILS
    document.querySelector("#details__name").innerText =
      response.data.content.name;
    document.querySelector("#details__name").style.textTransform = "capitalize";
    document.querySelector("#details__price").innerText =
      response.data.content.price;
    document.querySelector("#details__desc").innerText =
      response.data.content.description;
    document.querySelector("#details__img").src = response.data.content.image;
    document.querySelector("#quantityText").innerText =
      response.data.content.quantity + " Avalible";
    content = "";
    response.data.content.size.map(function (item, index) {
      content += `<button onclick="selectSize(this)" class="col">${item}</button>`;
    });
    document.querySelector("#details__size").innerHTML = content;

    // Lưu thông tin sản phẩm vào Local Storage
    localStorage.setItem("currentProduct", JSON.stringify(productInfo));
  })
  .catch(function (error) {
    console.log(error);
  });

//! CSS FOR SELECTED SIZE
function selectSize(button) {
  // Lấy danh sách tất cả các button trong phần tử có class là "allInfo__size__choose"
  var sizeButtons = document.querySelectorAll(".allInfo__size__choose button");

  // Lặp qua từng button và xóa class "clicked" nếu có
  sizeButtons.forEach(function (item) {
    item.classList.remove("clicked");
  });

  // Thêm class "clicked" cho button được click
  button.classList.add("clicked");
}

// DECREASE INCREASE QUANTITY
function decreaseQuantity() {
  var quantityInput = document.getElementById("quantityValue");
  var currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
}

// INCREASE QUANTITY
function increaseQuantity() {
  var quantityInput = document.getElementById("quantityValue");
  var currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
}

function addProductToCart() {
  // Lấy thông tin sản phẩm từ Local Storage
  const productInfo = JSON.parse(localStorage.getItem("currentProduct"));

  // Tạo một sản phẩm mới
  const productId = productInfo.id;
  const productName = productInfo.name;
  const productPrice = productInfo.price;
  const productImg = productInfo.image;
  const productQuantity = parseInt(
    document.getElementById("quantityValue").value
  );
  const product = new Product(
    productId,
    productName,
    productPrice,
    productQuantity,
    productImg
  );

  // Lấy danh sách sản phẩm từ Local Storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  let existingProductIndex = -1;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      existingProductIndex = i;
      break;
    }
  }

  // Nếu sản phẩm đã tồn tại, chỉ cập nhật số lượng
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += product.quantity;
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
    cart.push(product);
  }

  // Lưu danh sách sản phẩm mới vào Local Storage
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "../views/cart.html";
}

// HIỂN THỊ MẢNG PRODUCT CỦA INDEX
function hienThiProduct(mang) {
  let content = "";
  // quét mảng lấy full item để tạo nội dung html
  mang.map(function (item, index) {
    content += `
        <div class="product__item col-3">
        <div class="outDiv" style="margin-top: 50px;">
            <div class="box">
                <div class="card">
                    <img src="${item.image}" class=" img-fluid"
                        alt="...">
                    <div class="card-body">
                        <h3 class="card-title">${item.name}</h3>
                        <button class="btn product__card__btn__text">Mua kèm deal sốc 🤩</button>
                        <p class="card-text">${item.price}
        <span class="currency">đ</span>
                        <span >700<span class="currency">đ</span></span></p>
                        <p><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                class="fa fa-star"></i><i class="fa fa-star"></i> <span>Đã bán 8.9k</span></p>
                        <p>TP.Hồ Chí Minh</p>
                    </div>
                </div>
                <div class="overlay">
                    <div class="myArrow">
                        <i class="fa fa-angle-double-down"></i>
                    </div>
                    <button class="btn__cart" onclick="moveToDetail(${item.id})">
                        <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1"
                            id="Layer_1" class="sparkle">
                            <path
                                d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z">
                            </path>
                        </svg>
                        <span class="text">Buy now</span>
                    </button>
                </div>
            </div>
            <div class="gioDienThoai">
                <div>
                    <img class="img-fluid"
                        src="../../assets/img/muaik.png" alt="" />
                </div>
            </div>
        </div>
    </div>
      `;
  });
  document.querySelector("#index__shoesList").innerHTML = content;
}
