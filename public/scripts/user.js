
console.log("User script loaded successfully!");// 1. grab the form and assign to a variable
let loginForm = document.getElementById("loginForm")
let registerForm = document.getElementById("registerForm")
//2. add event listener to our form by using loginForm name
// make sure to check to see if loginForm exists before adding event listener
if(loginForm) loginForm.addEventListener('submit', login)
if(registerForm) registerForm.addEventListener('submit', register)
// 3. create function that will take in data from form and create a new User object
function login(e) {
    e.preventDefault()
console.log("Login function triggered!"); // Add this line
    let email = document.getElementById("email").value
    let password = document.getElementById("passwd").value
    if(checkPassword(password)) {
        const user = {
            email: email,
            password: password
        }
        // make fetch call to login route in server's user.js route file
        fetchData('/users/login', user, 'POST')
        .then(data => {
          if(!data.message) {
            window.location = "product.html"
          }
        })
        .catch(err => {
          let error = document.getElementById("error")
          error.innerText=err.message
          document.getElementById("passwd").value=""
        })
        
    } else {
        console.log("Password sucks! Do better.")
    }
console.log("Submit clicked!")
}


function checkPassword(password) {
    return true;
}
// 4. Registration function following the exact same lines of code as login
function register(e) {
    e.preventDefault()
    console.log("Register function triggered!"); 

    // Grabbing data from the registration form fields
    let firstName = document.getElementById("firstName").value
    let lastName = document.getElementById("lastName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("passwd").value

    if(checkPassword(password)) {
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        // make fetch call to register route in server's user.js route file
        fetchData('/users/register', newUser, 'POST')
        .then(data => {
          if(!data.message) {
            alert("Registration successful!")
            window.location = "product.html"
          }
        })
        .catch(err => {
          let error = document.getElementById("error")
          error.innerText=err.message
          document.getElementById("passwd").value=""
        })
        
    } else {
        console.log("Password sucks! Do better.")
    }
    console.log("Submit clicked!")
}

function checkPassword(password) {
    return true;
}
// fetchData function: use for POST, PUT, and DELETE. 
// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3500${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}