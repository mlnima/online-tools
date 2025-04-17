"use client";
import React, { useState } from "react";

function decimalToAscii(input: string): string {
  try {
    const parts = input.split(/[^0-9]+/).filter(Boolean);
    return parts.map(d => String.fromCharCode(Number(d))).join("");
  } catch {
    return "Invalid decimal input";
  }
}

export default function DecimalToASCII() {
  const [decimal, setDecimal] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    setAscii(decimalToAscii(decimal));
  }

  function handleCopy() {
    if (ascii && ascii !== "Invalid decimal input") navigator.clipboard.writeText(ascii);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Decimal to ASCII</h1>
      <p>Convert decimal numbers (space, comma, or line separated) to ASCII text.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste decimals (e.g. 72 101 108 108 111)..."
        value={decimal}
        onChange={e => setDecimal(e.target.value)}
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
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid decimal input"} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

