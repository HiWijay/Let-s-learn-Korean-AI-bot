function sendText(){

    const myHeaders = new Headers();    //request header object
myHeaders.append("Content-Type", "application/json");   //key, value

let txtInput = document.getElementById("txtInput").value;

const raw = JSON.stringify({    //json converted to string
  "contents": [     //array
    {
      "parts": [    //array
        {
          "text": txtInput  //object
        }
      ]
    }
  ]
});

console.log(raw);

const requestOptions = {    //variable
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAhR9jV6ebJ2q26Z0cB4Z5qXMS-BTEjlJA", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    document.getElementById("chatBox").innerHTML+=`<div id="resBubble" data-aos="fade-up-left">${marked.parse(result.candidates[0].content.parts[0].text)}</div>`
    })
  .catch((error) => console.error(error));


  document.getElementById('send-button').addEventListener('click', function() {
    const messageInput = document.getElementById('txtInput');
    const chatContainer = document.getElementById('chatBox');
    const messageText = messageInput.value.trim();

    if (messageText) {
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('chat-bubble', 'right'); // Example: assumes outgoing message

        const messageContent = document.createElement('div');
        messageContent.textContent = messageText;

        messageBubble.appendChild(messageContent);
        chatContainer.appendChild(messageBubble);

        messageInput.value = ''; // Clear input
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
    }
});

}