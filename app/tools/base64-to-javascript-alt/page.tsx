"use client";
import React from "react";
import toolsStyles from "../../styles/Tools.module.scss";

export default function Base64ToJavascriptAlt() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch {
      setError("Invalid Base64 input.");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>Base64 to Javascript (Alt)</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter Base64 string..."
        className={toolsStyles.inputArea}
        style={{ width: '100%' }}
      />
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={8}
        placeholder="Decoded Javascript code..."
        className={toolsStyles.outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
      />
      {output && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
