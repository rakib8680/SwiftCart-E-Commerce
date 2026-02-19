
// ---- Active Nav Link----
const navLinks = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop();
navLinks.forEach((link) => {
  link.classList.remove("active");
  const href = link.getAttribute("href");

  if (currentPage === "products.html" && href === "products.html") {
    link.classList.add("active");
  } else if (currentPage !== "products.html" && (href === "index.html" || href === "#home")) {
    link.classList.add("active");
  }
});

console.log("SwiftCart E-Commerce — App loaded");


// ---- Create Product Card ----
function createProductCard(product) {
  return `
    <div class="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div class="h-52 bg-gray-50 flex items-center justify-center p-4">
        <img src="${product.image}" alt="${product.title}" class="max-h-full max-w-full object-contain" />
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
            ${product.category}
          </span>
          <span class="text-sm text-yellow-500">
            <i class="fa-solid fa-star"></i> ${product.rating.rate}
            <span class="text-gray-400">(${product.rating.count})</span>
          </span>
        </div>
        <h3 class="font-semibold text-sm mt-2 line-clamp-1">${product.title}</h3>
        <p class="text-lg font-bold mt-1">$${product.price}</p>
        <div class="flex gap-2 mt-3">
          <button onclick="showProductDetails(${product.id})" class="flex-1 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <i class="fa-solid fa-eye mr-1"></i> Details
          </button>
          <button class="flex-1 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors">
            <i class="fa-solid fa-cart-plus mr-1"></i> Add
          </button>
        </div>
      </div>
    </div>
  `;
}


// ---- Load Trending Products ----
function loadTrendingProducts() {
  const container = document.getElementById("trending-container");
  if (!container) return;

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      const topProducts = products
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 3);

      container.innerHTML = topProducts.map((p) => createProductCard(p)).join("");
    })
    .catch((err) => {
      console.error("Error loading trending products:", err);
    });
}

loadTrendingProducts();


// ---- Load Categories ----
function loadCategories() {
  const filtersDiv = document.getElementById("category-filters");
  if (!filtersDiv) return;

  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
      categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.className =
          "px-5 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 cursor-pointer transition-colors";
        btn.textContent = category;
        btn.onclick = () => filterByCategory(category);
        filtersDiv.appendChild(btn);
      });
    });
}


// ---- Filter Products by Category ----
function filterByCategory(category) {
  const container = document.getElementById("products-container");
  if (!container) return;

  // Show loading
  container.innerHTML = `
    <div class="col-span-full text-center py-10">
      <i class="fa-solid fa-spinner fa-spin text-4xl text-indigo-600"></i>
    </div>
  `;

  // Update active button style
  const buttons = document.querySelectorAll("#category-filters button");
  buttons.forEach((btn) => {
    if (
      (category === "all" && btn.textContent === "All") ||
      btn.textContent === category
    ) {
      btn.className =
        "px-5 py-2 rounded-full text-sm font-medium bg-indigo-600 text-white cursor-pointer";
    } else {
      btn.className =
        "px-5 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 cursor-pointer transition-colors";
    }
  });

  // Fetch products
  const url =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;

  fetch(url)
    .then((res) => res.json())
    .then((products) => {
      container.innerHTML = products
        .map((p) => createProductCard(p))
        .join("");
    })
    .catch((err) => {
      console.error("Error loading products:", err);
    });
}

loadCategories();
filterByCategory("all");


// ---- Show Product Details Modal ----
function showProductDetails(productId) {
  const modal = document.getElementById("product-modal");
  const modalContent = document.getElementById("modal-content");
  if (!modal || !modalContent) return;

  // Show modal with loading spinner
  modal.showModal();
  modalContent.innerHTML = `
    <div class="text-center py-10">
      <i class="fa-solid fa-spinner fa-spin text-4xl text-indigo-600"></i>
    </div>
  `;

  // Fetch product details
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      // Generate star icons
      const fullStars = Math.floor(product.rating.rate);
      const hasHalfStar = product.rating.rate % 1 >= 0.5;
      let starsHTML = "";
      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fa-solid fa-star text-yellow-400"></i> ';
      }
      if (hasHalfStar) {
        starsHTML += '<i class="fa-solid fa-star-half-stroke text-yellow-400"></i> ';
      }

      modalContent.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-shrink-0 md:w-1/2 bg-gray-50 rounded-lg flex items-center justify-center p-6">
            <img src="${product.image}" alt="${product.title}" class="max-h-72 object-contain" />
          </div>
          <div class="flex-1">
            <span class="badge badge-primary">${product.category}</span>
            <h2 class="text-xl font-bold mt-3">${product.title}</h2>
            <div class="flex items-center gap-2 mt-2">
              <div>${starsHTML}</div>
              <span class="text-sm text-gray-500">${product.rating.rate} (${product.rating.count} reviews)</span>
            </div>
            <p class="text-2xl font-bold text-indigo-600 mt-4">$${product.price}</p>
            <p class="text-sm text-gray-500 mt-4 leading-relaxed">${product.description}</p>
            <button class="btn btn-primary w-full mt-6">
              <i class="fa-solid fa-cart-plus mr-2"></i> Add to Cart
            </button>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      console.error("Error loading product details:", err);
      modalContent.innerHTML = `<p class="text-center text-red-500 py-10">Failed to load product details.</p>`;
    });
}
