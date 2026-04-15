const handleAddToCart = (event) => {
    event.preventDefault(); // Stops the "Cannot GET" error

    const form = event.target;
    const formData = new FormData(form);
    
    // This creates the object using the 'name' attributes from your HTML
    const productData = Object.fromEntries(formData.entries());

    console.log("--- New Item Captured ---");
    console.log(productData); 
};

// Apply this to every product on your page
document.querySelectorAll('.cart-form').forEach(form => {
    form.addEventListener('submit', handleAddToCart);
});