"use client";
import React from "react";

import toolsStyles from "../../styles/Tools.module.scss";

export default function BinaryToText() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      // Split by whitespace, parse each binary to char
      const text = input.trim().split(/\s+/).map(bin => {
        if (!/^[01]{8}$/.test(bin)) throw new Error();
        return String.fromCharCode(parseInt(bin, 2));
      }).join("");
      setOutput(text);
    } catch {
      setError("Invalid binary input. Please enter 8-bit binary values separated by spaces.");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>Binary to Text</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter binary string (e.g. 01001000 01100101)..."
        className={toolsStyles.inputArea}
        style={{ width: '100%' }}
      />
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="Text output..."
        className={toolsStyles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
