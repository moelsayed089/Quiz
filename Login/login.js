import { validEmail, validPassword } from "../validation.js";
let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("form");
let errorMeg = document.getElementById("errorMeg");

let user = [];
user = JSON.parse(localStorage.getItem("userData")) || []; 
console.log(user);

form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  if (validEmail() && validPassword()) {
    checkuser();
  }
});

function checkuser() {

    if (email.value === user.email && password.value === user.password) {
        console.log("Login Successful");
        window.location.href = "/Quiz/index.html";
    }
    else {

        errorMeg.innerHTML = "Invalid Email or Password";
    }
  }


  email.addEventListener("blur", () => {
      validEmail();
  })

  password.addEventListener("blur", () => {
      validPassword();
  })
