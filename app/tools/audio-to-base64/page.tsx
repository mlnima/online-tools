"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Audio to Base64</h1>
      <p>Convert audio files (mp3, wav, etc.) to Base64 encoding.</p>
      <div className={unifiedToolPageStyles.formRow}>
        <label htmlFor="audio-upload" className={unifiedToolPageStyles.label}>Audio File</label>
        <input id="audio-upload" type="file" accept="audio/*" onChange={handleFileChange} />
        {file && <span className={unifiedToolPageStyles.fileName}>{file.name}</span>}
      </div>
      <label className={unifiedToolPageStyles.label}>Base64 Output:</label>
      <div className={unifiedToolPageStyles.formRow}>
        <textarea
          rows={5}
          value={base64}
          readOnly
          className={unifiedToolPageStyles.outputArea}
        />
      </div>
      <div className={unifiedToolPageStyles.buttonRow}>
        <button className={unifiedToolPageStyles.actionButton} onClick={handleCopy} disabled={!base64}>
          Copy
        </button>
      </div>
    </div>
  );
}

