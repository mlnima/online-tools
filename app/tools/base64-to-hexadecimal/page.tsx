"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

function base64ToHex(base64: string): string {
  try {
    const str = atob(base64);
    return Array.from(str)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");
  } catch {
    return "Invalid Base64 input";
  }
}

export default function Base64ToHexadecimal() {
  const [base64, setBase64] = useState("");
  const [hex, setHex] = useState("");

  function handleConvert() {
    setHex(base64ToHex(base64));
  }

  function handleCopy() {
    if (hex && hex !== "Invalid Base64 input") navigator.clipboard.writeText(hex);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to Hexadecimal</h1>
      <p>Convert Base64 string to hexadecimal representation.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste Base64 string..."
        value={base64}
        onChange={e => setBase64(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>Hexadecimal Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={hex}
          readOnly
        />
        <button onClick={handleCopy} disabled={!hex || hex === "Invalid Base64 input"} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

