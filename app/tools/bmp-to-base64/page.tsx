"use client";
import React, { useState, useRef } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function BMPToBase64() {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
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
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  function handleReset() {
    setBase64("");
    setError("");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={styles.toolPage}>
      <h1>BMP to Base64</h1>
      <p>Upload a BMP image to convert to Base64.</p>
      <input
        type="file"
        accept="image/bmp"
        ref={inputRef}
        onChange={handleFileChange}
        
      />
      {fileName && <div >File: {fileName}</div>}
      <button onClick={handleReset} className={styles.actionButton} >Reset</button>
      {error && <div >{error}</div>}
      {base64 && (
        <div >
          <label>Base64 Output:</label>
          <textarea
            rows={5}
            className={styles.outputArea}
            value={base64}
            readOnly
          />
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        </div>
      )}
    </div>
  );
}
