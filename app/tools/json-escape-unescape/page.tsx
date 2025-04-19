"use client";
import React, { useState } from "react";

const JsonEscapeUnescape: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEscape = () => {
    setError(null);
    try {
      setOutput(JSON.stringify(input).slice(1, -1)); // Remove wrapping quotes
    } catch {
      setError("Escape error");
      setOutput("");
    }
  };

  const handleUnescape = () => {
    setError(null);
    try {
      setOutput(JSON.parse('"' + input.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'));
    } catch {
      setError("Unescape error");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>JSON Escape/Unescape</h1>
      <p>Escape or unescape text for JSON string usage.</p>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={6}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Enter text to escape/unescape..."
      />
      <div style={{ margin: "16px 0" }}>
        <button onClick={handleEscape} style={{ padding: "8px 24px", fontSize: 16, marginRight: 8 }}>Escape</button>
        <button onClick={handleUnescape} style={{ padding: "8px 24px", fontSize: 16 }}>Unescape</button>
      </div>
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Result:</h3>
          <textarea
            value={output}
            readOnly
            rows={6}
            style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
          />
          <button onClick={handleCopy} style={{ marginTop: 8 }}>Copy</button>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default JsonEscapeUnescape;

