"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

// Removed ComingSoon import

export default function YamlMinify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // Added handleCopy function
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  function handleMinify() {
    setError("");
    try {
      // Remove comments and extra whitespace
      const minified = input
        .split('\n')
        .map(line => line.replace(/#.*/, "").trim())
        .filter(line => line.length > 0)
        .join('\n');
      setOutput(minified);
    } catch (e) {
      setError("Error minifying YAML.");
      setOutput("");
    }
  }
  return (
    <div className={styles.toolPage}>
      <h1>YAML Minify</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="yaml-input-minify" className={styles.label}>YAML Input</label>
          <textarea
            id="yaml-input-minify"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            placeholder="Paste YAML here..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="yaml-output-minify" className={styles.label}>Minified YAML</label>
          <textarea
            id="yaml-output-minify"
            value={output}
            readOnly
            rows={10}
            placeholder="Minified YAML output..."
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleMinify} className={styles.actionButton}>Minify</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
