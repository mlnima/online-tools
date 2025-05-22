"use client";
import React, { useState, useRef } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function GIFToBase64() {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
    if (file && file.type === "image/gif") {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setBase64(result.split(",")[1] || "");
      };
      reader.readAsDataURL(file);
    } else {
      setBase64("");
      if (file) setError("Please upload a valid GIF file.");
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
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>GIF to Base64</h1>
      <p>Upload a GIF image to convert to Base64.</p>
      <input
        type="file"
        accept="image/gif"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ marginBottom: 8 }}
      />
      {fileName && <div style={{ margin: 8 }}>File: {fileName}</div>}
      <button onClick={handleReset} className={styles.actionButton}>Reset</button>
      {error && <div style={{ color: "red", margin: 8 }}>{error}</div>}
      {base64 && (
        <div style={{ marginTop: 24 }}>
          <label>Base64 Output:</label>
          <textarea
            rows={5}
            style={{ width: "100%", fontSize: 16 }}
            value={base64}
            readOnly
          />
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        </div>
      )}
    </div>
  );
}
