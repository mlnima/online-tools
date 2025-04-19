"use client";
import React, { useState } from "react";

const CssToScss: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    setOutput(input); // CSS is valid SCSS
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>CSS to SCSS</h1>
      <p>Paste your CSS to convert it to SCSS (CSS is valid SCSS).</p>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your CSS here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleConvert} style={{ padding: "8px 24px", fontSize: 16 }}>Convert</button>
      </div>
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>SCSS Output:</h3>
          <textarea
            value={output}
            readOnly
            rows={10}
            style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
          />
          <button onClick={handleCopy} style={{ marginTop: 8 }}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default CssToScss;

