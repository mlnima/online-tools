"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const asciiToText = (input: string): string => {
  try {
    const parts = input.split(/[^0-9]+/).filter(Boolean);
    return parts.map(code => String.fromCharCode(Number(code))).join("");
  } catch {
    return "Invalid ASCII input";
  }
};

const AsciiToTextClient = () => {
  const [ascii, setAscii] = useState("");
  const [text, setText] = useState("");

  const handleConvert = () => {
    setText(asciiToText(ascii));
  };

  const handleCopy = () => {
    if (text && text !== "Invalid ASCII input") navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.toolPage}>
      <h1>ASCII to Text</h1>
      <p>Convert ASCII codes (space, comma, or line separated) to text.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="ascii-input" className={styles.label}>ASCII Input</label>
          <textarea
            id="ascii-input"
            className={styles.inputArea}
            placeholder="Paste ASCII codes (e.g. 72 101 108 108 111)..."
            value={ascii}
            onChange={e => setAscii(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="text-output" className={styles.label}>Text Output</label>
          <textarea
            id="text-output"
            className={styles.outputArea}
            value={text}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!text || text === "Invalid ASCII input"}>Copy Output</button>
      </div>
    </div>
  );
};
export default AsciiToTextClient;
