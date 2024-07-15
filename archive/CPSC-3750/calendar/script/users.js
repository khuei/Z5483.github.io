let loginForm = document.getElementById("login-form");
let loginButton = document.getElementById("login-button");
let loginCancelButton = document.getElementById("login-cancel-button");
let resetCancelButton = document.getElementById("reset-cancel-button");

loginButton.addEventListener("click", () => {
    $(loginForm).fadeIn(200, "linear");
    loginForm.style.display = "flex";
});

loginCancelButton.addEventListener("click", () => {
    $("#reset-username").removeAttr('required');
    $("#reset-password").removeAttr('required');
    $("#reset-repeated-password").removeAttr('required');
    $("#reset-security").removeAttr('required');
    $("#sign-in-username").prop('required', true);
    $("#sign-in-password").prop('required', true);
    $("#reset-password-section").fadeOut(0);
    $(loginForm).fadeOut(200);
});

resetCancelButton.addEventListener("click", () => {
    $("#reset-username").removeAttr('required');
    $("#reset-password").removeAttr('required');
    $("#reset-repeated-password").removeAttr('required');
    $("#reset-security").removeAttr('required');
    $("#sign-in-username").prop('required', true);
    $("#sign-in-password").prop('required', true);
    $("#reset-password-section").fadeOut(0);
    $(loginForm).fadeOut(200);
});

let signupForm = document.getElementById("sign-up-form");
let signupButton = document.getElementById("sign-up-button");
let signupCancelButton = document.getElementById("sign-up-cancel-button");

signupButton.addEventListener("click", () => {
    $(signupForm).fadeIn(200, "linear");
    signupForm.style.display = "flex";
});

signupCancelButton.addEventListener("click", () => {
    $(signupForm).fadeOut(200);
});

let signoutForm = document.getElementById("sign-out-form");
let signoutButton = document.getElementById("sign-out-button");

signupButton.addEventListener("click", () => {
    $(loginButton).fadeIn(200, "linear");
    $(signupButton).fadeIn(200, "linear");
    $(signoutForm).fadeOUt(200);
});
