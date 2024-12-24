const button = document.getElementById('theme-toggle');

window.addEventListener('load', () => {
  let theme = localStorage.getItem('theme');
  themeToggle(theme);
})

button.addEventListener('click', () => {

  if (body.classList.contains('light-theme')) {
    localStorage.setItem('theme', 'dark')
    themeToggle('dark');
  } else {
    localStorage.setItem('theme', 'light')
    themeToggle('light')
  }
});

function themeToggle(theme) {
  if (theme == 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    button.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon for dark theme
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    button.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon for light theme
  }
  
  // Logic for changing the modal box theme based on the selected theme
  const modal = document.getElementById('mood-modal');
  if (theme === 'dark') {
    modal.style.backgroundColor = '#1a202c'; // Dark background color
    modal.style.color = '#ffffff'; // Light text color
  } else {
    modal.style.backgroundColor = '#ffffff'; // Light background color
    modal.style.color = '#1a202c'; // Dark text color
  }

}

