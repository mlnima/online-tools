import React, { useState } from "react";

export default function Base64ToText() {
  const [base64, setBase64] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      const decoded = decodeURIComponent(escape(atob(base64.trim())));
      setText(decoded);
    } catch (e) {
      setText("");
      setError("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (text) navigator.clipboard.writeText(text);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to Text</h1>
      <p>Paste a Base64 string to decode to text.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste Base64 string..."
        value={base64}
        onChange={e => setBase64(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <button onClick={handleCopy} style={{ margin: 8 }} disabled={!text}>Copy Text</button>
      {error && <div style={{ color: "red", margin: 8 }}>{error}</div>}
      {text && (
        <div style={{ marginTop: 24 }}>
          <label>Decoded Text:</label>
          <textarea
            rows={4}
            style={{ width: "100%", fontSize: 16 }}
            value={text}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
