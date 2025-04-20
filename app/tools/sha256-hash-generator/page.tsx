"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

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
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text..."
        className={styles.inputArea}
      />
      <button onClick={handleHash} className={styles.actionButton} disabled={loading}>{loading ? "Hashing..." : "Generate Hash"}</button>
      {error && <div className={styles.error}>{error}</div>}
      <input
        type="text"
        value={output}
        readOnly
        className={styles.outputArea}
        style={{ marginTop: 16, width: "100%", fontSize: 16 }}
        placeholder="SHA256 hash will appear here..."
      />
    </div>
  );
}
