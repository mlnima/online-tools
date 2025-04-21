"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function SVGToBase64() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    setOutput("");
    try {
      // Remove XML declaration if present
      let svg = input.trim().replace(/<\?xml.*?\?>/, "");
      // Encode to base64
      const base64 = btoa(unescape(encodeURIComponent(svg)));
      setOutput(base64);
    } catch (e) {
      setError("Error encoding SVG to Base64.");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className={unifiedToolPageStyles.centeredBox}>
      <h1>SVG to Base64</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={8}
        placeholder="Paste SVG markup here..."
        className={unifiedToolPageStyles.inputArea}
      />
      <button onClick={handleConvert} className={`${unifiedToolPageStyles.actionButton} ${unifiedToolPageStyles.marginBottom16}`}>Convert</button>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="Base64 output..."
        className={`${unifiedToolPageStyles.outputArea} ${unifiedToolPageStyles.marginTop12}`}
      />
      {output && (
        <button onClick={handleCopy} className={`${unifiedToolPageStyles.actionButton} ${unifiedToolPageStyles.marginTop8}`}>Copy</button>
      )}
    </div>
  );
}
