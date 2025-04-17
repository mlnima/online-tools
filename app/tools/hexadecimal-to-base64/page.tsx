"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

function hexToBase64(hex: string): string {
  try {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    if (cleanHex.length % 2 !== 0) return "Invalid hex input";
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
    }
    return btoa(String.fromCharCode(...bytes));
  } catch {
    return "Invalid hex input";
  }
}

export default function HexadecimalToBase64() {
  const [hex, setHex] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    setBase64(hexToBase64(hex));
  }

  function handleCopy() {
    if (base64 && base64 !== "Invalid hex input") navigator.clipboard.writeText(base64);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Hexadecimal to Base64</h1>
      <p>Convert hexadecimal string to Base64 encoding.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste hexadecimal string..."
        value={hex}
        onChange={e => setHex(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>Base64 Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={base64}
          readOnly
        />
        <button className={styles.actionButton} onClick={handleCopy} disabled={!base64 || base64 === "Invalid hex input"}>
          Copy
        </button>
      </div>
    </div>
  );
}

