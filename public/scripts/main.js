
export function setCurrentUser(user)
{
localStorage.setItem('user', JSON.stringify(user))
}
export function getCurrentUser()
{
return JSON.parse(localStorage.getItem('user'))
}
export function removeCurrentUser(){
localStorage.removeItem('user')
}

// Make sure this is at the bottom of main.js
export function updateNavbar() {
    // We use querySelector('nav') to match the document's example
    const nav = document.querySelector('nav'); 
    if (!nav) return;

    if (getCurrentUser()) {
        // LOGGED IN VIEW
        nav.innerHTML = `
            <ul>
<a href="homepage.html">Home</a>
               <a href="product.html">Products</a>
                <a href="profile.html" id="update">Update Profile</a>
                <a href="#" id="logout">Logout</a>
<a href="cart.html">🛒 Cart</a>
            </ul>`;

        // Add the click listener for the logout ID
        const logoutLink = document.getElementById('logout');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the '#' from jumping the page
                removeCurrentUser();
                window.location.href = "login.html";
            });
        }
    } else {
        // GUEST VIEW
        nav.innerHTML = `
            <ul>
                <a href="homepage.html">Home</a>
                <a href="Registerpage.html">Register</a>
                <a href="login.html">Login</a>
            </ul>`;
    }
}

// Call the function so it runs on every page load
updateNavbar();