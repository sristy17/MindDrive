var sendBtn = document.getElementById('sendBtn');
var inputbox = document.getElementById('inputbox');
var loader = document.getElementById('loader');

var user = { message: "" };

const fetchBotResponse = async (message) => {
    try {
        const params = new URLSearchParams();
        params.append('message', message);

        const response = await fetch('/gemini/bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

const sendMessage = (message, timeAgo) => {
    const container = document.createElement('div');
    container.className = 'flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end';

    const innerDiv = document.createElement('div');

    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg';
    const messageP = document.createElement('p');
    messageP.className = 'text-sm';
    messageP.textContent = message;
    messageDiv.appendChild(messageP);

    const timeSpan = document.createElement('span');
    timeSpan.className = 'text-xs text-gray-500 leading-none';
    timeSpan.textContent = timeAgo;

    innerDiv.appendChild(messageDiv);
    innerDiv.appendChild(timeSpan);

    const avatarImg = document.createElement('img');
    avatarImg.className = 'w-10 h-10 rounded-full';
    avatarImg.src = '/images/avatar.jpg';
    avatarImg.alt = '';

    container.appendChild(innerDiv);
    container.appendChild(avatarImg);

    document.getElementById('message-container').appendChild(container);
}

const botmessage = async (message, timeAgo) => {
    const container = document.createElement('div');
    container.className = 'flex w-full mt-2 space-x-3 max-w-xs';

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'flex-shrink-0 h-10 w-10 rounded-full bg-gray-300';
    const avatarImg = document.createElement('img');
    avatarImg.className = 'rounded-full';
    avatarImg.src = '/images/bot.png';
    avatarImg.alt = '';
    avatarDiv.appendChild(avatarImg);

    const innerDiv = document.createElement('div');

    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-gray-300 p-3 rounded-r-lg rounded-bl-lg';
    const messageP = document.createElement('p');
    messageP.className = 'text-sm';

    loader.style.display = 'block';

    // API CALL HEERE 
    const reply = await fetchBotResponse(message);

    loader.style.display = 'none';

    messageP.textContent = reply;
    messageDiv.appendChild(messageP);

    const timeSpan = document.createElement('span');
    timeSpan.className = 'text-xs text-gray-500 leading-none';
    timeSpan.textContent = timeAgo;

    innerDiv.appendChild(messageDiv);
    innerDiv.appendChild(timeSpan);

    container.appendChild(avatarDiv);
    container.appendChild(innerDiv);

    document.getElementById('message-container').appendChild(container);
}
    botmessage("Hi", '2 mins ago');

sendBtn.addEventListener('click', () => {

    var userMessage = inputbox.value;
    if (!userMessage || userMessage === '') alert("Message shouldn't be empty!")
    else {
        const message = userMessage.trim();
        user.message = message;
        inputbox.value = ""

        sendMessage(user.message, '2 mins ago');
        botmessage(user.message, '2 min ago');
    }
})