
document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    if (userInput.value.trim() !== '') {
        const userMessage = document.createElement('div');
        userMessage.classList.add('user-message');
        userMessage.textContent = userInput.value;
        chatMessages.appendChild(userMessage);

        // Add Responce generating API  here to get the response

        userInput.value = '';
    }
});