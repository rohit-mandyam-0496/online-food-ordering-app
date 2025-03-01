console.log("script.js is connected!");
// Global Variables
let cart = [];
let menuItems = [];

// Function to Fetch Menu Data
async function fetchMenuItems() {
    try {
        const response = await fetch("menu.json");
        if (!response.ok) {
            throw new Error("Failed to load menu data");
        }
        menuItems = await response.json();
        displayMenuItems("Burgers");
    } catch (error) {
        console.error("Error fetching menu data:", error);
    }
}

// Function to Display Menu Items Based on Category
function displayMenuItems(category) {
    const menuContainer = document.querySelector("#menu-items .row");
    menuContainer.innerHTML = "";

    const filteredItems = menuItems.filter(item => item.category === category);
    if (filteredItems.length === 0) {
        menuContainer.innerHTML = "<p>No items found for this category.</p>";
        return;
    }

    filteredItems.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("col-md-4", "mb-3");

        menuItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">$${item.price.toFixed(2)}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const itemId = parseInt(e.target.getAttribute("data-id"));
            addItemToCart(itemId);
        });
    });
}

// Function to Add Items to Cart
function addItemToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        cart.push(item);
        updateCartDisplay();
    }
}

// Function to Update the Cart Display
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = `
        <h2>Your Cart</h2>
        ${cart.length === 0 ? "<p>No items in cart.</p>" : ""}
    `;

    const cartList = document.createElement("ul");
    cartList.classList.add("list-group");

    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="btn btn-sm btn-danger remove-from-cart" data-index="${index}">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });

    cartContainer.appendChild(cartList);

    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const itemIndex = parseInt(e.target.getAttribute("data-index"));
            removeItemFromCart(itemIndex);
        });
    });
}

// Function to Remove Items from Cart
function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Event Listeners for Category Buttons
document.querySelectorAll("#food-categories .btn").forEach(button => {
    button.addEventListener("click", (e) => {
        const category = e.target.textContent;
        displayMenuItems(category);
    });
});

// Fetch menu data and initialize
fetchMenuItems();
