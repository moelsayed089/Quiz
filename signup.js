import { validEmail, validUsername, validPassword } from "./validation.js";

let email = document.getElementById("email");
let username = document.getElementById("username");
let password = document.getElementById("password");
let form = document.getElementById("form");

let user = [];
if (localStorage.getItem("userData")) {
    user = JSON.parse(localStorage.getItem("userData"));
}else{
    user = [];
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validEmail() && validUsername() && validPassword()) {
            let userData = {
              email: email.value,
              username: username.value,
              password: password.value,
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            form.reset();
            window.location.href = "/Login/login.html";
    }

});

email.addEventListener("blur", () => {
    validEmail();
});

username.addEventListener("blur", () => {
    validUsername()
});

password.addEventListener("blur", () => {
    validPassword()
});

