"use client";
import React, { useState } from "react"; // Consolidated useState import
import styles from "../../styles/UnifiedToolPage.module.scss"; // Added styles import

function unescapeHtml(str: string) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

export default function HtmlUnescape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleUnescape = () => {
    setOutput(unescapeHtml(input));
  };

  return (
    <div className={styles.toolPage}>
      <h1>HTML Unescape</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="html-unescape-input" className={styles.label}>Input Text</label>
          <textarea
            id="html-unescape-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            className={styles.inputArea}
            placeholder="Enter HTML to unescape..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="html-unescape-output" className={styles.label}>Unescaped Result:</label>
              <textarea 
                id="html-unescape-output"
                value={output} 
                readOnly 
                rows={4} /* Matched input rows */
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleUnescape} className={styles.actionButton}>Unescape</button>
        {/* Optional: Add a copy button if needed */}
      </div>
    </div>
  );
}

