import { useEffect } from "react";
import socket from "../../lib/socket"; // If needed

const promptTemplate = (conversation, prompt) => `
You are assisting in a conversation between two people:

- Speaker A speaks aloud using their voice. A will provide the maximum context in the conversation which gets logged into the conversation history as text.
- Speaker B is speech-impaired and types short prompts.
- You are the AI voice of Speaker B, helping translate their short prompts into expressive, natural-sounding spoken sentences.

Speaker B’s latest prompt:
${prompt}

Conversation so far (each line represents one message):
${conversation}

Your job:
- Analyze the context of the conversation.
- Interpret Speaker B's latest prompt.
- Respond **as if you are Speaker B**, using a concise and natural-sounding sentence (max 15-20 words).
- Your response will be spoken aloud, so keep it clear and conversational.

Note:
- Lines starting with **B:** are typed prompts from Speaker B.
- Lines starting with **A:** are spoken responses from Speaker A converted to text.
- Lines starting with **AI:** are LLM generated responses based on Speaker B's last prompt

IMPORTANT:
- If the conversation does not have speaker A talking, then write that you cannot assist since Speaker A is not available.

Your response:
`;

const LLM = ({ roomId }) => {
  useEffect(() => {
    const chatContainer = document.getElementById("chat-history");

    if (!chatContainer) return;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(async (node) => {
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node.innerText.startsWith("B:")
            ) {
              const prompt = node.innerText.slice(3).trim();
              const fullText = chatContainer.innerText.trim();

              const input = promptTemplate(fullText, prompt);
              console.log(input)

              puter.ai.chat(input).then((res) => {
                // console.log("LLM response:", res.message.content);
                socket.emit("chat-message", { roomId, message: { role: "AI", text: res.message.content }})
                // puter.ai.txt2speech(res.message.content).then((audio)=>{
                //   audio.play();
                // });
              });
            }
          });
        }
      }
    });

    observer.observe(chatContainer, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null; // This is a logic-only component
};

export default LLM;
