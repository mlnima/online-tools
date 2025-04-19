"use client";
"use client";
import React, { useState } from "react";

export default function Base64ToJavascript() {
  const [base64, setBase64] = useState("");
  const [js, setJs] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setJs(decoded);
    } catch (e) {
      setJs("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (js) navigator.clipboard.writeText(js);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to Javascript</h1>
      <p>Decode Base64 string to JavaScript code.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste Base64 string..."
        value={base64}
        onChange={e => setBase64(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>JavaScript Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={js}
          readOnly
        />
        <button onClick={handleCopy} disabled={!js} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

