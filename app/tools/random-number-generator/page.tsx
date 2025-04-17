"use client";
import { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

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
        <label>Min:</label>
        <input type="number" value={min} onChange={e => setMin(Number(e.target.value))} />
        <label>Max:</label>
        <input type="number" value={max} onChange={e => setMax(Number(e.target.value))} />
        <button className={styles.actionButton} onClick={handleGenerate}>Generate</button>
      </div>
      {result !== null && <div className={styles.result}>Result: <b>{result}</b></div>}
    </div>
  );
}
