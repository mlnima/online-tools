"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function PantoneToHex() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    // Pantone conversion is not available in-browser without a Pantone color database. Placeholder only.
    setOutput("[Hex value would appear here - not supported in browser JS]");
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Pantone to Hex</h1>
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
        Pantone to Hex conversion is not natively supported in browser JavaScript. This is a placeholder.
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={2}
        placeholder="Enter Pantone code (e.g. 17-1463)"
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleConvert} className={styles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={2}
        placeholder="Hex output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
