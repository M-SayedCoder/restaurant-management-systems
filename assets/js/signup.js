const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
});

const toggleLogin = document.getElementById("toggleLogin");
const toggleSignup = document.getElementById("toggleSignup");
const toggleRePassword = document.getElementById("toggleRePassword");

const showHidePassword = (toggleBtnId, inputId) => {
    const input = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleBtnId);
    input.type = input.type === "password" ? "text" : "password";
    toggleBtn.classList.toggle("fa-eye-slash");
};

toggleLogin.addEventListener("click", () => showHidePassword("toggleLogin", "loginPassword"));
toggleSignup.addEventListener("click", () => showHidePassword("toggleSignup", "signupPassword"));
toggleRePassword.addEventListener("click", () => showHidePassword("toggleRePassword", "signupRePassword"));

document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

function toast(message) {
    alert(message);
}

signupForm.addEventListener("submit", e => {
    e.preventDefault();

    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("rePasswordError").textContent = "";

    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const rePassword = document.getElementById("signupRePassword").value;

    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Invalid email";
        isValid = false;
    }
    if (password.length < 6) {
        document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
        isValid = false;
    }
    if (password !== rePassword) {
        document.getElementById("rePasswordError").textContent = "Passwords do not match";
        isValid = false;
    }
    if (!isValid) return;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ name, email, pass: password });
    localStorage.setItem("users", JSON.stringify(users));

    toast("Sign Up successful ✅");
    signupForm.reset();
    loginTab.click();
});

loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const remember = document.getElementById("rememberMe").checked;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.pass === password);

    if (user) {
        toast("Logged In ✅");
        if (remember) localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
        toast("Invalid credentials ❌");
    }
});

window.addEventListener("load", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
        document.getElementById("loginEmail").value = currentUser.email;
        document.getElementById("loginPassword").value = currentUser.pass;
        document.getElementById("rememberMe").checked = true;
    }
});
