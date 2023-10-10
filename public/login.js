const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('User registered successfully');
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  }
};
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
  

  const logout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      const logoutMessage = document.createElement('p');
      logoutMessage.textContent = 'Successfully logged out!';
      document.body.appendChild(logoutMessage);
      setTimeout(() => {
        logoutMessage.style.display = 'none';
        document.location.replace('/');
    }, 3000);
    } else {
      alert('Failed to log out.');
    }
  };
  
  document
    .querySelector('#logout')
    .addEventListener('click', logout);
  