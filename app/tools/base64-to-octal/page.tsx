"use client";
"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

function base64ToOctal(base64: string): string {
  try {
    const str = atob(base64);
    return Array.from(str)
      .map((c) => c.charCodeAt(0).toString(8).padStart(3, "0"))
      .join(" ");
  } catch {
    return "Invalid Base64 input";
  }
}

export default function Base64ToOctal() {
  const [base64, setBase64] = useState("");
  const [octal, setOctal] = useState("");

  function handleConvert() {
    setOctal(base64ToOctal(base64));
  }

  function handleCopy() {
    if (octal && octal !== "Invalid Base64 input") navigator.clipboard.writeText(octal);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to Octal</h1>
      <p>Convert Base64 string to octal representation.</p>
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
        <label>Octal Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={octal}
          readOnly
        />
        <button onClick={handleCopy} disabled={!octal || octal === "Invalid Base64 input"} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

