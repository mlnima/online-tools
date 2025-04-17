"use client";
import React, { useState } from "react";

export default function Base64ToCSV() {
  const [base64, setBase64] = useState("");
  const [csv, setCsv] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setCsv(decoded);
    } catch (e) {
      setCsv("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (csv) navigator.clipboard.writeText(csv);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to CSV</h1>
      <p>Decode Base64 string to CSV text.</p>
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
        <label>CSV Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={csv}
          readOnly
        />
        <button onClick={handleCopy} disabled={!csv} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

