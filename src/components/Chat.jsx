import { useState } from "react";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [resp, setResp] = useState("");

  async function sendMessage() {
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();
    setResp(data.reply);
  }

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2>Chat with AI</h2>
      <input value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <p style={{ marginTop: "20px" }}>{resp}</p>
    </div>
  );
}
