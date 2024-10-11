const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    // se mensagem = vazio, não faça nada
    if (message === '') {
        return;
    }
    // se mensagem = desenvolvedor, mostre nossa mensagem
    else if (message === 'developer') {
        // limpar valor do campo de entrada
        userInput.value = '';
        // anexar mensagem como usuário
        appendMessage('user', message);
        // define um tempo limite falso que mostra o carregamento no botão de envio
        setTimeout(() => {
            // envie nossa mensagem como bot(sender : bot)
            appendMessage('bot', 'This Source Coded By Lucas');
            // alterar ícone do botão para padrão
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    // senão se nenhuma das opções acima
    // anexa a mensagem do usuário à tela
    appendMessage('user', message);
    userInput.value = '';

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'ef2122feebmsh38336795674fe3cp13c5ebjsnddb427cd2a70',
            'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: `{
            "model": "gpt-3.5-turbo",
            "messages":[
                {
                    "role": "user",
                    "content": "${message}"
                }
            ]
        }`
    };
    fetch('https://chat-gpt26.p.rapidapi.com/', options).then((response) => response.json()).then((response) => {
        appendMessage('bot', response.choices[0].message.content);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }).catch((err) => {
        if (err.name === 'TypeError') {
            appendMessage('bot', 'Error : Check Your Api Key!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });
}

function appendMessage(sender, message) {
    info.style.display = "none";
    // alterar o ícone do botão de envio para carregar usando fontawesome
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    // adicione ícones dependendo de quem enviou a mensagem, bot ou usuário
    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;

}