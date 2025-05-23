import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Decode | HTML Entity Decoder | WebWizKit',
  description: 'Decode HTML entities to their original characters. Paste your encoded HTML to get the plain text version. An online tool by WebWizKit.',
  keywords: ['HTML Decode', 'HTML Entity Decoder', 'Unescape HTML', 'HTML Parser', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function htmlDecode(input: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
}

export default function HtmlDecode() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      setOutput(htmlDecode(input));
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
      <h1>HTML Decode</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="html-input" className={styles.label}>HTML Input</label>
          <textarea
            id="html-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            placeholder="<div>Hello</div>"
            rows={10} // Default rows
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="html-output" className={styles.label}>Decoded Output</label>
          <textarea
            id="html-output"
            value={output}
            readOnly
            className={styles.outputArea}
            placeholder="Decoded output"
            rows={10} // Default rows
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Decode</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!output}>Copy Output</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
