"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const unescapeHtml = (input: string): string => {
  try {
    const txt = document.createElement("textarea");
    txt.innerHTML = input;
    return txt.value;
  } catch (e) {
    console.error("Error in unescapeHtml:", e);
    return input; 
  }
};

const HtmlUnescapeClient = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleUnescape = () => {
    setError(null);
    try {
      setOutput(unescapeHtml(input));
    } catch (e) {
      setError("Error during HTML unescaping.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
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
                rows={4}
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleUnescape} className={styles.actionButton}>Unescape</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy Output</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default HtmlUnescapeClient;
