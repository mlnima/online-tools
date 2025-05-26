"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const htmlEncode = (input: string): string => {
  const txt = document.createElement("textarea");
  txt.textContent = input;
  return txt.innerHTML;
};

const HtmlEncodeClient = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      setOutput(htmlEncode(input));
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
      <h1>HTML Encode</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="html-input-encode" className={styles.label}>HTML Input</label>
          <textarea
            id="html-input-encode"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            className={styles.inputArea}
            placeholder="Paste HTML here..."
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="html-output-encode" className={styles.label}>Encoded Result:</label>
          <textarea
            id="html-output-encode"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={4}
            placeholder="Encoded output"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Encode</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy Output</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default HtmlEncodeClient;
