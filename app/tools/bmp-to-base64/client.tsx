"use client";
import React, { useState, useRef } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const BmpToBase64Client = () => {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
    if (file && file.type === "image/bmp") {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setBase64(result.split(",")[1] || "");
      };
      reader.readAsDataURL(file);
    } else {
      setBase64("");
      if (file) setError("Please upload a valid BMP file.");
    }
  };

  const handleCopy = () => {
    if (base64) navigator.clipboard.writeText(base64);
  };

  const handleReset = () => {
    setBase64("");
    setError("");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={styles.toolPage}>
      <h1>BMP to Base64</h1>
      <p>Upload a BMP image to convert to Base64.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="bmp-upload" className={styles.label}>BMP File</label>
          <input
            type="file"
            id="bmp-upload"
            accept="image/bmp"
            ref={inputRef}
            onChange={handleFileChange}
            className={styles.inputField}
          />
          {fileName && <span className={styles.fileName}>File: {fileName}</span>}
        </div>
        <div className={styles.outputColumn}>
          {base64 && (
            <>
              <label htmlFor="base64-output" className={styles.label}>Base64 Output:</label>
              <textarea
                id="base64-output"
                rows={5}
                className={styles.outputArea}
                value={base64}
                readOnly
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleReset} className={styles.actionButton}>Reset</button>
        {base64 && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default BmpToBase64Client;
