"use client";
import { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);

  function handleGenerate() {
    setResult(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Random Number Generator</h1>
      <p>Generate a random number between your chosen range.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="min-input" className={styles.label}>Min Value:</label>
          <input type="number" id="min-input" value={min} onChange={e => setMin(Number(e.target.value))} className={styles.inputField} />
        </div>
        <div className={styles.inputColumn}> {/* Using another inputColumn for the second input field for alignment */}
          <label htmlFor="max-input" className={styles.label}>Max Value:</label>
          <input type="number" id="max-input" value={max} onChange={e => setMax(Number(e.target.value))} className={styles.inputField} />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.actionButton} onClick={handleGenerate}>Generate</button>
      </div>
      {result !== null && <div className={styles.result}>Result: <b>{result}</b></div>}
    </div>
  );
}
