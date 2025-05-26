"use client";
import React, { useState, ChangeEvent } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const JpegToBase64Client = () => {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [dataUri, setDataUri] = useState(true);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setBase64("");
    setImgSrc(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|jpg)$/)) {
      setError("File must be a JPEG image.");
      return;
    }
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
  };

  const handleCopy = () => {
    if (base64) navigator.clipboard.writeText(base64);
  };

  return (
    <div className={styles.toolPage}>
      <h1>JPEG to Base64</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="jpeg-upload" className={styles.label}>JPEG File</label>
          <input
            type="file"
            id="jpeg-upload"
            accept="image/jpeg,image/jpg"
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
};
export default JpegToBase64Client;
