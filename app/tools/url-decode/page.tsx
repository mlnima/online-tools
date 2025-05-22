"use client";
import React from "react";
import { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function UrlDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>URL Decode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        className={styles.outputArea}
        placeholder="Enter encoded text to decode..."
      />
      <div className={styles.marginTop16}>
        <button onClick={handleDecode}  className={styles.actionButton}>Decode</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {output && (
        <div className={styles.marginTop24}>
          <h3>Decoded Result:</h3>
          <textarea value={output} readOnly rows={2} className={styles.outputArea} />
        </div>
      )}
    </div>
  );
}

