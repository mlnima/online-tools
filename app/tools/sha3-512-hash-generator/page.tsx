"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function Sha3_512HashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleHash() {
    setError("");
    // SHA3-512 is not available in browser JS. Placeholder only.
    setOutput("[SHA3-512 hash would appear here - not supported in browser JS]");
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>SHA3-512 Hash Generator</h1>
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
        SHA3-512 is not natively supported in browser JavaScript. This is a placeholder.
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text to hash..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleHash} className={styles.actionButton} style={{ marginBottom: 16 }}>Generate Hash</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="SHA3-512 hash output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
