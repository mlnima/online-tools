"use client";
import React, { useState } from "react";

function bytesToAscii(input: string): string {
  try {
    const parts = input.split(/[^0-9]+/).filter(Boolean);
    return parts.map(b => String.fromCharCode(Number(b))).join("");
  } catch {
    return "Invalid byte input";
  }
}

export default function ByteToASCII() {
  const [bytes, setBytes] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    setAscii(bytesToAscii(bytes));
  }

  function handleCopy() {
    if (ascii && ascii !== "Invalid byte input") navigator.clipboard.writeText(ascii);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Byte to ASCII</h1>
      <p>Convert bytes (0-255, space, comma, or line separated) to ASCII text.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste bytes (e.g. 72 101 108 108 111)..."
        value={bytes}
        onChange={e => setBytes(e.target.value)}
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
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid byte input"} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

