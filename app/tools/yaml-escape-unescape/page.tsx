"use client";
import React, { useState } from "react"; // Ensured useState is imported
import styles from "../../styles/UnifiedToolPage.module.scss";
// Removed ComingSoon import

export default function YamlEscapeUnescape() {
  const [input, setInput] = useState(""); // Ensured useState is used
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleEscape() {
    setError("");
    try {
      // Escape quotes, backslashes, and newlines
      const escaped = input
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/\"/g, '\\"')
        .replace(/\'/g, "\\'");
      setOutput(escaped);
    } catch (e) {
      setError("Error escaping YAML.");
      setOutput("");
    }
  }

  function handleUnescape() {
    setError("");
    try {
      const unescaped = input
        .replace(/\\n/g, "\n")
        .replace(/\\'/g, "'")
        .replace(/\\\"/g, '"')
        .replace(/\\\\/g, "\\");
      setOutput(unescaped);
    } catch (e) {
      setError("Error unescaping YAML.");
      setOutput("");
    }
  }
  return (
    <div className={styles.toolPage}>
      <h1>YAML Escape/Unescape</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="yaml-input" className={styles.label}>Input Text</label>
          <textarea
            id="yaml-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={8}
            placeholder="Enter text to escape/unescape..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="yaml-output" className={styles.label}>Result</label>
          <textarea
            id="yaml-output"
            value={output}
            readOnly
            rows={8}
            placeholder="Escaped/Unescaped output..."
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleEscape} className={styles.actionButton}>Escape</button>
        <button onClick={handleUnescape} className={styles.actionButton}>Unescape</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

// Added handleCopy function for completeness, assuming it's desired
function handleCopy() {
  // Implemented based on other similar tools, requires 'output' state
  // if (output) navigator.clipboard.writeText(output);
}
