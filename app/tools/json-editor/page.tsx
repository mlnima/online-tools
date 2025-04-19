"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

const JsonEditor: React.FC = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    setError(null);
    try {
      setFormatted(JSON.stringify(JSON.parse(input), null, 2));
    } catch (e: any) {
      setError("Invalid JSON");
      setFormatted("");
    }
  };

  const handleCopy = () => {
    if (formatted) navigator.clipboard.writeText(formatted);
  };

  const isValid = (() => {
    try { JSON.parse(input); return true; } catch { return false; }
  })();

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>JSON Editor</h1>
      <p>Edit and validate JSON. Pretty-print and copy!</p>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste or write your JSON here..."
      />
      <div style={{ margin: "12px 0" }}>
        <span style={{ color: isValid ? "green" : "red" }}>{isValid ? "Valid JSON" : "Invalid JSON"}</span>
      </div>
      <button onClick={handleFormat} className={styles.actionButton} disabled={!isValid}>Pretty Print</button>
      {formatted && (
        <div style={{ marginTop: 24 }}>
          <h3>Formatted JSON:</h3>
          <textarea
            value={formatted}
            readOnly
            rows={10}
            style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
          />
          <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default JsonEditor;

