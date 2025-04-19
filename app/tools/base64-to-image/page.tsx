"use client";
import React, { useState } from "react";

export default function Base64ToImage() {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  function handleConvert() {
    setError("");
    if (!base64.trim()) {
      setImgSrc("");
      setError("Please enter a Base64 string.");
      return;
    }
    let src = base64.trim();
    // Try to auto-detect image type if not present
    if (!src.startsWith("data:")) {
      // Assume PNG by default
      src = `data:image/png;base64,${src}`;
    }
    setImgSrc(src);
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to Image</h1>
      <p>Paste a Base64 string to see the image.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste Base64 image string..."
        value={base64}
        onChange={e => setBase64(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <button onClick={handleCopy} style={{ margin: 8 }} disabled={!base64}>Copy Base64</button>
      {error && <div style={{ color: "red", margin: 8 }}>{error}</div>}
      {imgSrc && (
        <div style={{ marginTop: 24 }}>
          <img src={imgSrc} alt="Decoded" style={{ maxWidth: "100%", maxHeight: 320 }} />
        </div>
      )}
    </div>
  );
}
