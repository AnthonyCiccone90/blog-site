const logout = async () => {
  const response = await fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Logged out successfully!');
    setTimeout(() => {
      document.location.replace('/'); 
    }, 1000); 
  } else {
    alert('Failed to log out.');
  }
};

document
  .querySelector('#logout')
  .addEventListener('click', logout);
