const body = document.getElementById('body');
const button = document.getElementById('theme-toggle');

button.addEventListener('click', () => {
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    button.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    button.innerHTML = '<i class="fas fa-moon"></i>'; 
  }
});