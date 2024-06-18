document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');

    form.onsubmit = async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            alert('Registration successful');
            // Redirect to login page or another action
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed');
        }
    };
});

function validateRegistration() {
    // Example validation logic
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;

    if (!email || !username) {
        alert('Please fill out all fields');
        return false;
    }

    // Add more validation logic if needed

    return true;
}
