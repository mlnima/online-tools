
"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function WhirlpoolHashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleHash() {
    setError("");
    try {
      // Real Whirlpool hash requires a crypto library.
      // Placeholder: output a fake hash for demo.
      setOutput("[Whirlpool hash would appear here - requires crypto library]");
    } catch (e) {
      setError("Error generating hash.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Whirlpool Hash Generator</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text to hash..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleHash} className={styles.actionButton} style={{ marginBottom: 16 }}>Generate Hash</button>
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
        This is a placeholder. Real Whirlpool hash requires an external crypto library.
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="Whirlpool hash output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
    </div>
  );
}
