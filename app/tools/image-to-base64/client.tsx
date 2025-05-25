"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function ImageToBase64Client() {
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
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="image-upload" className={styles.label}>Image File</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleFile}
            className={styles.inputField}
          />
          <label className={styles.label}> 
            <input type="checkbox" checked={dataUri} onChange={() => setDataUri(v => !v)} />
            &nbsp;Output as Data URI
          </label>
          {imgSrc && (
            <>
              <img src={imgSrc} alt="preview" className={styles.imagePreview} />
              {fileName && <span className={styles.fileName}>{fileName}</span>}
            </>
          )}
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output</label>
          <textarea
            id="base64-output"
            value={base64}
            readOnly
            className={styles.outputArea}
            rows={6}
            placeholder="Base64 output will appear here"
          />
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {base64 && (
        <div className={styles.buttonRow}>
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        </div>
      )}
    </div>
  );
}
