"use client";
import React, { useState } from "react";

export default function Base64ToTSV() {
  const [base64, setBase64] = useState("");
  const [tsv, setTsv] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setTsv(decoded);
    } catch (e) {
      setTsv("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (tsv) navigator.clipboard.writeText(tsv);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to TSV</h1>
      <p>Decode Base64 string to TSV text.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste Base64 string..."
        value={base64}
        onChange={e => setBase64(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>TSV Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={tsv}
          readOnly
        />
        <button onClick={handleCopy} disabled={!tsv} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

