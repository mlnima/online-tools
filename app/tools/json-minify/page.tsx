"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonMinify() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleMinify() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON Minify</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste JSON here..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleMinify} className={styles.actionButton} style={{ marginBottom: 16 }}>Minify</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        placeholder="Minified JSON output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
      />
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
