"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

export default function Base64ToASCII() {
  const [base64, setBase64] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setAscii(decoded);
    } catch (e) {
      setAscii("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (ascii) navigator.clipboard.writeText(ascii);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to ASCII</h1>
      <p>Convert Base64 string to ASCII text.</p>
      <div className={styles.formRow}>
        <textarea
          rows={4}
          placeholder="Enter Base64 string..."
          value={base64}
          onChange={e => setBase64(e.target.value)}
          style={{ width: "100%", fontSize: 16 }}
        />
        <button className={styles.actionButton} onClick={handleConvert}>
          Convert
        </button>
      </div>
      <label>ASCII Output:</label>
      <div className={styles.formRow}>
        <textarea
          rows={3}
          value={ascii}
          readOnly
          style={{ width: "100%", fontSize: 16 }}
        />
        <button className={styles.actionButton} onClick={handleCopy} disabled={!ascii}>
          Copy
        </button>
      </div>
    </div>
  );
}

