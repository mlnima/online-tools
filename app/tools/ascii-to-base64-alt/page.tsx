"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

export default function AsciiToBase64Alt() {
  const [ascii, setAscii] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(ascii)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid ASCII input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Ascii to Base64</h1>
      <p>Convert ASCII text to Base64 encoding.</p>
      <div className={styles.formRow}>
        <textarea
          rows={4}
          placeholder="Enter ASCII text..."
          value={ascii}
          onChange={e => setAscii(e.target.value)}
          className={styles.textarea}
        />
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      </div>
      <label>Base64 Output:</label>
      <div className={styles.formRow}>
        <textarea
          rows={3}
          value={base64}
          readOnly
          style={{ width: "100%", fontSize: 16 }}
        />
        <button onClick={handleCopy} className={styles.actionButton} disabled={!base64}>Copy</button>
      </div>
    </div>
  );
}

