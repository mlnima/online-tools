"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

function textToBinary(text: string): string {
  return text.split("").map(char => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}

export default function TextToBinary() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      setOutput(textToBinary(input));
    } catch (e) {
      setError("Conversion failed.");
      setOutput("");
    }
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Text to Binary</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text..."
        className={unifiedToolPageStyles.inputArea}
      />
      <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton}>Convert</button>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="Binary output..."
        className={`${unifiedToolPageStyles.outputArea} ${unifiedToolPageStyles.marginTop12}`}
      />
    </div>
  );
}
