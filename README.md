# BridgeTalk 🧠🔊💬

**BridgeTalk bridges speech-impaired people over voice calls quickly.**  
It enables real-time voice + text communication between two parties:
- **Speaker A** (voice user): Talks through a mic and listens.
- **Speaker B** (speech-impaired user): Types prompts that are expanded and spoken aloud by the app.

### 🧩 Features
- ⚡ Real-time chat system using Socket.IO with role-based interaction.
- 🎤 Speaker A: Live speech-to-text transcription with interim and final results.
- 🧏 Speaker B: Clean chat input interface for typed prompts.
- 💬 Interim messages shown live in the chat interface (not broadcasted).
- 🌐 WebRTC audio stream from Speaker A to B.
- 🧠 Room-based connection logic.
- 🔄 Auto-scroll and intelligent message display.

### 🚧 Roadmap
- [ ] **LLM integration**: Track conversation context and generate rich responses.
- [ ] **Voice synthesis**: Generated messages are read out to Speaker A.
- [ ] **Authentication**: Basic user identity or room security.
- [ ] **Accessibility improvements**: Larger fonts, screen reader support, etc.

---

## 📦 Getting Started

#### Prerequisites
- Node.js v18+
- Yarn or npm
- A tunneling service like [ngrok](https://ngrok.com/) for local testing (for WebRTC + Socket.IO)

---

## 🚀 Run Locally

#### 💾 Install dependencies
Fork the repository and run as follows:

```bash
# for the frontend
git clone https://github.com/{your-username}/BridgeTalk.git
cd BridgeTalk
npm install

# for the server
cd ../realtime-server
npm install
```

#### 🏃‍♂️ Running the build
After installation deploy BridgeTalk and realtime-server as follows:
```bash
# go back to BridgeTalk folder
npm run dev

# Deploy the WebRTC server
cd realtime-server
node server.js
```

---

## ☁️ Deploy on Vercel + Render

Fork the repository in GitHub and do the following:

#### Deploy the backend on Render

1. Select **New** | **Web Service**
2. Select **{your-username}/bridgetalk**
3. Set **Root Directory** to **realtime-server**
4. Set **Build Command** to **npm install**
5. Set **Start Command** to **node server.js**

*NOTE:* Copy the URL where the Node server listens to. This will be used as an env variable when deploying the main Vite app on Vercel.

#### Deploy the frontend on Vercel

1. Select **Add New** | **Project**
2. Select the **Import** button next to **bridgetalk**
3. In the environment variables, set the following:
`VITE_SOCKET_URL={your-copied-render-endpoint-url}`
4. Click **Deploy**

---

## Issues

1. The server still cannot relay audio to another device. It can currently only relay from Speaker A to Speaker B on the same device.
   Text transmission works properly across devices.
2. For Speaker A's voice to be transmitted, following the given steps ensures that the audio is transmitted:
a) Open one window, and first Join as Speaker B (Text)
b) Open another window, and Join as Speaker A (Voice)
c) Speaker B fails to accept the livestream
d) Refresh the second window, and select the Join as Speaker again.
e) This time it will succcessfully transmit audio.