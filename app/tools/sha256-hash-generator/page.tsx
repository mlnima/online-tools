"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function Sha256HashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleHash() {
    setError("");
    setLoading(true);
    try {
      const hash = await sha256(input);
      setOutput(hash);
    } catch (e) {
      setError("Hashing failed.");
      setOutput("");
    }
    setLoading(false);
  }

  return (
    <div className={styles.toolPage}>
      <h1>SHA256 Hash Generator</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="text-input" className={styles.label}>Input Text</label>
          <textarea
            id="text-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            placeholder="Enter text..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="sha256-output" className={styles.label}>SHA256 Hash</label>
          <input
            type="text"
            id="sha256-output"
            value={output}
            readOnly
            className={styles.inputField} /* Changed from outputArea to inputField */
            placeholder="SHA256 hash will appear here..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleHash} className={styles.actionButton} disabled={loading}>{loading ? "Hashing..." : "Generate Hash"}</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
