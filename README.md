# 🎙️ Voice Agent for Seamless Conversational Interfaces

A browser-based voice assistant that provides real-time conversational interaction using Web Speech API (Speech Recognition + Speech Synthesis).

---

## 🌐 Live Demo
[Click here to view live on GitHub Pages](https://yourusername.github.io/voice-agent/) *(update this after deploying)*

---

## 🧠 Features Demonstrated

- 🎙️ **Speech-to-Text**: Converts your voice into text.
- 🗣️ **Text-to-Speech**: Speaks responses back using synthetic voice.
- 🧠 **Context Awareness**: Remembers previous queries (e.g., weather, greetings).
- 👤 **Personalized Interactions**: Adds user-friendly responses.
- ✨ **Frontend Interface**: Clean, professional landing UI built with HTML/CSS/JS.

---

## 🛠️ Technologies Used

- HTML5 / CSS3 / JavaScript
- Web Speech API (Browser-native STT + TTS)
- Optional: Node.js/Express (for future backend)

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/yourusername/voice-agent.git
cd voice-agent
open index.html



---

### ✅ 4. **Optional: Add Backend**

If you want to add dummy API routes using Express:

**Create `server.js`:**
```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/greet', (req, res) => {
  res.json({ message: "Hello! I'm your Voice Assistant." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
