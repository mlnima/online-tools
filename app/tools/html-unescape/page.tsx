"use client";
import React from "react";

import { useState } from "react";

function unescapeHtml(str: string) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

export default function HtmlUnescape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleUnescape = () => {
    setOutput(unescapeHtml(input));
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32 }}>
      <h1>HTML Unescape</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Enter HTML to unescape..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleUnescape}  >Unescape</button>
      </div>
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Unescaped Result:</h3>
          <textarea value={output} readOnly rows={2}   />
        </div>
      )}
    </div>
  );
}

