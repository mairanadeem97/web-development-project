import { getCurrentUser } from './main.js';

const productGrid = document.querySelector(".product-grid");

// 1. Redirect if not logged in
const user = getCurrentUser();
if (!user) {
    window.location.href = "login.html";
}

// 2. Load products
if (productGrid) {
    loadProducts();
}

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3500/products/getAllProducts');
        if (!response.ok) throw new Error("Server down");

        const products = await response.json();
        let html = "";

        products.forEach(product => {
            html += `
            <div class="product-item">
                <img src="./images/${product.Img}" alt="${product.ProductName}" width="300" height="225">
                <figcaption>${product.ProductName}</figcaption>
                <p style="font-size: 0.9em; color: #666;">${product.ProductDescription}</p>
                <p><strong>$${product.Price}</strong></p>
                <br>
                <form class="cart-form">
                    <label>Quantity:</label>
                    <input type="number" id="qty-${product.ProductId}" name="quantity" min="1" value="1" style="width: 50px;">
                    <input type="button" value="Add to Cart" onclick="handleAddToCart(${product.ProductId})">
                </form>
            </div>`;
        });

        productGrid.innerHTML = html;
    } catch (err) {
        console.error("Fetch Error:", err);
        // Removed the alert here so it doesn't annoy the user if the server is just slow
        productGrid.innerHTML = "<p>Please ensure your backend server is running on port 3500.</p>";
    }
}

// 3. Add to Cart (Global scope for the button)
window.handleAddToCart = async function(productId) {
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value) || 1;
    const user = JSON.parse(localStorage.getItem('user'));

    const cartData = {
        productId: productId,
        userId: user.userId,
        quantity: quantity
    };

    // THIS IS WHAT WAS MISSING FROM YOUR CONSOLE:
    console.log("%c [CART ACTION] ", "background: #222; color: #bada55", "Sending to database:", cartData);

    try {
        const response = await fetch('http://localhost:3500/products/addToCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartData)
        });

        if (response.ok) {
            console.log("✅ Server confirmed: Product added.");
            alert("Added to cart!");
        } else {
            console.error(" Server rejected the addition.");
        }
    } catch (err) {
        console.error("Connection failed:", err);
    }
};