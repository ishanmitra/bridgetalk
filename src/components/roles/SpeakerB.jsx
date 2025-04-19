import { useEffect, useRef } from "react";
import socket from "../../lib/socket";

const SpeakerB = ({ roomId }) => {
  const peerConnection = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject"
        }
      ]
    });

    peerConnection.current = pc;

    pc.ontrack = (event) => {
      const [stream] = event.streams;
      console.log("Speaker B: Received remote stream");
      audioRef.current.srcObject = stream;
      audioRef.current.play().catch((e) =>
        console.error("Autoplay error:", e)
      );
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, roomId });
      }
    };

    socket.on("offer", async ({ offer }) => {
      console.log("Speaker B: Got offer");
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { answer, roomId });
    });

    socket.on("ice-candidate", ({ candidate }) => {
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.off("offer");
      socket.off("ice-candidate");
      peerConnection.current?.close();
    };
  }, [roomId]);

  return (
    <div>
      <h2>Speaker B</h2>
      <audio ref={audioRef} autoPlay controls className="w-full" />
    </div>
  );
};

export default SpeakerB;
