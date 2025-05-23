"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function TextToBase64() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid text input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Text to Base64</h1>
      <p>Encode text to Base64 (UTF-8 encoded).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="text-input" className={styles.label}>Text Input</label>
          <textarea
            id="text-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste text..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output:</label>
          <textarea
            id="base64-output"
            rows={4} /* Adjusted rows to match input */
            className={styles.outputArea} /* Corrected class */
            value={base64}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.actionButton} onClick={handleConvert}>Convert</button>
        <button onClick={handleCopy} disabled={!base64} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
}

