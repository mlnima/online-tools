"use client";
import React, { useState } from "react";

export default function JSONToBase64() {
  const [json, setJson] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const pretty = JSON.stringify(JSON.parse(json), null, 2);
      const encoded = btoa(unescape(encodeURIComponent(pretty)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid JSON input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to Base64</h1>
      <p>Encode JSON to Base64 (UTF-8 encoded).</p>
      <textarea
        rows={6}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste JSON..."
        value={json}
        onChange={e => setJson(e.target.value)}
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

