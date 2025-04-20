"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

export default function JsonToTextConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div className={toolsStyles.toolPage}>
      <h1>JSON to Text Converter</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste JSON here..."
        className={toolsStyles.inputArea}
        style={{ width: '100%' }}
      />
      <button onClick={handleConvert} className={toolsStyles.actionButton}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        placeholder="Text output..."
        className={toolsStyles.outputArea}
        style={{ width: '100%' }}
      />
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)} className={toolsStyles.actionButton}>Copy</button>
      )}
    </div>
  );
}
