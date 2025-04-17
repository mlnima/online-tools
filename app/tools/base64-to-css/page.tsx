"use client";
import React, { useState } from "react";

export default function Base64ToCSS() {
  const [base64, setBase64] = useState("");
  const [css, setCss] = useState("");

  function handleConvert() {
    if (!base64.trim()) {
      setCss("");
      return;
    }
    setCss(`background-image: url('data:image/png;base64,${base64.trim()}');`);
  }

  function handleCopy() {
    if (css) navigator.clipboard.writeText(css);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to CSS</h1>
      <p>Convert Base64 image data to a CSS background-image property.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste Base64 image data..."
        value={base64}
        onChange={e => setBase64(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>CSS Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={css}
          readOnly
        />
        <button onClick={handleCopy} disabled={!css} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

