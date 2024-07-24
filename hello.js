document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const protectedButton = document.getElementById('protected-button');
    const tokenCheckButton = document.getElementById('token-check-button');
    const messageDiv = document.getElementById('message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');
            const role = formData.get('role');

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password, role }),
                });

                const data = await response.json();
                if (response.ok) {
                    messageDiv.textContent = data.message;
                    alert(data.message);
                    if (role === 'admin') {
                        window.location.href = `admin.html?username=${username}`;
                    } else {
                        window.location.href = `welcome.html?username=${username}`;
                    }
                } else {
                    messageDiv.textContent = data.error;
                }
            } catch (error) {
                messageDiv.textContent = 'An error occurred during login';
                console.error('Error:', error);
            }
        });
    }

    if (protectedButton) {
        protectedButton.addEventListener('click', async () => {
            try {
                const response = await fetch('http://localhost:3000/protected');
                const data = await response.json();
               

                if (response.ok) {
                    messageDiv.textContent = data.message;
                } else {
                    messageDiv.textContent = data.error;
                }
            } catch (error) {
                messageDiv.textContent = 'An error occurred while accessing the protected route';
                console.error('Error:', error);
            }
        });
    }

    if (tokenCheckButton) {
        tokenCheckButton.addEventListener('click', async () => {
            try {
                const response = await fetch('http://localhost:3000/check-token');
                const data = await response.json();

                if (response.ok) {
                    messageDiv.textContent = `Token: ${data.token}`;
                } else {
                    messageDiv.textContent = data.error;
                }
            } catch (error) {
                messageDiv.textContent = 'An error occurred while checking the token';
                console.error('Error:', error);
            }
        });
    }
});
