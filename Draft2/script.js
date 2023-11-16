// Function to append a message to the chat box
function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const newMessage = document.createElement('div');
    
    newMessage.innerHTML = `<span>${sender}:</span><p>${message}</p>`;
    
    if (sender === 'Rule_Mitra') {
        newMessage.className = 'chat-message chat-message--Bot';
    } else {
        newMessage.className = 'chat-message chat-message--User';
    }
    
    chatBox.appendChild(newMessage);
}

// Function to send a user message to the backend and handle the response
function sendMessage() {
    const userMessage = document.getElementById('user-input').value;
    appendMessage('You', userMessage);

     // Send the user message to the backend using a POST request at required server 
    // CHANGE HTTPS://127.0.0.1:5000 WITH YOUR BACKEND'S DEPLOYMENT ADDRESS 
    fetch('https://127.0.0.1:5000/predict', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(r => r.json())  // Parse the response as JSON
    .then(r => {
        appendMessage('Rule_Mitra', r.answer);
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('Rule_Mitra', 'Apologies, something went wrong. Please try again.');
    });

    document.getElementById('user-input').value = ''; // Clear the input field
}

// Function to handle the Enter key press and send a message
function handleKeyPress(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); // Prevent the default Enter key behavior (e.g., new line)
        sendMessage();
    }
}

// Attach an event listener to the user input field to handle Enter key presses
const userInput = document.getElementById('user-input');
userInput.addEventListener('keypress', handleKeyPress);

// Automatically scroll to the bottom of the chat box
const chatBox = document.getElementById('chat-box');
chatBox.scrollTop = chatBox.scrollHeight;
