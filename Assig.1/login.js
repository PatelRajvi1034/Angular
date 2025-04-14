document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBox = document.querySelector('.login-box');
    const registerBox = document.querySelector('.register-box');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    // Login form elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Register form elements
    const usernameInput = document.getElementById('username');
    const registerEmailInput = document.getElementById('registerEmail');
    const registerPasswordInput = document.getElementById('registerPassword');
    const usernameError = document.getElementById('usernameError');
    const registerEmailError = document.getElementById('registerEmailError');
    const registerPasswordError = document.getElementById('registerPasswordError');

    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'dashboard.html';
    }

    // Toggle between login and register forms
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
    });

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Email validation
        if (!email) {
            emailError.textContent = 'Email is required';
            return;
        }

        if (!isValidEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
            return;
        }

        // Password validation
        if (!password) {
            passwordError.textContent = 'Password is required';
            return;
        }

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Store current user in localStorage
            const currentUser = {
                id: user.id,
                username: user.username,
                email: user.email
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Show success message
            emailError.textContent = 'Login successful! Redirecting...';
            emailError.style.color = 'green';

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            passwordError.textContent = 'Invalid email or password';
        }
    });

    // Register form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset error messages
        usernameError.textContent = '';
        registerEmailError.textContent = '';
        registerPasswordError.textContent = '';

        const username = usernameInput.value.trim();
        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value;

        // Username validation
        if (!username) {
            usernameError.textContent = 'Username is required';
            return;
        }

        if (username.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            return;
        }

        // Email validation
        if (!email) {
            registerEmailError.textContent = 'Email is required';
            return;
        }

        if (!isValidEmail(email)) {
            registerEmailError.textContent = 'Please enter a valid email address';
            return;
        }

        // Password validation
        if (!password) {
            registerPasswordError.textContent = 'Password is required';
            return;
        }

        if (password.length < 6) {
            registerPasswordError.textContent = 'Password must be at least 6 characters';
            return;
        }

        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.email === email)) {
            registerEmailError.textContent = 'Email already registered';
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password
        };

        // Save user to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message
        registerEmailError.textContent = 'Registration successful! Please login.';
        registerEmailError.style.color = 'green';

        // Switch back to login form after a short delay
        setTimeout(() => {
            registerBox.style.display = 'none';
            loginBox.style.display = 'block';
            // Clear register form
            usernameInput.value = '';
            registerEmailInput.value = '';
            registerPasswordInput.value = '';
        }, 1500);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}); 