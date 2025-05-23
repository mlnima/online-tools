"use client";
import { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const minifyJson = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON Minifier</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className={styles.inputArea}
            placeholder="Paste your JSON here..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="minified-json-output" className={styles.label}>Minified JSON:</label>
              <textarea 
                id="minified-json-output"
                value={output} 
                readOnly 
                rows={10} // Adjusted rows to match input for consistency
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={minifyJson} className={styles.actionButton}>Minify</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
