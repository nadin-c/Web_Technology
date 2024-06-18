document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.onsubmit = async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Login successful, redirect to index.html
            window.location.href = '/index.html';

        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed'); // Optional: Display an error message to the user
        }
    };
});
