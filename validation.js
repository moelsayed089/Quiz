let email = document.getElementById("email");
let username = document.getElementById("username");
let password = document.getElementById("password");
let emailError = document.getElementById("emailError");
let usernameError = document.getElementById("usernameError");
let passwordError = document.getElementById("passwordError");

export const validEmail = () => {
  if (email.value === "" || email.value.includes("@") === false) {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    emailError.innerHTML = "Please Enter Valid Email";
    return false;
  } else {
    email.classList.add("is-valid");
    email.classList.remove("is-invalid");
    emailError.innerHTML = "";
    return true;
  }
};

export const validUsername = () => {
  if (
    username.value === "" ||
    username.value.length < 3 ||
    username.value.includes("_") === true
  ) {
    username.classList.add("is-invalid");
    username.classList.remove("is-valid");
    usernameError.innerHTML =
      "Please Enter Valid UserName [No Space - No Underscores]";
    return false;
  } else {
    username.classList.add("is-valid");
    username.classList.remove("is-invalid");
    usernameError.innerHTML = "";
    return true;
  }
};

export const validPassword = () => {
  const passwordValue = password.value; // Extract the password value
  let hasUpperCase = false;
  let hasLowerCase = false;

  // Check if the password length is less than 8
  if (passwordValue === "" || passwordValue.length < 8) {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");
    passwordError.innerHTML =
      "Please enter your password at least 8 characters";
    return false;
  }

  for (let i = 0; i < passwordValue.length; i++) {
    if (passwordValue[i] >= "A" && passwordValue[i] <= "Z") {
      hasUpperCase = true;
    }
    if (passwordValue[i] >= "a" && passwordValue[i] <= "z") {
      hasLowerCase = true;
    }
  }

  if (!hasUpperCase || !hasLowerCase) {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");
    passwordError.innerHTML =
      "Password must contain at least one uppercase and one lowercase letter.";
    return false;
  }

  password.classList.add("is-valid");
  password.classList.remove("is-invalid");
  passwordError.innerHTML = "";
  return true;
};

// window.validEmail = validEmail;
// window.validUsername = validUsername;
// window.validPassword = validPassword;
