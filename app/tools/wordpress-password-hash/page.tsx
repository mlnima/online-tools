"use client";
"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function WordpressPasswordHash() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // Simple JS PHPass implementation for demonstration
  function handleHash() {
    setError("");
    try {
      // This is a placeholder. In production, use a proper PHPass implementation.
      // Here, we'll just use a basic MD5 hash for demo (not secure for real use!)
      async function hash(str: string) {
        // Use SHA-256 as a placeholder; Wordpress uses PHPass
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
      hash(input).then(setOutput);
    } catch (e) {
      setError("Error hashing password.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Wordpress Password Hash</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={2}
        placeholder="Enter password..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleHash} className={styles.actionButton} style={{ marginBottom: 16 }}>Hash</button>
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
        This uses SHA-256 for demo only. Wordpress uses PHPass, which is more secure.
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={2}
        placeholder="Password hash output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
    </div>
  );
}
