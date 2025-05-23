import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Escape/Unescape | WebWizKit',
  description: 'Easily escape or unescape special HTML characters to their corresponding entities or plain text. An online tool by WebWizKit.',
  keywords: ['HTML Escape', 'HTML Unescape', 'HTML Entities', 'Escape HTML', 'Unescape HTML', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function htmlEscape(input: string) {
  const txt = document.createElement("textarea");
  txt.textContent = input;
  return txt.innerHTML;
}
function htmlUnescape(input: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
}

export default function HtmlEscapeUnescape() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleEscape() {
    setError("");
    try {
      setOutput(htmlEscape(input));
    } catch (e) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  }
  function handleUnescape() {
    setError("");
    try {
      setOutput(htmlUnescape(input));
    } catch (e) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  }
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage}>
      <h1>HTML Escape/Unescape</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="escape-input" className={styles.label}>Input Text</label>
          <textarea
            id="escape-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea} /* Changed from inputField */
            placeholder="<div>Hello &amp; welcome!</div>"
            rows={6} /* Increased rows */
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="escape-output" className={styles.label}>Output Text</label>
          <textarea
            id="escape-output"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={6} /* Increased rows */
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
}
