"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function utf8ToAscii(input: string): string {
  try {
    return Array.from(input).map(c => c.charCodeAt(0) < 128 ? c : '?').join("");
  } catch {
    return "Invalid input";
  }
}

export default function UTF8ToASCII() {
  const [utf8, setUtf8] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    setAscii(utf8ToAscii(utf8));
  }

  function handleCopy() {
    if (ascii && ascii !== "Invalid input") navigator.clipboard.writeText(ascii);
  }

  return (
    <div className={styles.toolPage}>
      <h1>UTF8 to ASCII</h1>
      <p>Convert UTF-8 string to ASCII (non-ASCII chars replaced with '?').</p>
      <textarea
        rows={4}
        className={styles.inputArea}
        placeholder="Paste UTF-8 string..."
        value={utf8}
        onChange={e => setUtf8(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      <div className={styles.outputArea}>
        <label>ASCII Output:</label>
        <textarea
          rows={3}
          className={styles.outputArea}
          value={ascii}
          readOnly
        />
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid input"} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
}

