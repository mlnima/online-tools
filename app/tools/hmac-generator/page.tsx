import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HMAC Generator | SHA-256, SHA-1 | WebWizKit',
  description: 'Generate HMAC (Hash-based Message Authentication Code) using SHA-256 or SHA-1 algorithms with a secret key. An online security tool by WebWizKit.',
  keywords: ['HMAC Generator', 'HMAC', 'SHA-256', 'SHA-1', 'Cryptography', 'Security', 'Online Tool', 'WebWizKit', 'Message Authentication']
};

"use client";import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

async function hmac(message: string, key: string, algorithm: string): Promise<string> {
  // MD5 fallback removed
  const enc = new TextEncoder();
  const algo = { name: "HMAC", hash: algorithm }; // Corrected algo object
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw", enc.encode(key), algo, false, ["sign"]
  );
  const sig = await window.crypto.subtle.sign(algo, cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function HmacGenerator() {
  const [message, setMessage] = React.useState("");
  const [key, setKey] = React.useState("");
  const [algorithm, setAlgorithm] = React.useState("SHA-256");
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleConvert() {
    setError("");
    setLoading(true);
    setResult("");
    try {
      if (!message) throw new Error("Message required");
      if (!key) throw new Error("Secret key required");
      setResult(await hmac(message, key, algorithm));
    } catch (e) {
      setError((e as Error).message || "Error");
      setResult("");
    } finally {
      setLoading(false);
    }
  }
  function handleCopy() {
    if (result) navigator.clipboard.writeText(result);
  }

  return (
    <div className={styles.toolPage}>
      <h1>HMAC Generator</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="message-input" className={styles.label}>Message</label>
          <textarea
            id="message-input"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className={styles.inputArea}
            placeholder="Message"
            rows={3} 
          />
          <label htmlFor="key-input" className={styles.label}>Secret Key</label>
          <input
            type="text"
            id="key-input"
            value={key}
            onChange={e => setKey(e.target.value)}
            className={styles.inputField}
            placeholder="Secret Key"
          />
          <label htmlFor="algo-select" className={styles.label}>Algorithm</label>
          <select
            id="algo-select"
            value={algorithm}
            onChange={e => setAlgorithm(e.target.value)}
            className={styles.primarySelect}
          >
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-1">SHA-1</option>
            {/* MD5 Option Removed */}
          </select>
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="hmac-output" className={styles.label}>HMAC Output</label>
          <textarea
            id="hmac-output"
            value={result}
            readOnly
            className={styles.outputArea}
            rows={3}
            placeholder="HMAC output"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
        {result && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
