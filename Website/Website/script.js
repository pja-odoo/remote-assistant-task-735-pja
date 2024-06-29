// Example: Client-side form validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-container form');
    const registerForm = document.querySelector('.register-container form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Perform validation and submit via AJAX if needed
            console.log('Login form submitted');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Perform validation and submit via AJAX if needed
            console.log('Register form submitted');
        });
    }
});
