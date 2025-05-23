"use client";
import React, { useState } from "react";
import styles from '../../styles/UnifiedToolPage.module.scss';

export default function WebpToBase64() {
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("webp")) {
      setError("Please upload a WebP image.");
      setOutput("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setOutput(base64);
    };
    reader.onerror = () => {
      setError("Error reading file.");
      setOutput("");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.toolPage}>
      <h1>WebP to Base64</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="webp-input" className={styles.label}>WebP File</label>
          <input 
            type="file" 
            id="webp-input" 
            accept="image/webp" 
            onChange={handleFile} 
            className={styles.inputField}
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="base64-output" className={styles.label}>Base64 Output:</label>
              <textarea
                id="base64-output"
                className={styles.outputArea} /* Changed from inputArea */
                value={output}
                readOnly
                rows={6} /* Added default rows */
              />
            </>
          )}
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {/* Buttons can be added here if needed, e.g., a copy button */}
    </div>
  );
}
