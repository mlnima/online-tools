"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

import { useState } from "react";

export default function UrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
  };

  return (
    <div className={styles.toolPage}>
      <h1>URL Encode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        className={styles.inputArea}
        placeholder="Enter text to encode..."
      />
      <div className={styles.flexRow}>
        <button onClick={handleEncode} className={styles.actionButton}>Encode</button>
      </div>
      {output && (
        <div className={styles.outputArea}>
          <h3>Encoded Result:</h3>
          <textarea value={output} readOnly rows={2} className={styles.outputArea} />
        </div>
      )}
    </div>
  );
}

