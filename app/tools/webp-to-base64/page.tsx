"use client";
import React, { useState } from "react";
import styles from '../../styles/Tools.module.scss';

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
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>WebP to Base64</h1>
      <input type="file" onChange={handleFile} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {output && (
        <div>
          <h2>Base64 Output:</h2>
          <textarea
            style={{ width: "100%", height: 200, padding: 10 }}
            value={output}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
