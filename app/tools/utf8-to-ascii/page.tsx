"use client";
"use client";
import React, { useState } from "react";

function utf8ToAscii(input: string): string {
  try {
    return Array.from(input).map(c => c.charCodeAt(0) < 128 ? c : '?').join("");
  } catch {
    return "Invalid input";
  }
}

export default function UTF8ToASCII() {
  const [utf8, setUtf8] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    setAscii(utf8ToAscii(utf8));
  }

  function handleCopy() {
    if (ascii && ascii !== "Invalid input") navigator.clipboard.writeText(ascii);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>UTF8 to ASCII</h1>
      <p>Convert UTF-8 string to ASCII (non-ASCII chars replaced with '?').</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste UTF-8 string..."
        value={utf8}
        onChange={e => setUtf8(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>ASCII Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={ascii}
          readOnly
        />
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid input"} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

