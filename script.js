const loginSection = document.getElementById("login-section");
const signupSection = document.getElementById("signup-section");
const homeSection = document.getElementById("home-section");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const loginMessage = document.getElementById("login-message");
const signupMessage = document.getElementById("signup-message");

const showSignupLink = document.getElementById("show-signup");
const showLoginLink = document.getElementById("show-login");
const logoutBtn = document.getElementById("logout-btn");

const userNameSpan = document.getElementById("user-name");

function showSection(section) {
    document.querySelectorAll(".form-section").forEach(s => s.classList.add("hidden"));
    section.classList.remove("hidden");
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = "block";
    
    setTimeout(() => {
        element.style.display = "none";
    }, 5000);
}

const users = []; 

function checkAuth() {
    showSection(loginSection);
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    
    if (!email || !password) {
        showMessage(loginMessage, "please enter all field", "error");
        return;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        showMessage(loginMessage, "login success", "success");
        userNameSpan.textContent = user.name;
        setTimeout(() => {
            showSection(homeSection);
        }, 1000);
    } else {
        showMessage(loginMessage, "email or password is incorrect", "error");
    }
});

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    
    if (!name || !email || !password) {
        showMessage(signupMessage, "please enter all field", "error");
        return;
    }
    
    if (password.length < 6) {
        showMessage(signupMessage, "password must be at least 6 characters", "error");
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showMessage(signupMessage, "email is incorrect", "error");
        return;
    }
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        showMessage(signupMessage, "this imail is used , try another email", "error");
    } else {
        const newUser = { name, email, password };
        users.push(newUser);
        showMessage(signupMessage, "login success", "success");
        userNameSpan.textContent = newUser.name;
        setTimeout(() => {
            showSection(homeSection);
        }, 1000);
    }
});

logoutBtn.addEventListener("click", () => {
    loginForm.reset();
    signupForm.reset();
    loginMessage.style.display = "none";
    signupMessage.style.display = "none";
    showSection(loginSection);
});

showSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupMessage.style.display = "none";
    showSection(signupSection);
});

showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginMessage.style.display = "none";
    showSection(loginSection);
});

