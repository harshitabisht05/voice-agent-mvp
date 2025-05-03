const micButton = document.getElementById('micButton');
const chatbox = document.getElementById('chatbox');

// Check if browser supports speech recognition
if (!('webkitSpeechRecognition' in window)) {
  chatbox.innerHTML = "⚠️ Your browser doesn't support speech recognition. Try Chrome or Edge.";
  micButton.disabled = true;
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;  // Keep listening after each speech
  recognition.interimResults = false;  // Don't show partial results

  // Handle when speech recognition starts
  recognition.onstart = () => {
    console.log("Speech recognition started");
  };

  // Handle when speech recognition ends
  recognition.onend = () => {
    console.log("Speech recognition ended");
  };

  // Handle speech recognition result
  recognition.onresult = async (event) => {
    const userText = event.results[0][0].transcript;
    addMessage('You', userText);

    // Call OpenAI API to get response
    const aiResponse = await fetchAIResponse(userText);
    addMessage('AI', aiResponse);
  };

  // Handle errors in speech recognition
  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    micButton.textContent = "Hold to Speak";
  };

  // Start listening when the button is pressed
  micButton.addEventListener('mousedown', () => {
    setTimeout(() => {
      recognition.start();
      micButton.textContent = "Listening...";
    }, 300);  // Small delay before starting recognition
  });

  // Stop listening when the button is released
  micButton.addEventListener('mouseup', () => {
    setTimeout(() => {
      recognition.stop();
      micButton.textContent = "Hold to Speak";
    }, 300);  // Small delay before stopping recognition
  });
}

// Function to add message to chatbox
function addMessage(sender, text) {
  chatbox.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
  chatbox.scrollTop = chatbox.scrollHeight;  // Auto-scroll to the bottom
}

// Function to fetch AI response from OpenAI API
async function fetchAIResponse(userText) {
  try {
    const API_KEY = "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"; // 🔒 Replace this with your OpenAI API key

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
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't process your request right now.";  // Fallback message
  }
}
