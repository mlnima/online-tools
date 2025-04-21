"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Base64 to Image</h1>
      <p>Paste a Base64 string to see the image.</p>
      <div className={unifiedToolPageStyles.formRow}>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="base64-input" className={unifiedToolPageStyles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            rows={4}
            className={unifiedToolPageStyles.inputArea}
            placeholder="Paste Base64 image string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className={unifiedToolPageStyles.buttonRow}>
        <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={unifiedToolPageStyles.actionButton} disabled={!base64}>Copy Base64</button>
      </div>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      {imgSrc && (
        <div className={unifiedToolPageStyles.formRow}>
          <div className={unifiedToolPageStyles.inputColumn}>
            <img src={imgSrc} alt="Decoded" className={unifiedToolPageStyles.imagePreview} />
          </div>
        </div>
      )}
    </div>
  );
}
