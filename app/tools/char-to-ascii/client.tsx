"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const charsToAscii = (input: string): string => {
  try {
    return Array.from(input).map(c => c.charCodeAt(0).toString()).join(" ");
  } catch {
    return "Invalid character input";
  }
};

const CharToAsciiClient = () => {
  const [chars, setChars] = useState("");
  const [ascii, setAscii] = useState("");

  const handleConvert = () => {
    setAscii(charsToAscii(chars));
  };

  const handleCopy = () => {
    if (ascii && ascii !== "Invalid character input") navigator.clipboard.writeText(ascii);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Char to ASCII</h1>
      <p>Convert characters to ASCII codes (space separated).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="chars-input" className={styles.label}>Characters Input</label>
          <textarea
            id="chars-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste characters..."
            value={chars}
            onChange={e => setChars(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="ascii-output" className={styles.label}>ASCII Output:</label>
          <textarea
            id="ascii-output"
            rows={3}
            className={styles.outputArea}
            value={ascii}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid character input"} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};
export default CharToAsciiClient;
