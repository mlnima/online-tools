"use client";
import { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonBeautifierClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const beautifyJson = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON Beautifier</h1>
      <p>Format and beautify your JSON data.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            rows={18}
            placeholder="Paste your JSON here..."
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="json-output" className={styles.label}>Beautified JSON</label>
          <textarea
            id="json-output"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={18}
            placeholder="Beautified JSON will appear here..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button
          onClick={beautifyJson}
          className={styles.actionButton}
        >
          Beautify
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
