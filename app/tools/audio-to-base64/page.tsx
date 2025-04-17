"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

export default function AudioToBase64() {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setBase64(result.split(",")[1] || "");
      };
      reader.readAsDataURL(f);
    } else {
      setBase64("");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Audio to Base64</h1>
      <p>Convert audio files (mp3, wav, etc.) to Base64 encoding.</p>
      <div className={styles.formRow}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        {file && <span style={{ marginLeft: 8 }}>{file.name}</span>}
      </div>
      <label>Base64 Output:</label>
      <div className={styles.formRow}>
        <textarea
          rows={5}
          value={base64}
          readOnly
          style={{ width: "100%", fontSize: 16 }}
        />
        <button className={styles.actionButton} onClick={handleCopy} disabled={!base64}>
          Copy
        </button>
      </div>
    </div>
  );
}

