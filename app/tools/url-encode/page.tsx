"use client";
import React from "react";

import { useState } from "react";

export default function UrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32 }}>
      <h1>URL Encode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Enter text to encode..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleEncode} style={{ padding: "8px 24px", fontSize: 16 }}>Encode</button>
      </div>
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Encoded Result:</h3>
          <textarea value={output} readOnly rows={2} style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }} />
        </div>
      )}
    </div>
  );
}

