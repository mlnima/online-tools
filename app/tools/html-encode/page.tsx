"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function htmlEncode(input: string) {
  const txt = document.createElement("textarea");
  txt.textContent = input;
  return txt.innerHTML;
}

export default function HtmlEncode() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      setOutput(htmlEncode(input));
    } catch (e) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  }
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage}>
      <h1>HTML Encode</h1>
      <div className={styles.formRow}> {/* Changed from responsiveRow */}
        <div className={styles.inputColumn}>
          <label htmlFor="html-input-encode" className={styles.label}>HTML Input</label>
          <textarea
            id="html-input-encode"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            className={styles.inputArea}
            placeholder="Paste HTML here..."
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="html-output-encode" className={styles.label}>Encoded Result:</label>
          <textarea
            id="html-output-encode"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={4}
            placeholder="Encoded output"
          />
        </div>
      </div>
      <div className={styles.buttonRow}> {/* Changed div to buttonRow */}
        <button onClick={handleConvert} className={styles.actionButton}>Encode</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy Output</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>} {/* Removed inline style */}
    </div>
  );
}
