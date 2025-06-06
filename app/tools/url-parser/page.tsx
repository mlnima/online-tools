"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";


export default function UrlParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ protocol: string; host: string; hostname: string; port: string; pathname: string; search: string; hash: string } | null>(null);
  const [error, setError] = useState("");

  function handleParse() {
    setError("");
    try {
      const url = new URL(input);
      setOutput({
        protocol: url.protocol,
        host: url.host,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      });
    } catch (e) {
      setError("Invalid URL.");
      setOutput(null);
    }
  }

  return (
    <div className={styles.toolPage}>
      <h1>URL Parser</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter a URL..."
        className={styles.inputField}
      />
      <button onClick={handleParse} className={styles.actionButton}>Parse</button>
      {error && <div className={styles.error}>{error}</div>}
      {output && (
        <div className={styles.result}>
          <div><strong>Protocol:</strong> {output.protocol}</div>
          <div><strong>Hostname:</strong> {output.hostname}</div>
          <div><strong>Port:</strong> {output.port || "(default)"}</div>
          <div><strong>Path:</strong> {output.pathname}</div>
          <div><strong>Query:</strong> {output.search}</div>
          <div><strong>Hash:</strong> {output.hash}</div>
        </div>
      )}
    </div>
  );
}
