"use client";
import React, { useState } from "react";

function charsToAscii(input: string): string {
  try {
    return Array.from(input).map(c => c.charCodeAt(0).toString()).join(" ");
  } catch {
    return "Invalid character input";
  }
}

export default function CharToASCII() {
  const [chars, setChars] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    setAscii(charsToAscii(chars));
  }

  function handleCopy() {
    if (ascii && ascii !== "Invalid character input") navigator.clipboard.writeText(ascii);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Char to ASCII</h1>
      <p>Convert characters to ASCII codes (space separated).</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste characters..."
        value={chars}
        onChange={e => setChars(e.target.value)}
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
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid character input"} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

