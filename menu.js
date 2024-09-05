// Filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('tbody tr');

// Search bar
const searchBar = document.getElementById('search-bar');

// Filter by category
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterMenu(category, searchBar.value.toLowerCase());

        // Set active class on the clicked button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Search by text input
searchBar.addEventListener('input', () => {
    const searchText = searchBar.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active');
    const category = activeCategory ? activeCategory.getAttribute('data-category') : 'All';
    filterMenu(category, searchText);
});

// Filter function
function filterMenu(category, searchText) {
    let currentCategory = null;
    let displayCategory = false;

    menuItems.forEach(item => {
        const isCategoryHeader = item.querySelector('strong');
        if (isCategoryHeader) {
            currentCategory = item.querySelector('strong').textContent;
            displayCategory = (category === 'All' || category === currentCategory);
            item.style.display = displayCategory ? '' : 'none';
        } else {
            const itemName = item.querySelector('td').textContent.toLowerCase();
            const matchesSearch = itemName.includes(searchText);
            item.style.display = (displayCategory && matchesSearch) ? '' : 'none';
        }
    });
}


const addToCartButtons = document.querySelectorAll('.order-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

let cart = {};

// Add event listeners to all "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemRow = button.closest('tr');
        const itemName = itemRow.querySelector('td').textContent;
        const itemPrice = parseInt(itemRow.querySelectorAll('td')[1].textContent);

        addItemToCart(itemName, itemPrice);
        updateCartUI();
    });
});

// Add item to cart
function addItemToCart(itemName, itemPrice) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 };
    }
}

// Update the cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    for (const itemName in cart) {
        const cartItem = cart[itemName];
        const itemTotal = cartItem.price * cartItem.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('li');
        cartItemElement.textContent = `${itemName} - ₹${cartItem.price} x ${cartItem.quantity} = ₹${itemTotal}`;
        cartItemsContainer.appendChild(cartItemElement);
    }

    cartTotalElement.textContent = total;
}

const checkoutButton = document.getElementById('checkout-btn');

// Handle Checkout button click
checkoutButton.addEventListener('click', () => {
    // Store the cart in localStorage so it can be accessed on the payment page
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to payment.html
    window.location.href = 'payment.html';
});
