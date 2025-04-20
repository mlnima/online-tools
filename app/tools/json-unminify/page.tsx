"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";
import toolsStyles from "../../styles/Tools.module.scss";

export default function JsonUnminify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleUnminify() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>JSON Unminify</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        placeholder="Paste your minified JSON here..."
        className={toolsStyles.inputArea}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleUnminify} className={toolsStyles.actionButton}>Unminify</button>
      </div>
      {error && <div className={toolsStyles.error}>{error}</div>}
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Unminified JSON:</h3>
          <textarea
            value={output}
            readOnly
            rows={10}
            className={toolsStyles.outputArea}
            style={{ width: '100%' }}
          />
          <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
        </div>
      )}
    </div>
  );
}
