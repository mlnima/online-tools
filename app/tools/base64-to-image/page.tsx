"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToImage() {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  function handleConvert() {
    setError("");
    if (!base64.trim()) {
      setImgSrc("");
      setError("Please enter a Base64 string.");
      return;
    }
    let src = base64.trim();
    // Try to auto-detect image type if not present
    if (!src.startsWith("data:")) {
      // Assume PNG by default
      src = `data:image/png;base64,${src}`;
    }
    setImgSrc(src);
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to Image</h1>
      <p>Paste a Base64 string to see the image.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-input" className={styles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste Base64 image string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          {imgSrc && (
            <>
              <label htmlFor="image-preview-output" className={styles.label}>Image Preview</label>
              <img id="image-preview-output" src={imgSrc} alt="Decoded" className={styles.imagePreview} />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!base64}>Copy Base64</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
