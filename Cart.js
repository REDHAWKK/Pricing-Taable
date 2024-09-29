// Get the cart from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Select the container where cart items will be inserted
const cartItemsContainer = document.getElementById('cart-items');
const totalElement = document.getElementById('total');

let total = 0;

// Function to display each item in the cart
function displayCartItems() {
    cartItemsContainer.innerHTML = ''; // Clear previous content
    total = 0; // Reset total

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-container';

        div.innerHTML = `
            <div class="product-image">
                <img src="path_to_image/${item.product}.jpg" alt="${item.product}"> <!-- You can change this to actual image URLs -->
            </div>
            <div class="product-detail">
                <p>${item.product} - $${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity">
                <input type="number" value="1" min="1" id="quantity-${index}">
                <button class="btn btn-warning" onclick="updateItem(${index})">Update</button>
                <button class="btn btn-danger" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(div);
        total += item.price; // Add to total price
    });

    totalElement.textContent = total.toFixed(2); // Update total display
}

// Function to update item quantity and total
function updateItem(index) {
    const quantity = document.getElementById(`quantity-${index}`).value;
    const pricePerItem = cart[index].price; // Assuming price is per item
    const updatedPrice = pricePerItem * quantity;

    cart[index].price = updatedPrice; // Update the price for that item
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
    displayCartItems(); // Refresh the display
}

// Function to remove item from the cart
function removeItem(index) {
    cart.splice(index, 1); // Remove item from cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
    displayCartItems(); // Refresh the display
}

// Initial call to display cart items
displayCartItems();
