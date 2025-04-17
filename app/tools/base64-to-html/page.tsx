"use client";
import React, { useState } from "react";

export default function Base64ToHTML() {
  const [base64, setBase64] = useState("");
  const [html, setHtml] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setHtml(decoded);
    } catch (e) {
      setHtml("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (html) navigator.clipboard.writeText(html);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to HTML</h1>
      <p>Decode Base64 string to HTML text.</p>
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
        <label>HTML Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={html}
          readOnly
        />
        <button onClick={handleCopy} disabled={!html} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

