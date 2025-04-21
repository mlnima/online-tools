"use client";
import React, { useState } from "react";
import styles from "./ZlibDecompressOnline.module.scss";

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
    <div className={styles.zlibPage}>
      <h1>zLib Decompress Online</h1>
      <div className={styles.zlibPanel}>
        <label htmlFor="zlibinput" className={styles.label}>Compressed (Base64) Input</label>
        <textarea id="zlibinput" className={styles.inputArea} placeholder="Paste zlib-compressed Base64 string here..." value={input} onChange={e => setInput(e.target.value)} />
        <button className={styles.button} onClick={handleDecompress}>Decompress</button>
        <div className={styles.outputPanel}>
          <label className={styles.label}>Decompressed Output</label>
          <textarea className={styles.inputArea} value={output} readOnly />
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
