import React from "react";

import { useState } from "react";

export default function UrlDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32 }}>
      <h1>URL Decode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Enter encoded text to decode..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleDecode} style={{ padding: "8px 24px", fontSize: 16 }}>Decode</button>
      </div>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Decoded Result:</h3>
          <textarea value={output} readOnly rows={2} style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }} />
        </div>
      )}
    </div>
  );
}

