"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

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
    <div className={styles.centeredBox}>
      <h1>SVG to Base64</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={8}
        placeholder="Paste SVG markup here..."
        className={styles.inputArea}
      />
      <button onClick={handleConvert} className={`${styles.actionButton} ${styles.marginBottom16}`}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="Base64 output..."
        className={`${styles.outputArea} ${styles.marginTop12}`}
      />
      {output && (
        <button onClick={handleCopy} className={`${styles.actionButton} ${styles.marginTop8}`}>Copy</button>
      )}
    </div>
  );
}
