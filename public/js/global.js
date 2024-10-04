const moodButtons = document.querySelectorAll('.mood-btn');
const modal = document.getElementById('mood-modal');
const closebtn = document.getElementById('closebtn');
const message = document.getElementById('moodtext');
const loader = document.getElementById('loader');
const getActivity = document.getElementById('get-activity')

moodButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const mood = button.getAttribute('data-mood');

        loader.classList.add('show');
        loader.classList.remove('hidden');

        const response = await fetch('/gemini/track-mood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ scale: parseInt(mood) })
        });

        const data = await response.json();
        message.innerHTML = data;

        modal.classList.add('show');
        loader.classList.add('hidden');
        loader.classList.add('show');
        modal.classList.remove('hidden');
    });
});

moodButtons.forEach(button => {
    getActivity.addEventListener('click', async () => {
        const mood = button.getAttribute('data-mood');

        loader.classList.add('show');
        loader.classList.remove('hidden');

        const response = await fetch('/gemini/get-tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ scale: parseInt(mood) })
        });

        const data = await response.json();
        message.innerHTML = data;

        modal.classList.add('show');
        loader.classList.add('hidden');
        loader.classList.add('show');
        modal.classList.remove('hidden');

    });
});

closebtn.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.classList.add('hidden');
});


const toggleButton = document.getElementById('theme-toggle');
const body = document.getElementById('body');
const background = document.querySelector('.page-bg');

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');

    if (body.classList.contains('dark-theme')) {

        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        background.style.backgroundImage = "linear-gradient(240deg, #1c1c1c 0%, #4d4d4d 100%)";
    } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>'
        background.style.backgroundImage = "linear-gradient(240deg, hsl(6deg 53% 93%) 0%, hsl(10deg 56% 93%) 16%, hsl(14deg 60% 94%) 24%, hsl(18deg 63% 95%) 30%, hsl(22deg 66% 95%) 35%, hsl(25deg 71% 96%) 40%, hsl(29deg 80% 97%) 45%, hsl(33deg 100% 98%) 50%, hsl(22deg 54% 96%) 55%, hsl(11deg 39% 93%) 60%, hsl(357deg 28% 91%) 65%, hsl(339deg 21% 87%) 70%, hsl(313deg 14% 84%) 76%, hsl(271deg 13% 81%) 84%, hsl(236deg 14% 79%) 100%)";
        spans.forEach(span => {
            span.style.color = "white";
        });
    }
});

const themeToggleButton = document.getElementById('ToggleButton');
const body1 = document.querySelector('#body2');
const anxietyElements = document.querySelectorAll('.anxiety'); // Select all elements with the class 'anxiety'

// Check if there's a saved theme in localStorage and apply it
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
}

themeToggleButton.addEventListener('click', () => {
    // Toggle between dark and light themes
    if (body1.style.backgroundColor === 'rgb(26, 32, 44)') { // For #1a202c in RGB
        applyTheme('light');
    } else {
        applyTheme('dark');
    }
});

function applyTheme(theme) {
    if (theme === 'dark') {
        body1.style.backgroundColor = '#1a202c';
        body1.style.color = 'white';
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        
        // Apply the greyish background to all .anxiety elements
        anxietyElements.forEach(element => {
            element.style.backgroundImage = 'url(../images/greyish-bg.png)'; // Greyish background for dark theme
        });
        
        localStorage.setItem('theme', 'dark');
    } else {
        body1.style.backgroundColor = 'white';
        body1.style.color = 'black';
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        
        // Apply the light background to all .anxiety elements
        anxietyElements.forEach(element => {
            element.style.backgroundImage = 'url(../images/Bg1.png)'; // Light background for light theme
        });
        
        localStorage.setItem('theme', 'light');
    }
}



let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let scroll_progress = document.getElementById("scroll");
    let progress_value = document.getElementById("scroll-value");

    let pos = document.documentElement.scrollTop;
    let pos_sc = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    
    if(pos > 100 || pos_sc > 100){
        scrollProgress.style.display = "grid";
        scroll_progress.style.display = "grid";
    }
    else{
        scrollProgress.style.display = "none";
        scroll_progress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scroll_progress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#7C3AED ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
    scroll_progress.style.background = `conic-gradient(#7C3AED ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
}
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// let calcScrollValue2 = () => {
//     let scrollProgress = document.getElementById("scroll");
//     let progressValue = document.getElementById("scroll-value");
//     let pos = document.documentElement.scrollTop;
//     let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//     let scrollValue = Math.round((pos * 100) / calcHeight);
//     if(pos > 100){
//         scrollProgress.style.display = "grid";
//     }
//     else{
//         scrollProgress.style.display = "none";
//     }
//     scrollProgress.addEventListener("click", () => {
//         document.documentElement.scrollTop = 0;
//     });
//     scrollProgress.style.background = `conic-gradient(#7C3AED ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
// }
// window.onscroll = calcScrollValue2;
// window.onload = calcScrollValue2;
