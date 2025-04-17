"use client";
import React, { useState } from "react";

function asciiToText(input: string): string {
  try {
    const parts = input.split(/[^0-9]+/).filter(Boolean);
    return parts.map(code => String.fromCharCode(Number(code))).join("");
  } catch {
    return "Invalid ASCII input";
  }
}

export default function ASCIIToText() {
  const [ascii, setAscii] = useState("");
  const [text, setText] = useState("");

  function handleConvert() {
    setText(asciiToText(ascii));
  }

  function handleCopy() {
    if (text && text !== "Invalid ASCII input") navigator.clipboard.writeText(text);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>ASCII to Text</h1>
      <p>Convert ASCII codes (space, comma, or line separated) to text.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste ASCII codes (e.g. 72 101 108 108 111)..."
        value={ascii}
        onChange={e => setAscii(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>Text Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={text}
          readOnly
        />
        <button onClick={handleCopy} disabled={!text || text === "Invalid ASCII input"} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

