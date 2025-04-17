"use client";
import React, { useState } from "react";

function octalToBase64(octal: string): string {
  try {
    // Split by space or treat as continuous
    let octals = octal.trim().split(/\s+/);
    if (octals.length === 1 && octals[0].length > 3) {
      // Try to chunk into 3-digit groups
      octals = octals[0].match(/.{1,3}/g) || [];
    }
    for (const o of octals) {
      const num = parseInt(o, 8);
      if (isNaN(num)) return "Invalid octal input";
    }
    const chars = octals.map(o => String.fromCharCode(parseInt(o, 8)));
    return btoa(chars.join(""));
  } catch {
    return "Invalid octal input";
  }
}

export default function OctalToBase64() {
  const [octal, setOctal] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    setBase64(octalToBase64(octal));
  }

  function handleCopy() {
    if (base64 && base64 !== "Invalid octal input") navigator.clipboard.writeText(base64);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Octal to Base64</h1>
      <p>Convert octal string (space-separated or plain) to Base64 encoding.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste octal string (e.g. 141 142 143 or 141142143)..."
        value={octal}
        onChange={e => setOctal(e.target.value)}
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
        <button onClick={handleCopy} disabled={!base64 || base64 === "Invalid octal input"} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

