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

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if(pos > 100){
        scrollProgress.style.display = "grid";
    }
    else{
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#7C3AED ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
}
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
