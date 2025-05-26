"use client";
import React, { useState, ChangeEvent } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";
import * as pako from "pako";

const base64ToUint8Array = (base64: string): Uint8Array => {
  const binary = atob(base64.replace(/\s+/g, ""));
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const GzipDecompressOnlineClient = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [filename, setFilename] = useState("");

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    setError("");
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      try {
        if (!ev.target?.result) {
          setError("Failed to read file.");
          return;
        }
        const bytes = new Uint8Array(ev.target.result as ArrayBuffer);
        const result = pako.ungzip(bytes, { to: "string" });
        setOutput(result);
      } catch (err) {
        setError("Failed to decompress file. Ensure it is a valid GZip file.");
        setOutput("");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleConvert = () => {
    setError("");
    try {
      if (!input) throw new Error("Input cannot be empty.");
      const bytes = base64ToUint8Array(input);
      const result = pako.ungzip(bytes, { to: "string" });
      setOutput(result);
    } catch (err: any) {
      setError(err.message || "Failed to decompress input. Make sure it is Base64-encoded GZip.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>GZip Decompress Online</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="gzip-base64-input" className={styles.label}>Base64-encoded GZip String</label>
          <textarea
            id="gzip-base64-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            placeholder="Paste Base64-encoded GZip string..."
            className={styles.inputArea}
          />
          <label htmlFor="gzip-file-input" className={styles.label} style={{marginTop: "1rem"}}>Or Upload .gz File</label>
          <input 
            type="file" 
            id="gzip-file-input" 
            accept=".gz" 
            onChange={handleFile} 
            className={styles.inputField} 
          />
          {filename && <span className={styles.fileName}>File: {filename}</span>}
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="gzip-output" className={styles.label}>Decompressed Output</label>
          <textarea
            id="gzip-output"
            value={output}
            readOnly
            rows={10}
            className={styles.outputArea}
            placeholder="Decompressed output"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Decompress Text</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy Output</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default GzipDecompressOnlineClient;
