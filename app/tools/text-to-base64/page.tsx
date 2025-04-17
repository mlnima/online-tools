"use client";
import React, { useState } from "react";

export default function TextToBase64() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid text input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Text to Base64</h1>
      <p>Encode text to Base64 (UTF-8 encoded).</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste text..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>Base64 Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={base64}
          readOnly
        />
        <button onClick={handleCopy} disabled={!base64} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

