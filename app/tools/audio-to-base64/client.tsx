"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const AudioToBase64Client = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleCopy = () => {
    if (base64) navigator.clipboard.writeText(base64);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Audio to Base64</h1>
      <p>Convert audio files (mp3, wav, etc.) to Base64 encoding.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="audio-upload" className={styles.label}>Audio File</label>
          <input id="audio-upload" type="file" accept="audio/*" onChange={handleFileChange} className={styles.inputField} />
          {file && <span className={styles.fileName}>{file.name}</span>}
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output:</label>
          <textarea
            id="base64-output"
            rows={5}
            value={base64}
            readOnly
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.actionButton} onClick={handleCopy} disabled={!base64}>
          Copy
        </button>
      </div>
    </div>
  );
};
export default AudioToBase64Client;
