const micButton = document.getElementById('micButton');
const chatbox = document.getElementById('chatbox');

// Check for speech recognition support
if (!('webkitSpeechRecognition' in window)) {
  chatbox.innerHTML = "⚠️ Your browser doesn't support speech recognition. Try Chrome or Edge.";
  micButton.disabled = true;
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;  // 👈 Set to false to process one phrase at a time
  recognition.interimResults = false;
  recognition.lang = "en-US";  // Optional: set language

  micButton.addEventListener('click', () => {
    micButton.textContent = "Listening...";
    recognition.start();
  });

  recognition.onresult = async (event) => {
    const userText = event.results[0][0].transcript;
    addMessage('You', userText);
    micButton.textContent = "Hold to Speak";

    const aiResponse = await fetchAIResponse(userText);
    addMessage('AI', aiResponse);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    addMessage('AI', "Sorry, I couldn't understand. Please try again.");
    micButton.textContent = "Hold to Speak";
  };

  recognition.onend = () => {
    micButton.textContent = "Hold to Speak";  // Reset button after each use
  };
}

// Function to display messages in chatbox
function addMessage(sender, text) {
  chatbox.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to call OpenAI API
async function fetchAIResponse(userText) {
  try {
    const API_KEY = "sk-..."; // Replace this with your actual API key
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }]
      })
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("OpenAI Error:", errorDetails);
      throw new Error("API response was not OK");
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return "Sorry, I couldn't process your request right now.";
  }
}
