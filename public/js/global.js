const moodButtons = document.querySelectorAll('.mood-btn');
const modal = document.getElementById('mood-modal');
const closebtn = document.getElementById('closebtn');
const message = document.getElementById('moodtext');
const loader = document.getElementById('loader');

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

closebtn.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.classList.add('hidden');
});
