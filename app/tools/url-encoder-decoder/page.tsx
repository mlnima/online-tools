"use client";
"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");

  function handleEncode() {
    setError("");
    try {
      setEncoded(encodeURIComponent(input));
    } catch (e) {
      setError("Error encoding URL.");
      setEncoded("");
    }
  }

  function handleDecode() {
    setError("");
    try {
      setDecoded(decodeURIComponent(input));
    } catch (e) {
      setError("Error decoding URL.");
      setDecoded("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>URL Encoder/Decoder</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text to encode or decode..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={handleEncode} className={styles.actionButton}>Encode</button>
        <button onClick={handleDecode} className={styles.actionButton}>Decode</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 12 }}>
        <textarea
          value={encoded}
          readOnly
          rows={3}
          placeholder="Encoded output..."
          className={styles.outputArea}
          style={{ width: '48%' }}
        />
        <textarea
          value={decoded}
          readOnly
          rows={3}
          placeholder="Decoded output..."
          className={styles.outputArea}
          style={{ width: '48%' }}
        />
      </div>
    </div>
  );
}
