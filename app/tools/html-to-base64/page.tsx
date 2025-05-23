import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML to Base64 Converter | WebWizKit',
  description: 'Encode your HTML code to a Base64 string (UTF-8 encoded). An online HTML to Base64 conversion tool by WebWizKit.',
  keywords: ['HTML to Base64', 'Base64 Encode', 'HTML Encoder', 'Online Tool', 'WebWizKit', 'Developer Tools', 'UTF-8']
};

"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function HTMLToBase64() {
  const [html, setHtml] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(html)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid HTML input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>HTML to Base64</h1>
      <p>Encode HTML code to Base64 (UTF-8 encoded).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="html-input" className={styles.label}>HTML Input</label>
          <textarea
            id="html-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste HTML code..."
            value={html}
            onChange={e => setHtml(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output:</label>
          <textarea
            id="base64-output"
            rows={3}
            className={styles.outputArea}
            value={base64}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {base64 && <button onClick={handleCopy} disabled={!base64} className={styles.actionButton}>Copy</button>}
      </div>
    </div>
  );
}

