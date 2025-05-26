"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const htmlEscape = (input: string): string => {
  const txt = document.createElement("textarea");
  txt.textContent = input;
  return txt.innerHTML;
};

const htmlUnescape = (input: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
};

const HtmlEscapeUnescapeClient = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEscape = () => {
    setError("");
    try {
      setOutput(htmlEscape(input));
    } catch (e: any) {
      setError((e as Error).message || "Error escaping HTML.");
      setOutput("");
    }
  };

  const handleUnescape = () => {
    setError("");
    try {
      setOutput(htmlUnescape(input));
    } catch (e: any) {
      setError((e as Error).message || "Error unescaping HTML.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HTML Escape/Unescape</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="escape-unescape-input" className={styles.label}>Input Text</label>
          <textarea
            id="escape-unescape-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            placeholder="<div>Hello &amp; welcome!</div>"
            rows={6}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="escape-unescape-output" className={styles.label}>Output Text</label>
          <textarea
            id="escape-unescape-output"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={6}
            placeholder="Output"
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
};
export default HtmlEscapeUnescapeClient;
