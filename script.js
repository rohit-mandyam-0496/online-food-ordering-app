// Global Variables
let menuData = [];

// Function to Fetch Menu Data
async function fetchMenuData() {
  try {
    const response = await fetch("menu.json"); // Ensure menu.json exists in the correct folder
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    menuData = await response.json();
    console.log("Menu data loaded:", menuData); // Debugging
    loadMenu("Burgers");
    // loadMenu("Pizzas");
    // loadMenu("Drinks");
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
}

// Function to Load Menu Items Based on Category
function loadMenu(category) {
  const menuContainer = document.querySelector("#menu-items .row");
  if (!menuContainer) return; // Prevents errors on pages without menu sections
  menuContainer.innerHTML = ""; // Clear previous items

  console.log("Loading menu for category:", category); // Debugging

  const filteredItems = menuData.filter((item) => item.category === category);
  if (filteredItems.length === 0) {
    menuContainer.innerHTML = "<p>No items found for this category.</p>";
    return;
  }

  filteredItems.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("col-md-4", "mb-3");

    menuItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Rs. ${item.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${
                      item.id
                    }">Add to Cart</button>
                </div>
            </div>
        `;
    menuContainer.appendChild(menuItem);
  });

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.getAttribute("data-id"));
      addToCart(itemId);
    });
  });
}

// Function to Add Items to Cart
function addToCart(itemId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = menuData.find((item) => item.id === itemId);

  if (!item) {
    console.error("Item not found in menuData:", itemId);
    return;
  }

  let existingItem = cart.find((cartItem) => cartItem.id === itemId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${item.name} added to cart!`);
}

// Function to Update Cart Count in Navbar
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

// Function to Remove Items from Cart (Used in cart.js)
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Event Listeners for Category Buttons
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("#food-categories .btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.textContent.trim();
      console.log("Category clicked:", category); // Debugging
      loadMenu(category);
    });
  });
});

// Fetch Menu Data and Initialize the Page
document.addEventListener("DOMContentLoaded", function () {
  fetchMenuData();
  updateCartCount();
});
