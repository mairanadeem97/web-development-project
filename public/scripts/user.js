// Function for Registration
const registerUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Create the User Object
    const newUser = Object.fromEntries(formData.entries());
    
    console.log("--- New User Registration Object ---");
    console.log(newUser);
};

// Function for Login
const loginUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Create the Login Object
    const loginAttempt = Object.fromEntries(formData.entries());
    
    console.log("--- Login Attempt Object ---");
    console.log(loginAttempt);
};

// Event Listeners
const regForm = document.getElementById('registration-form');
if (regForm) {
    regForm.addEventListener('submit', registerUser);
}

const logForm = document.getElementById('Login-form');
if (logForm) {
    logForm.addEventListener('submit', loginUser);
}