"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function CSVToBase64() {
  const [csv, setCsv] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(csv)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid CSV input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>CSV to Base64</h1>
      <p>Encode CSV text to Base64 (UTF-8 encoded).</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste CSV text..."
        value={csv}
        onChange={e => setCsv(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>Base64 Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={base64}
          readOnly
        />
        <button onClick={handleCopy} disabled={!base64} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
}

