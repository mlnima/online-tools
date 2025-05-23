"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss"; // Changed import

export default function ZlibDecompressOnline() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleDecompress() {
    setError("");
    try {
      // Use pako for zlib decompression
      // @ts-ignore
      const pako = window.pako;
      if (!pako) throw new Error("pako (zlib library) not loaded");
      const compressedBytes = Uint8Array.from(atob(input), c => c.charCodeAt(0));
      const decompressed = pako.inflate(compressedBytes, { to: 'string' });
      setOutput(decompressed);
    } catch (e) {
      setError("Invalid zlib-compressed Base64 string or decompression error.");
      setOutput("");
    }
  }
  return (
    <div className={styles.toolPage}> {/* Changed class */}
      <h1>zLib Decompress Online</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="zlib-input" className={styles.label}>Compressed (Base64) Input</label>
          <textarea 
            id="zlib-input" 
            className={styles.inputArea} 
            placeholder="Paste zlib-compressed Base64 string here..." 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            rows={6} // Added default rows
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="zlib-output" className={styles.label}>Decompressed Output</label>
          <textarea 
            id="zlib-output"
            className={styles.outputArea} // Changed from inputArea
            value={output} 
            readOnly 
            rows={6} // Added default rows
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.actionButton} onClick={handleDecompress}>Decompress</button>
        {/* Optional: Add a copy button if output is present */}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
