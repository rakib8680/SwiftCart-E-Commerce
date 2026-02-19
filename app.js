
// ---- Mobile Menu Toggle ----
const menuToggle = document.getElementById("menu-toggle");
const mobileSidebar = document.getElementById("mobile-sidebar");
const mobileOverlay = document.getElementById("mobile-overlay");

menuToggle.addEventListener("click", () => {
  mobileSidebar.classList.remove("-translate-x-full");
  mobileOverlay.classList.remove("hidden");
});

function closeMobileMenu() {
  mobileSidebar.classList.add("-translate-x-full");
  mobileOverlay.classList.add("hidden");
}

// ---- Active Nav Link ----
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    const href = this.getAttribute("href");
    document.querySelectorAll(`.nav-link[href="${href}"]`).forEach((l) => {
      l.classList.add("active");
    });
  });
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
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      // Sort by rating and get top 3
      const topProducts = products
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 3);

      const container = document.getElementById("trending-container");
      container.innerHTML = topProducts.map((p) => createProductCard(p)).join("");
    })
    .catch((err) => {
      console.error("Error loading trending products:", err);
    });
}

// Load trending products when page loads
loadTrendingProducts();
