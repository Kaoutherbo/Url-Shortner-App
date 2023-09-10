
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.registerForm');
    const loginForm = document.querySelector('.loginForm');
    const shortenForm = document.getElementById('shortener-form');
    const urlsList = document.getElementById('url-list');
    const urls = document.getElementById('urls');
    const registerFailed = document.getElementById('registerFailed');
    const loginFailed = document.getElementById('loginFailed');
    const registerSuccess = document.getElementById('registerSuccess');
    const loginSuccess  = document.getElementById('loginSuccess');
    const url = 'https://url-shortner-app-lkdd.onrender.com';
    // Function to handle user registration
    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault();

        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Send registration data to the server
        try {
            const response = await fetch(`${url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                registerSuccess.style.display = 'flex';
                registerForm.style.display = 'none';
                shortenForm.style.display ='flex';
                urlsList.style.display = 'flex';
                
            } else {
                registerFailed.style.display = 'flex';
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to handle user login
    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Send login data to the server
        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                loginSuccess.style.display = 'flex';
                loginForm.style.display = 'none';
                shortenForm.style.display ='flex';
                urlsList.style.display = 'flex';

            } else {
                loginFailed.style.display = 'flex';
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // Function to handle URL shortening form submission
const handleShortenFormSubmit = async (event) => {
    event.preventDefault();

    const originalUrl = document.getElementById('originalUrl').value;

    // Send the original URL to the server for shortening
    try {
        const response = await fetch(`${url}/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ originalUrl }),
        });

        if (response.ok) {
            const data = await response.json();
            const shortUrl = data.shortUrl;

            // Create a new <li> element
            const li = document.createElement('li');

            // Create an <a> element for the shortened URL
            const anchor = document.createElement('a');
            anchor.href = originalUrl;
            anchor.textContent = shortUrl;

            // Create a <div> element for the copy button
            const copyButton = document.createElement('div');
            copyButton.classList.add('copy');
            copyButton.innerHTML = '<ion-icon name="copy-outline"></ion-icon>';

            // Add a click event listener to the copy button
            copyButton.addEventListener('click', () => {
            // Copy the shortened URL to the clipboard
            const tempInput = document.createElement('input');
            tempInput.value = originalUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
    });
            

            // Append the elements to the <li> element
            li.appendChild(anchor);
            li.appendChild(copyButton);

            // Append the <li> element to the list
            urls.appendChild(li);

            // Clear the input field
            document.getElementById('originalUrl').value = '';
        } else {
            console.error('Shortening URL failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};




    // Event listeners for form submissions
    registerForm.addEventListener('submit', handleRegisterFormSubmit);
    loginForm.addEventListener('submit', handleLoginFormSubmit);
    shortenForm.addEventListener('submit', handleShortenFormSubmit);
    

});
