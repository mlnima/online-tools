"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function textToAscii(input: string): string {
  try {
    return Array.from(input).map(c => c.charCodeAt(0).toString()).join(" ");
  } catch {
    return "Invalid text input";
  }
}

export default function TextToASCII() {
  const [text, setText] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    setAscii(textToAscii(text));
  }

  function handleCopy() {
    if (ascii && ascii !== "Invalid text input") navigator.clipboard.writeText(ascii);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Text to ASCII</h1>
      <p>Convert text to ASCII codes (space separated).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="text-input" className={styles.label}>Text Input</label>
          <textarea
            id="text-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste text..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="ascii-output" className={styles.label}>ASCII Output:</label>
          <textarea
            id="ascii-output"
            rows={4} /* Adjusted rows to match input for consistency */
            className={styles.outputArea} /* Corrected class */
            value={ascii}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.actionButton} onClick={handleConvert}>Convert</button>
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid text input"} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
}

