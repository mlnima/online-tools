"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from '../../styles/UnifiedToolPage.module.scss';

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>WebP to Base64</h1>
      <input type="file" onChange={handleFile} />
      {error && <p className={unifiedToolPageStyles.error}>{error}</p>}
      {output && (
        <div>
          <h2>Base64 Output:</h2>
          <textarea
            className={unifiedToolPageStyles.inputArea}
            value={output}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
