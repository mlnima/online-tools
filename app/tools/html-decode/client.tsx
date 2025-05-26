"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const htmlDecode = (input: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
};

const HtmlDecodeClient = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      setOutput(htmlDecode(input));
    } catch (e: any) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HTML Decode</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="html-input-decode" className={styles.label}>HTML Input</label>
          <textarea
            id="html-input-decode"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            placeholder="&lt;div&gt;Hello&lt;/div&gt;"
            rows={10}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="html-output-decode" className={styles.label}>Decoded Output</label>
          <textarea
            id="html-output-decode"
            value={output}
            readOnly
            className={styles.outputArea}
            placeholder="Decoded output"
            rows={10}
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
};
export default HtmlDecodeClient;
