"use client";
"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function XmlEscapeUnescape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleEscape() {
    setError("");
    try {
      const escaped = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
      setOutput(escaped);
    } catch (e) {
      setError("Error escaping XML.");
      setOutput("");
    }
  }

  function handleUnescape() {
    setError("");
    try {
      const unescaped = input
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&amp;/g, "&");
      setOutput(unescaped);
    } catch (e) {
      setError("Error unescaping XML.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>XML Escape/Unescape</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={8}
        placeholder="Paste XML or text here..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={handleEscape} className={styles.actionButton}>Escape</button>
        <button onClick={handleUnescape} className={styles.actionButton}>Unescape</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={8}
        placeholder="Escaped/Unescaped output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
    </div>
  );
}
