document.addEventListener('DOMContentLoaded', () => {
    loadDressData();
    document.getElementById('cus-chatbot-button').addEventListener('click', toggleChat);
    document.getElementById('cus-chatbot-header').addEventListener('click', toggleChat);
    document.getElementById('cus-chatbot-input').addEventListener('keypress', handleKeyPress);
});

let dressData = [];

// Load dress data from local storage
function loadDressData() {
    const data = localStorage.getItem('products');
    if (data) {
        dressData = JSON.parse(data);
    } else {
        console.error('No dress data found in local storage.');
    }
}

// Toggle the chatbot's visibility
function toggleChat() {
    const chatbot = document.getElementById('cus-chatbot');
    const chatbotButton = document.getElementById('cus-chatbot-button');
    chatbot.classList.toggle('');
    chatbotButton.classList.toggle('hidden');
}

// Handle keypress event in the chatbot input field
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send a message from the user
function sendMessage() {
    const input = document.getElementById('cus-chatbot-input');
    const message = input.value;
    if (message.trim() === '') return;

    appendMessage('User', message);
    input.value = '';
    handleCustomerMessage(message);
}

// Append a message to the chatbot conversation
function appendMessage(sender, message) {
    const messageContainer = document.getElementById('cus-chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add(`${sender.toLowerCase()}-message`);
    messageElement.textContent = `${sender}: ${message}`;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom
}

// Handle customer message and generate a response
function handleCustomerMessage(message) {
    let response = 'Sorry, I did not understand that.';
    const messageLower = message.toLowerCase();

    if (messageLower.includes('hi')) {
        response = 'Hello! How can I assist you with our dresses today?';
    } else if (messageLower.includes('okay')) {
        response = 'Thank you for visiting! Have a great day!';
    } else {
        for (const dress of dressData) {
            if (messageLower.includes(dress.name.toLowerCase())) {
                if (messageLower.includes('price')) {
                    response = `The price of ${dress.name} is $${dress.price.toFixed(2)}.`;
                } else if (messageLower.includes('rating')) {
                    response = `The rating of ${dress.name} is ${dress.rating}.`;
                } else if (messageLower.includes('description')) {
                    response = `The description of ${dress.name} is ${dress.description}.`;
                } else {
                    response = `Here is the information on ${dress.name}: Price - $${dress.price.toFixed(2)}, Rating - ${dress.rating}, Description - ${dress.description}.`;
                }
                break;
            }
        }
    }

    appendMessage('Bot', response);
}