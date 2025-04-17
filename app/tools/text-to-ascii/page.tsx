"use client";
import React, { useState } from "react";

function textToAscii(input: string): string {
  try {
    return Array.from(input).map(c => c.charCodeAt(0).toString()).join(" ");
  } catch {
    return "Invalid text input";
  }
}

export default function TextToASCII() {
  const [text, setText] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    setAscii(textToAscii(text));
  }

  function handleCopy() {
    if (ascii && ascii !== "Invalid text input") navigator.clipboard.writeText(ascii);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Text to ASCII</h1>
      <p>Convert text to ASCII codes (space separated).</p>
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
        <label>ASCII Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={ascii}
          readOnly
        />
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid text input"} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

