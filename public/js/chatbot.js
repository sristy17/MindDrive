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

const formatTime = (date) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const sendMessage = async (message) => {
    const container = createMessageContainer('flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end');

    const innerDiv = document.createElement('div');

    const messageDiv = createMessageDiv('bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg');
    const messageP = document.createElement('p');
    messageP.className = 'text-sm';
    messageP.textContent = message;
    messageDiv.appendChild(messageP);

    const currentTime = new Date(); // Get current time
    const timeSpan = createTimestampSpan(formatTime(currentTime));

    innerDiv.appendChild(messageDiv);
    innerDiv.appendChild(timeSpan);

    const avatarImg = createAvatarImg('w-10 h-10 rounded-full', '/images/avatar.jpg');

    container.appendChild(innerDiv);
    container.appendChild(avatarImg);

    document.getElementById('message-container').appendChild(container);
}

const botmessage = async (message) => {
    const container = createMessageContainer('flex w-full mt-2 space-x-3 max-w-xs');

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'flex-shrink-0 h-10 w-10 rounded-full z-10 bg-white';
    const avatarImg = createAvatarImg('rounded-full', '/images/bot.png');
    avatarDiv.appendChild(avatarImg);

    const innerDiv = document.createElement('div');

    const messageDiv = createMessageDiv('bg-white p-3 rounded-r-lg z-10 rounded-bl-lg');
    const messageP = document.createElement('p');
    messageP.className = 'text-sm';

    loader.style.display = 'block';

    // API CALL HERE
    const reply = await fetchBotResponse(message);

    loader.style.display = 'none';

    messageP.textContent = reply;
    messageDiv.appendChild(messageP);

    const currentTime = new Date(); // Get current time
    const timeSpan = createTimestampSpan(formatTime(currentTime));

    innerDiv.appendChild(messageDiv);
    innerDiv.appendChild(timeSpan);

    container.appendChild(avatarDiv);
    container.appendChild(innerDiv);

    document.getElementById('message-container').appendChild(container);
}

const createMessageContainer = (className) => {
    const container = document.createElement('div');
    container.className = className;
    return container;
}

const createMessageDiv = (className) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = className;
    return messageDiv;
}

const createTimestampSpan = (text) => {
    const timeSpan = document.createElement('span');
    timeSpan.className = 'text-xs z-10 text-white text-bold leading-none';
    timeSpan.textContent = text;
    return timeSpan;
}

const createAvatarImg = (className, src) => {
    const avatarImg = document.createElement('img');
    avatarImg.className = className;
    avatarImg.src = src;
    avatarImg.alt = '';
    return avatarImg;
}

botmessage("Hi");

sendBtn.addEventListener('click', () => {
    var userMessage = inputbox.value;
    if (!userMessage || userMessage === '') {
        alert("Message shouldn't be empty!");
    } else {
        const message = userMessage.trim();
        user.message = message;
        inputbox.value = "";

        sendMessage(user.message);
        botmessage(user.message);
    }
});