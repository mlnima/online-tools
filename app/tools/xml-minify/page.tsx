"use client";
import React, { useState } from "react";
import styles from '../../styles/UnifiedToolPage.module.scss';
// Removed ComingSoon import as it's being replaced by actual UI

export default function XmlMinify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleMinify() {
    setError("");
    try {
      // Remove whitespace between tags and newlines
      const minified = input.replace(/>\s+</g, "><").replace(/\n|\r/g, "").trim(); // Improved minification
      setOutput(minified);
    } catch (e) {
      setError("Error minifying XML.");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage}>
      <h1>XML Minify</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="xml-input" className={styles.label}>XML Input</label>
          <textarea
            id="xml-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={8}
            placeholder="Paste XML here..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="minified-xml-output" className={styles.label}>Minified XML</label>
          <textarea
            id="minified-xml-output"
            value={output}
            readOnly
            rows={8}
            placeholder="Minified XML output..."
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
