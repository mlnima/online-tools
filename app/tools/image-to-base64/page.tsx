"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function ImageToBase64() {
  const [base64, setBase64] = React.useState("");
  const [error, setError] = React.useState("");
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const [dataUri, setDataUri] = React.useState(true);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    setBase64("");
    setImgSrc(null);
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImgSrc(result);
      if (dataUri) {
        setBase64(result);
      } else {
        // Strip data:image/...;base64,
        const idx = result.indexOf(",");
        setBase64(idx !== -1 ? result.slice(idx + 1) : result);
      }
    };
    reader.onerror = () => {
      setError("Failed to read file.");
    };
    reader.readAsDataURL(file);
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Image to Base64</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className={styles.inputFile}
        style={{ marginBottom: 12 }}
      />
      <label style={{ display: 'block', marginBottom: 8 }}>
        <input type="checkbox" checked={dataUri} onChange={() => setDataUri(v => !v)} />
        &nbsp;Output as Data URI
      </label>
      {imgSrc && (
        <div style={{ marginBottom: 12 }}>
          <img src={imgSrc} alt="preview" style={{ maxWidth: 180, maxHeight: 180, borderRadius: 8, border: '1px solid #ccc' }} />
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{fileName}</div>
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={base64}
        readOnly
        className={styles.outputArea}
        rows={6}
        style={{ width: 340, fontFamily: 'monospace', fontSize: 13, background: 'var(--color-bg-secondary)' }}
        placeholder="Base64 output will appear here"
      />
      {base64 && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
