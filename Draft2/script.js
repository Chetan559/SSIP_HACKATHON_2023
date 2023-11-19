function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const newMessage = document.createElement('div');
    newMessage.innerHTML = `<p><b>${sender}:</b>  ${message}</p>`;
    
    if (sender === 'Rule_Mitra') {
        newMessage.className = 'chat-message chat-message--Bot';
    } else {
        newMessage.className = 'chat-message chat-message--User';
    }
    
    chatBox.appendChild(newMessage);
}

function sendMessage() {
    const userMessage = document.getElementById('user-input').value;
    appendMessage('You', userMessage);

    // Send the user message to the backend
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: userMessage })
    })
    .then(r => r.json())
    .then(r => {
        appendMessage('Rule_Mitra', r.answer);
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('Rule_Mitra', 'Apologies, something went wrong. Please try again.');
    });
    document.getElementById('user-input').value = ''; //clear input
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); // Prevents the default Enter key behavior (e.g., new line)
        sendMessage();
    }
}

// this will send message  to the input field when Enter key is pressed 
const userInput = document.getElementById('user-input');
userInput.addEventListener('keypress', handleKeyPress);

// scroll to the bottom of the chat box automatically
const chatBox = document.getElementById('chat-box');
chatBox.scrollTop = chatBox.scrollHeight;
