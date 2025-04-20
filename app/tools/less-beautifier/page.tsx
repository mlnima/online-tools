"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function LessBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleBeautify() {
    setError("");
    // LESS beautification is not supported in-browser. Placeholder only.
    setOutput("[Beautified LESS would appear here - not supported in browser JS]");
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>LESS Beautifier</h1>
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
        LESS beautification is not supported in browser JavaScript. This is a placeholder.
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={6}
        placeholder="Paste LESS code here..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleBeautify} className={styles.actionButton} style={{ marginBottom: 16 }}>Beautify</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        placeholder="Beautified LESS output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
