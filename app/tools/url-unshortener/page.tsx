"use client";
"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function UrlUnshortener() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUnshorten() {
    setError("");
    setOutput("");
    setLoading(true);
    try {
      // Use fetch to follow redirects
      const response = await fetch(input, { method: 'HEAD', redirect: 'follow' });
      setOutput(response.url);
    } catch (e) {
      setError("Error unshortening URL (CORS or invalid URL).");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>URL Unshortener</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={2}
        placeholder="Paste short URL here..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleUnshorten} className={styles.actionButton} style={{ marginBottom: 16 }} disabled={loading}>
        {loading ? 'Unshortening...' : 'Unshorten'}
      </button>
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
        Note: This tool uses fetch() and may not work for all URLs due to CORS restrictions.
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={2}
        placeholder="Unshortened URL output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
    </div>
  );
}
