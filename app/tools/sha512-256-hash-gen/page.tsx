"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

async function sha512_256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await window.crypto.subtle.digest("SHA-512", data);
  // Truncate to first 32 bytes (256 bits)
  return Array.from(new Uint8Array(hashBuffer).slice(0, 32))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Sha512_256HashGen() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleHash() {
    setError("");
    setLoading(true);
    try {
      const hash = await sha512_256(input);
      setOutput(hash);
    } catch (e) {
      setError("Error generating SHA512/256 hash.");
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
      <h1>SHA512/256 Hash Gen.</h1>
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
        placeholder="SHA512/256 hash output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
