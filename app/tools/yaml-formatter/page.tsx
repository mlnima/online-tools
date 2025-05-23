"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";
// Removed ComingSoon import

export default function YamlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // Added handleCopy function
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  function handleFormat() {
    setError("");
    try {
      // Use js-yaml for parsing and dumping
      // @ts-ignore
      const jsyaml = window.jsyaml;
      if (!jsyaml) throw new Error("js-yaml library not loaded");
      const obj = jsyaml.load(input);
      const formatted = jsyaml.dump(obj, { indent: 2 });
      setOutput(formatted);
    } catch (e) {
      setError("Invalid YAML input or formatting error.");
      setOutput("");
    }
  }
  return (
    <div className={styles.toolPage}>
      <h1>YAML Formatter</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="yaml-input" className={styles.label}>YAML Input</label>
          <textarea
            id="yaml-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            placeholder="Paste YAML here..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="yaml-output" className={styles.label}>Formatted YAML</label>
          <textarea
            id="yaml-output"
            value={output}
            readOnly
            rows={10}
            placeholder="Formatted YAML output..."
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleFormat} className={styles.actionButton}>Format</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
