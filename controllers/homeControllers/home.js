//! LOADING TASK
// Hiển thị hiệu ứng loading
document.getElementById("loading-animation").style.display = "block";
// Thiết lập thời gian chờ đợi 2 giây
setTimeout(function () {
  // Ẩn hiệu ứng loading
  document.getElementById("loading-animation").style.display = "none";
  // Hiển thị nội dung trang web chính
  document.getElementById("fullContent").style.display = "block";
}, 1500); // 2000 milliseconds = 2 giây
//! LOADING TASK END

// !GET SHOES LIST FROM API AND DISPLAY
let shoesList = [];
//GET SHOES LIST FROM API AND DISPLAY FUNCTION
function getShoesList() {
  let objAxios = axios({
    method: "get",
    url: "https://shop.cyberlearn.vn/api/Product",
  });
  objAxios
    .then(function (response) {
      shoesList = response.data.content;
      hienThiCarousel(response.data.content);
      hienThiProduct(response.data.content);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// CALL FUNCTION GET SHOES LIST TO DISPLAY CAROUSEL AND PRODUCT WHEN LOAD PAGE
getShoesList();

// GET NAME OF USER AND DISPLAY WHEN LOAD PAGE
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
                        src="../../public/img/muaik.png" alt="" />
                </div>
            </div>
        </div>
    </div>
      `;
  });
  document.querySelector("#index__shoesList").innerHTML = content;
}

// HIỂN THỊ CAROUSEL CỦA INDEX
function hienThiCarousel(mang) {
  // quét mảng lấy 7 item để tạo nội dung html
  let content = "";
  mang.slice(0, 7).forEach(function (item, index) {
    content += `
        <input type="radio" name="slide" id="c${index + 1}" checked>
        <label for="c${index + 1}" class="myCarousel__card">
            <div class="row">
                <div class="icon">${index + 1}</div>
                <div class="description">
                    <h4>${item.name}</h4>
                    <div class="infoAndButton">
                        <p>"Find Your Perfect Pair with Us!"</p>
                        <button class="btn button__seemore"  onclick="scrollToProduct()">
             
      See more
                      
                        </button>
                    </div>
                </div>
            </div>
        </label>
        `;
  });

  // dom tới thể index__carousel để add 7 cái cấu trúc html vào
  document.querySelector("#index__carousel").innerHTML = content;

  // dom tới các item con để css (thêm bg)
  mang.slice(0, 7).forEach(function (item, index) {
    document.querySelector(
      `.myCarousel__card[for="c${index + 1}"]`
    ).style.backgroundImage = `url('${item.image}')`;
    document.querySelector(
      `.myCarousel__card[for="c${index + 1}"]`
    ).style.backgroundPosition = "center";
    document.querySelector(
      `.myCarousel__card[for="c${index + 1}"]`
    ).style.backgroundSize = "500px";

    document.querySelector(
      `.myCarousel__card[for="c${index + 1}"]`
    ).style.backgroundRepeat = "no-repeat";
  });
}

// SCROLL TO PRODUCT
function scrollToProduct() {
  document
    .getElementById("product__title")
    .scrollIntoView({ behavior: "smooth" });
}

// MOVE TO DETAIL PAGE

// Kiểm tra xem người dùng đã đăng nhập hay chưa
function isLoggedIn() {
  return localStorage.getItem("loginInfo") !== null;
}

// Hàm chuyển hướng đến trang chi tiết sản phẩm
function moveToDetail(productId) {
  // Nếu người dùng đã đăng nhập
  if (isLoggedIn()) {
    window.location.href = `./views/detail.html?productId=${productId}`;
  } else {
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    window.location.href = "./views/loginPage.html";
  }
}

// Lắng nghe sự kiện khi người dùng nhập vào ô tìm kiếm
document.getElementById("searchInput").addEventListener("input", function () {
  const searchKeyword = this.value.toLowerCase(); // Lấy giá trị nhập vào và chuyển thành chữ thường

  // Lọc danh sách sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = shoesList.filter(function (product) {
    return product.name.toLowerCase().includes(searchKeyword);
  });

  // Hiển thị danh sách sản phẩm đã lọc
  hienThiProduct(filteredProducts);
});

// Lắng nghe sự kiện click trên các button loại sản phẩm

// Hàm để thay đổi CSS cho button category khi được nhấn
function activateButton(buttonId) {
  // Lấy danh sách tất cả các button category
  const categoryButtons = [
    document.getElementById("adidasButton"),
    document.getElementById("menButton"),
    document.getElementById("nikeButton"),
    document.getElementById("vansConverseButton"),
    document.getElementById("womenButton"),
    document.getElementById("lowToHigh"),
    document.getElementById("highToLow"),
    document.getElementById("atoz"),
    document.getElementById("ztoa"),
  ];

  // Lặp qua từng button và xóa class "active" nếu có
  categoryButtons.forEach(function (button) {
    button.classList.remove("active__buttonCategory");
  });

  // Thêm class "active" cho button được nhấn
  const activeButton = document.getElementById(buttonId);
  activeButton.classList.add("active__buttonCategory");
}

// Thêm hàm activateButton vào sự kiện click của mỗi button category
document.getElementById("adidasButton").addEventListener("click", function () {
  getProductByCategory("ADIDAS");
  activateButton("adidasButton");
});

document.getElementById("menButton").addEventListener("click", function () {
  getProductByCategory("MEN");
  activateButton("menButton");
});

document.getElementById("nikeButton").addEventListener("click", function () {
  getProductByCategory("NIKE");
  activateButton("nikeButton");
});

document
  .getElementById("vansConverseButton")
  .addEventListener("click", function () {
    getProductByCategory("VANS_CONVERSE");
    activateButton("vansConverseButton");
  });

document.getElementById("womenButton").addEventListener("click", function () {
  getProductByCategory("WOMEN");
  activateButton("womenButton");
});
// Add event listeners to the "Low To High" and "High To Low" buttons
document.getElementById("lowToHigh").addEventListener("click", function () {
  shoesList.sort((a, b) => a.price - b.price);
  hienThiProduct(shoesList);
  activateButton("lowToHigh");
});

document.getElementById("highToLow").addEventListener("click", function () {
  shoesList.sort((a, b) => b.price - a.price);
  hienThiProduct(shoesList);
  activateButton("highToLow");
});

// Add event listeners to the "A to Z" and "Z to A" buttons
document.getElementById("atoz").addEventListener("click", function () {
  // Sort the products array in ascending order of name
  shoesList.sort((a, b) => a.name.localeCompare(b.name));
  // Display the sorted products
  hienThiProduct(shoesList);
  activateButton("atoz");
});

document.getElementById("ztoa").addEventListener("click", function () {
  // Sort the products array in descending order of name
  shoesList.sort((a, b) => b.name.localeCompare(a.name));
  // Display the sorted products
  hienThiProduct(shoesList);
  activateButton("ztoa");
});
// document.getElementById("adidasButton").addEventListener("click", function () {
//   getProductByCategory("ADIDAS");
// });

// document.getElementById("menButton").addEventListener("click", function () {
//   getProductByCategory("MEN");
// });

// document.getElementById("nikeButton").addEventListener("click", function () {
//   getProductByCategory("NIKE");
// });

// document.getElementById("vansConverseButton").addEventListener("click", function () {
//     getProductByCategory("VANS_CONVERSE");
//   });

// document.getElementById("womenButton").addEventListener("click", function () {
//   getProductByCategory("WOMEN");
// });

// Hàm gọi API và hiển thị sản phẩm tương ứng với loại được chọn
function getProductByCategory(categoryId) {
  axios
    .get(
      `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${categoryId}`
    )
    .then(function (response) {
      const products = response.data.content;
      hienThiProduct(products);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Define the current page and items per page
let currentPage = 1;
const itemsPerPage = 8;

// Fetch data from the server with pagination parameters
function fetchProducts(page, itemsPerPage) {
  return axios
    .get("https://shop.cyberlearn.vn/api/Product/getpaging", {
      params: {
        pageIndex: page,
        pageSize: itemsPerPage,
      },
    })
    .then((response) => {
      // Reassign the image property
      response.data.content.items.forEach((item) => {
        let matchingShoe = shoesList.find((shoe) => shoe.name === item.name);
        if (matchingShoe) {
          item.image = matchingShoe.image;
        }
      });
      return response;
    });
}

// Display the fetched data in your UI
function displayProducts(data) {
  // Use your existing hienThiProduct function
  hienThiProduct(data);
}

// Update the pagination buttons based on the current page and total pages
function updatePaginationButtons(currentPage, totalPages) {
  let pageNumbersElement = document.getElementById("pageNumbers");
  pageNumbersElement.innerHTML = "";
  for (let i = 1; i <= 3; i++) {
    let pageElement = document.createElement("button");
    pageElement.classList.add("buttonPage");
    pageElement.innerText = i;
    pageElement.addEventListener("click", function () {
      fetchProducts(i, itemsPerPage)
        .then((response) => {
          displayProducts(response.data.content.items);
          updatePaginationButtons(i);
        })
        .catch(console.error);
    });
    pageNumbersElement.appendChild(pageElement);
  }

  // Disable the "Prev" button if the current page is the first page
  document.getElementById("prevPage").disabled = currentPage === 1;

  // Disable the "Next" button if the current page is the last page
  document.getElementById("nextPage").disabled = currentPage === 3;

  let pageButtons = document.getElementById("pageNumbers").children;
  for (let i = 0; i < pageButtons.length; i++) {
    if (i + 1 === currentPage) {
      pageButtons[i].classList.add("active__buttonPage");
    } else {
      pageButtons[i].classList.remove("active__buttonPage");
    }
  }
}

// Fetch and display products when the page loads
fetchProducts(currentPage, itemsPerPage)
  .then((response) => {
    displayProducts(response.data.content.items);
    updatePaginationButtons(currentPage, response.data.content.totalPages);
  })
  .catch(console.error);

// Add event listeners to your "Prev" and "Next" buttons
document.getElementById("prevPage").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts(currentPage, itemsPerPage)
      .then((response) => {
        displayProducts(response.data.content.items);
        updatePaginationButtons(currentPage, response.data.content.totalPages);
      })
      .catch(console.error);
  }
});

document.getElementById("nextPage").addEventListener("click", function () {
  fetchProducts(currentPage + 1, itemsPerPage)
    .then((response) => {
      if (response.data.content.items.length > 0) {
        currentPage++;
        displayProducts(response.data.content.items);
        updatePaginationButtons(currentPage, response.data.content.totalPages);
      }
    })
    .catch(console.error);
});

// Add event listener to the "Reset Sort" button
document.getElementById("resetSort").addEventListener("click", function () {
  // Fetch the products for the first page
  fetchProducts(1, itemsPerPage)
    .then((response) => {
      // Display the fetched products
      displayProducts(response.data.content.items);
      // Update the pagination buttons
      updatePaginationButtons(1, response.data.content.totalPages);
      // Remove the "active" class from all buttons
      const categoryButtons = [
        document.getElementById("adidasButton"),
        document.getElementById("menButton"),
        document.getElementById("nikeButton"),
        document.getElementById("vansConverseButton"),
        document.getElementById("womenButton"),
        document.getElementById("lowToHigh"),
        document.getElementById("highToLow"),
        document.getElementById("atoz"),
        document.getElementById("ztoa"),
      ];
      categoryButtons.forEach(function (button) {
        button.classList.remove("active__buttonCategory");
      });
    })
    .catch(console.error);
});
