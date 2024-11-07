let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let listProducts = [];
let carts = [];

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <div class="image"><img src="${product.image}" class="img" alt="${product.alt}"></div>
                <div class="name"><h2>${product.name}</h2></div>
                <div class="price">$${product.price}</div>
                <button class="my-buttons addCart">Add To Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity += 1; // Increment quantity by 1
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;  // Reset total quantity each time
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity; // Increment total quantity
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            
            // Find the product details by id
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            
            // Calculate the total price based on quantity
            let totalPrice = info.price * cart.quantity;
            
            newCart.innerHTML = `
                <div class="visual">
                    <img src="${info.image}">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    $${totalPrice.toFixed(2)}
                </div>
                <div class="quantity">
                    <span class="minus" data-id="${cart.product_id}">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus" data-id="${cart.product_id}">+</span>
                    <button class="delete btn btn-block btn-secondary" data-id="${cart.product_id}">Remove</button> <!-- Delete button -->
                </div>
            `;
            
            listCartHTML.appendChild(newCart);
        });
        iconCartSpan.innerText = totalQuantity;  // Update only once
        addCartToMemory();  // Save cart to local storage
        
        // Add event listeners for plus, minus, and delete buttons
        listCartHTML.querySelectorAll('.plus').forEach(button => {
            button.addEventListener('click', (event) => {
                let product_id = event.target.dataset.id;
                updateQuantity(product_id, 1);
            });
        });

        listCartHTML.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', (event) => {
                let product_id = event.target.dataset.id;
                updateQuantity(product_id, -1);
            });
        });

        listCartHTML.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (event) => {
                let product_id = event.target.dataset.id;
                deleteCartItem(product_id); // Call delete function
            });
        });
    }
};

const updateQuantity = (product_id, change) => {
    // Find the cart item and update its quantity
    let cartItem = carts.find(item => item.product_id == product_id);
    if (cartItem) {
        cartItem.quantity += change;

        // Prevent quantity from going below 1
        if (cartItem.quantity < 1) {
            cartItem.quantity = 1;
        }

        // Save updated cart to local storage and re-render the cart
        addCartToMemory();
        addCartToHTML();
    }
};

// Function to delete a cart item
const deleteCartItem = (product_id) => {
    carts = carts.filter(item => item.product_id != product_id); // Remove item from cart
    addCartToMemory(); // Update local storage
    addCartToHTML(); // Re-render cart
};

const initApp = () => {
    fetch('javascript/products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });
};

initApp();
