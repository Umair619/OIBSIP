document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-form");
    const registrationForm = document.querySelector(".registration-form");
    const successPage = document.querySelector(".success-page");
    const showRegistrationLink = document.getElementById("show-registration");
    const showLoginLink = document.getElementById("show-login");
    const container = document.querySelector(".container");

    const loginBackgroundUrl = "login.gif";
    const registerBackgroundUrl = "register.gif";

    showRegistrationLink.addEventListener("click", function(event) {
        event.preventDefault();
        resetInputFields(loginForm);
        container.style.backgroundImage = `url(${registerBackgroundUrl})`;
        loginForm.style.display = "none";
        registrationForm.style.display = "block";
        successPage.style.display = "none";
    });

    showLoginLink.addEventListener("click", function(event) {
        event.preventDefault();
        resetInputFields(registrationForm);
        container.style.backgroundImage = `url(${loginBackgroundUrl})`;
        registrationForm.style.display = "none";
        loginForm.style.display = "block";
        successPage.style.display = "none";
    });

    document.getElementById("registration-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const regName = document.getElementById("reg-name").value;
        const regEmail = document.getElementById("reg-email").value;
        const regPassword = document.getElementById("reg-password").value;
        
        localStorage.setItem(regEmail, JSON.stringify({ name: regName, email: regEmail, password: regPassword }));
        
        const alertMessage = `Registered Successfully!`;
        const alertButtons = `
            <div class="alert-buttons">
                <button id="alert-ok">OK</button>
                <button id="alert-login">Back to Login</button>
            </div>
        `;
        showAlert(alertMessage, alertButtons);
    });

    function showAlert(message, buttons) {
        const alertContainer = document.createElement("div");
        alertContainer.classList.add("alert-container");
        const alertBox = document.createElement("div");
        alertBox.classList.add("alert-box");
        alertBox.innerHTML = `<p class="alert-message">${message}</p>${buttons}`;
        
        alertContainer.appendChild(alertBox);
        document.body.appendChild(alertContainer);
        
        const alertOkButton = document.getElementById("alert-ok");
        const alertLoginButton = document.getElementById("alert-login");
        
        alertOkButton.addEventListener("click", function() {
            document.body.removeChild(alertContainer);
        });
        
        alertLoginButton.addEventListener("click", function() {
            document.body.removeChild(alertContainer);
            resetInputFields(registrationForm);
            loginForm.style.display = "block";
            registrationForm.style.display = "none";
            successPage.style.display = "none";
            container.style.backgroundImage = `url(${loginBackgroundUrl})`;
        });
    }

    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const loginEmail = document.getElementById("login-email").value;
        const loginPassword = document.getElementById("login-password").value;
        
        const storedRegistrationInfo = localStorage.getItem(loginEmail);
        
        if (storedRegistrationInfo) {
            const { email, password } = JSON.parse(storedRegistrationInfo);
            
            if (email === loginEmail && password === loginPassword) {
                document.getElementById("login-message").textContent = "Login successful!";
                setTimeout(function() {
                    loginForm.style.display = "none";
                    successPage.style.display = "block";
                }, 1500);
            } else {
                document.getElementById("login-message").textContent = "Login failed. Invalid credentials.";
            }
        } else {
            document.getElementById("login-message").textContent = "Login failed. Invalid credentials.";
        }
    });

    function resetInputFields(form) {
        const inputFields = form.querySelectorAll("input");
        inputFields.forEach(input => {
            input.value = "";
        });
    }

    // ... Other event listeners and code ...
});
