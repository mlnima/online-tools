"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

function stringToHex(str: string): string {
  return Array.from(str)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

export default function StringToHex() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      setOutput(stringToHex(input));
    } catch (e) {
      setError("Error converting string to hex.");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>String to Hex</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter string here..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleConvert} className={styles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="Hex output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
