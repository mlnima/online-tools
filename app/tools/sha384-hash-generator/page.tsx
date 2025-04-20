"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

async function sha384(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await window.crypto.subtle.digest("SHA-384", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Sha384HashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleHash() {
    setError("");
    setLoading(true);
    try {
      const hash = await sha384(input);
      setOutput(hash);
    } catch (e) {
      setError("Error generating SHA384 hash.");
      setOutput("");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>SHA384 Hash Generator</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text to hash..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleHash} className={styles.actionButton} style={{ marginBottom: 16 }} disabled={loading}>
        {loading ? 'Hashing...' : 'Generate Hash'}
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="SHA384 hash output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
