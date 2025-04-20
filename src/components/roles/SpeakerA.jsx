import { useEffect, useRef, useState } from "react";
import socket from "../../lib/socket";
import MessageBubble from "../MessageBubble.jsx";

const SpeakerA = ({ roomId, setInterimMessage }) => {
  const [interimTranscript, setInterimTranscript] = useState(""); // Track interim message locally
  const peerConnection = useRef(null);

  function setPreferredAudioParams(sdp) {
    return sdp.replace(
      /a=fmtp:111 .*\r\n/,
      "a=fmtp:111 minptime=10;useinbandfec=1;stereo=1;maxaveragebitrate=510000\r\n"
    );
  }

  useEffect(() => {
    const chatContainer = document.getElementById("chat-history");

    if (!chatContainer) return;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(async (node) => {
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node.innerText.startsWith("AI:")
            ) {
              const ai_text = node.innerText.slice(4).trim();

              puter.ai.txt2speech(ai_text).then((audio)=>{
                audio.play();
              });

            }
          });
        }
      }
    });

    observer.observe(chatContainer, { childList: true, subtree: true });

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 48000,
          channelCount: 2,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      console.log("Got local stream:", stream);

      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
      });

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      peerConnection.current = pc;

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { candidate: event.candidate, roomId });
        }
      };

      const offer = await pc.createOffer();
      const moddedSDP = setPreferredAudioParams(offer.sdp);
      await pc.setLocalDescription({ type: "offer", sdp: moddedSDP });
      socket.emit("offer", { offer: pc.localDescription, roomId });

      socket.on("answer", async ({ answer }) => {
        console.log("Speaker A: Got answer");
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      });

      // === Real-time transcription setup ===
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      let isRecognitionRunning = false;

      recognition.onstart = () => {
        console.log("Speech recognition started");
        isRecognitionRunning = true;
      };

      recognition.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        // Update interim message locally for Speaker A
        setInterimTranscript(interimTranscript); // Display interim locally

        // Emit the final transcript once recognized
        if (finalTranscript.trim()) {
          setInterimMessage(null); // Clear any previous interim message
          socket.emit("chat-message", {
            roomId,
            message: { role: "A", text: finalTranscript }, // Emit final message
          });
          console.log("✅ Final:", finalTranscript);
        }
      };

      recognition.onerror = (e) => {
        console.error("Speech error:", e.error);
        if (e.error === "aborted") {
          console.log("Speech recognition aborted, restarting...");
          startRecognition();
        }
      };

      recognition.onend = () => {
        console.log("Speech recognition ended ..");

        if (isRecognitionRunning) {
          isRecognitionRunning = false;
          startRecognition();
        }
      };

      function startRecognition() {
        if (!isRecognitionRunning) {
          recognition.start();
          console.log("Restarting speech recognition...");
        }
      }

      startRecognition();
    };

    start();

    return () => {
      peerConnection.current?.close();
      observer.disconnect();
    };
  }, [roomId, setInterimMessage]);

  return (
    <div>
      <h2>Speaker A</h2>
      <p>Streaming audio...</p>

      {/* Display interim transcript locally */}
      {interimTranscript && (
        <div className="interim-message">
          <p>{interimTranscript}</p>
        </div>
      )}
    </div>
  );
};

export default SpeakerA;
