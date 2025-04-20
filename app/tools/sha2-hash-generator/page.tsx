"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function Sha2HashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleHash() {
    setError("");
    // SHA2 is a family and not a specific hash. Placeholder only.
    setOutput("[SHA2 hash would appear here - SHA2 is a family, use a specific variant tool]");
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>SHA2 Hash Generator</h1>
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
        SHA2 is a family of hash functions (SHA-224, SHA-256, SHA-384, SHA-512, etc). This is a placeholder.
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
        placeholder="SHA2 hash output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
