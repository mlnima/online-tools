"use client";
import React, { useState, useRef } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function PNGToBase64() {
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    setOutput("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "image/png") {
      setError("Only PNG files are supported.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      setOutput(base64);
    };
    reader.onerror = () => {
      setError("Error reading file.");
    };
    reader.readAsDataURL(file);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  function handleClear() {
    setOutput("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>PNG to Base64</h1>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png"
        onChange={handleFileChange}
        className={styles.actionButton}
        style={{ marginBottom: 16 }}
      />
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={8}
        placeholder="Base64 output will appear here..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
      />
      <div style={{ marginTop: 8 }}>
        {output && (
          <>
            <button onClick={handleCopy} className={styles.actionButton} style={{ marginRight: 8 }}>Copy</button>
            <button onClick={handleClear} className={styles.actionButton}>Clear</button>
          </>
        )}
      </div>
    </div>
  );
}
