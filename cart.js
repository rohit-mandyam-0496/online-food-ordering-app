document.addEventListener("DOMContentLoaded", function () {
  loadCart();
});

// Function to load cart items from localStorage
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = ""; // Clear previous items
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.name}</td>
            <td>Rs. ${item.price.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)">+</button>
            </td>
            <td>Rs. ${itemTotal.toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
        `;

    cartItemsContainer.appendChild(row);
  });

  cartTotalElement.textContent = totalPrice.toFixed(2);
}

// Function to update item quantity
function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1); // Remove item if quantity is 0
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Function to clear the entire cart
document.getElementById("clear-cart").addEventListener("click", function () {
  localStorage.removeItem("cart");
  loadCart();
});

// Function to proceed to checkout (Future Implementation)
document.getElementById("checkout").addEventListener("click", function () {
  alert("Checkout feature coming soon!");
});
