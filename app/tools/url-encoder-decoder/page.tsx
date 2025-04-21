"use client";
"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>URL Encoder/Decoder</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text to encode or decode..."
        className={unifiedToolPageStyles.inputArea}
      />
      <div className={unifiedToolPageStyles.flexRow}>
        <button onClick={handleEncode} className={unifiedToolPageStyles.actionButton}>Encode</button>
        <button onClick={handleDecode} className={unifiedToolPageStyles.actionButton}>Decode</button>
      </div>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <div className={unifiedToolPageStyles.flexRow}>
        <textarea
          value={encoded}
          readOnly
          rows={3}
          placeholder="Encoded output..."
          className={unifiedToolPageStyles.outputArea}
          
        />
        <textarea
          value={decoded}
          readOnly
          rows={3}
          placeholder="Decoded output..."
          className={unifiedToolPageStyles.outputArea}
          
        />
      </div>
    </div>
  );
}
