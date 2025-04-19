"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

function base64ToBinary(base64: string): string {
  try {
    const str = atob(base64);
    return Array.from(str)
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  } catch {
    return "Invalid Base64 input";
  }
}

export default function Base64ToBinary() {
  const [base64, setBase64] = useState("");
  const [binary, setBinary] = useState("");

  function handleConvert() {
    setBinary(base64ToBinary(base64));
  }

  function handleCopy() {
    if (binary && binary !== "Invalid Base64 input") navigator.clipboard.writeText(binary);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to Binary</h1>
      <p>Convert Base64 string to binary representation.</p>
      <div className={styles.formRow}>
        <textarea
          rows={4}
          placeholder="Enter Base64 string..."
          value={base64}
          onChange={e => setBase64(e.target.value)}
          className={styles.actionButton}
        />
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      </div>
      <label>Binary Output:</label>
      <div className={styles.formRow}>
        <textarea
          rows={5}
          value={binary}
          readOnly
          style={{ width: "100%", fontSize: 16 }}
        />
        <button className={styles.actionButton} onClick={handleCopy} disabled={!binary || binary === "Invalid Base64 input"}>
          Copy
        </button>
      </div>
    </div>
  );
}

