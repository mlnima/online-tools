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
              <textarea
                rows={4}
                className={styles.inputArea}
                placeholder="Paste HTML code..."
                value={html}
                onChange={e => setHtml(e.target.value)}
              />

            </div>
            <button onClick={handleConvert} className={styles.actionButton} >Convert</button>
            <div className={styles.inputColumn}>
                <label>Base64 Output:</label>
                <textarea
                    rows={3}
                    className={styles.outputArea}
                    value={base64}
                    readOnly
                />
                {base64 &&       <button onClick={handleCopy} disabled={!base64} className={styles.actionButton}>Copy</button>}

            </div>
        </div>
      <br />


    </div>
  );
}

