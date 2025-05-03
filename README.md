# 🎙️ Voice Agent for Seamless Conversational Interfaces

A browser-based voice assistant using **HTML**, **CSS**, and **JavaScript**, powered by the **Web Speech API**. This project allows users to interact through speech, with responses generated in real-time and enhanced with basic context-awareness for a smooth, conversational experience.

---

## 🌐 Live Demo

👉 [LIVE](https://stunning-bubblegum-70be6a.netlify.app/)  

---

## 🧠 App Functionality Overview

- 🎤 **Speech Recognition (STT):** Converts user speech into text using Web Speech API.
- 🗣️ **Speech Synthesis (TTS):** Speaks responses aloud.
- 🧠 **Context Awareness:** Maintains conversational context for a more natural flow (e.g., remembers if you've asked the weather).
- 🙋 **Custom Questions:** Responds to questions like “Who created you?”
- 🎨 **Clean UI:** Simple and professional layout using HTML and CSS.

---

## 📁 Project Structure
```bash
voice-agent/
├── index.html # Main page
├── style.css # Styling
├── script.js # Voice logic
└── README.md # Documentation
```

---

## 🚀 Getting Started

### ✅ Run Locally

1. Clone the repo:
```bash
git clone https://github.com/harshitabisht05/voice-agent-mvp.git
cd voice-agent-mvp
```
2. Open index.html in your browser directly — no server setup required.

🧪 Example Things to Say
- “Hello”

- “How are you?”

- “What’s the weather like?”

- “Who created you?”

- “Goodbye”

### 💻 Backend 
```bash
// Ensure the Web Speech API is supported by the browser
const startBtn = document.getElementById('startBtn');
const outputDiv = document.getElementById('output');

// Speech Recognition (STT) setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Speech Synthesis (TTS) setup
const synth = window.speechSynthesis;

startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.disabled = true;
    outputDiv.textContent = 'Listening...';
});

// Handle speech recognition result
recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    outputDiv.textContent = `You said: "${speechToText}"`;
    console.log('User said:', speechToText);

    // Process the input text (simple response for now)
    const responseText = generateResponse(speechToText);
    speakResponse(responseText);
};

// Handle speech recognition errors
recognition.onerror = (event) => {
    outputDiv.textContent = 'Sorry, I didn\'t catch that.';
    startBtn.disabled = false;
};

// Conversation Context Object
let conversationContext = {
    lastTopic: '',
    lastWeatherResponse: ''
};

// Function to generate a response based on speech input
function generateResponse(inputText) {
    let response = '';
    
    // Update conversation context based on user input
    if (inputText.toLowerCase().includes('hello')) {
        if (conversationContext.lastTopic === 'greeting') {
            response = 'Hello again! What would you like to talk about?';
        } else {
            response = 'Hi there! How can I assist you today?';
            conversationContext.lastTopic = 'greeting';
        }
    } else if (inputText.toLowerCase().includes('how are you')) {
        response = 'I\'m doing great, thanks for asking!';
        conversationContext.lastTopic = 'mood';
    } else if (inputText.toLowerCase().includes('weather')) {
        if (conversationContext.lastWeatherResponse === 'sunny') {
            response = 'The weather is still sunny and 25°C.';
        } else {
            response = 'The weather is sunny and 25°C.';
            conversationContext.lastWeatherResponse = 'sunny';
        }
        conversationContext.lastTopic = 'weather';
    } else if (inputText.toLowerCase().includes('goodbye')) {
        response = 'Goodbye! Have a great day!';
        conversationContext.lastTopic = 'goodbye';
    }
    else if (inputText.toLowerCase().includes('who created you')) {
            response = 'I was created by a developer name Harshita Bisht to assist with various tasks and provide information.';
            conversationContext.lastTopic = 'creator';
} 
    else {
        response = 'I\'m not sure how to respond to that. Can you ask something else?';
        conversationContext.lastTopic = 'unknown';
    }

    return response;
}

// Function to speak the response using TTS
function speakResponse(responseText) {
    const utterance = new SpeechSynthesisUtterance(responseText);
    synth.speak(utterance);
    utterance.onend = () => {
        startBtn.disabled = false;
    };
}
```


## 🙋‍♀️ Creator Info
Harshita Bisht
B.Tech CSE - Cloud Computing & Virtualization Technologies
🌐 [GitHub](https://github.com/harshitabisht05)
📧 harshitabisht0515@gmail.com


