document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.getElementById('admin-chatbot-button');
    const chatbot = document.getElementById('chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');

    let state = 0;
    let selectedDresses = [];
    let discounts = [];

    chatbotButton.addEventListener('click', () => {
        chatbot.classList.toggle('hidden');
        chatbotInput.focus();
    });

    function addMessage(text, sender = 'bot') {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'admin-message');
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function handleAdminMessage(message) {
        switch (state) {
            case 0:
                addMessage('Hello Admin! Im here to apply the discount For selected Products');
                state = 1;
                break;
            case 1:
                // selectedDresses = message.split(',').map(dress => dress.trim());
                addMessage('Please provide the discount percentages To add the products');
                state = 2;
                break;
            case 2:
                const numbers =parseInt(message) // Use regex to find numbers
                // Check if the numbers are valid discounts
                if (numbers && numbers >= 0 && numbers <= 100) {
                    discounts = numbers;
                    addMessage('please provide the product Ids to apply discount and ensure to seperate the products with comma')
                } else {
                    addMessage('Please provide valid discount percentages and ensure the number matches the number of dresses.');
                }
                state=3;
                break;
                // discounts = message.split(',').map(d => d.trim().replace('%', ''));
                // if (discounts.every(d => !isNaN(d) && d >= 0 && d <= 100) && discounts.length === selectedDresses.length) {
                //     localStorage.setItem('selectedDresses', JSON.stringify(selectedDresses));
                //     localStorage.setItem('discounts', JSON.stringify(discounts));
                //     addMessage(`Discounts have been applied: ${selectedDresses.join(', ')} with discounts ${discounts.join(', ')}%`);
                //     state = 0; // Reset state for the next interaction
                // } else {
                //     addMessage('Please provide valid discount percentages and ensure the number matches the number of dresses.');
                // }

            case 3:
                const productIds = message.split(',').map(Number);
                applyDiscountToSelectedProducts(discounts,productIds)
                addMessage("SucessFully added the discount to Products")
                state = 4;
                break;
            case 4:
               
        }
    }

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, 'admin');
                handleAdminMessage(message);
                chatbotInput.value = '';
            }
        }
    });
});
