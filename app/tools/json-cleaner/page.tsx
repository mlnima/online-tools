"use client";
import React from "react";

import { useState } from "react";

function cleanJson(input: string): string {
  // Remove comments (// and /* */)
  let cleaned = input.replace(/\/\*.*?\*\//gs, "").replace(/\/\/.*$/gm, "");
  // Remove trailing commas
  cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");
  return cleaned;
}

export default function JsonCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClean = () => {
    try {
      const cleaned = cleanJson(input);
      const obj = JSON.parse(cleaned);
      setOutput(JSON.stringify(obj, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32 }}>
      <h1>JSON Cleaner</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your JSON here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleClean} style={{ padding: "8px 24px", fontSize: 16 }}>Clean JSON</button>
      </div>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Cleaned JSON:</h3>
          <textarea value={output} readOnly rows={6} style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }} />
        </div>
      )}
    </div>
  );
}

