"use client";
import React from "react";

import { useState } from "react";

function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}

export default function HtmlEscape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEscape = () => {
    setOutput(escapeHtml(input));
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32 }}>
      <h1>HTML Escape</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Enter text to escape..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleEscape}  >Escape</button>
      </div>
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Escaped HTML:</h3>
          <textarea value={output} readOnly rows={2} style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }} />
        </div>
      )}
    </div>
  );
}

