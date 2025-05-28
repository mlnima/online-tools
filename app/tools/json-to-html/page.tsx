"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function renderHtml(obj: any): JSX.Element {
  if (Array.isArray(obj)) {
    return (
      <ol>
        {obj.map((item, i) => (
          <li key={i}>{renderHtml(item)}</li>
        ))}
      </ol>
    );
  } else if (obj && typeof obj === "object") {
    return (
      <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", margin: "8px 0" }}>
        <tbody>
          {Object.entries(obj).map(([k, v]) => (
            <tr key={k}>
              <th style={{ textAlign: "left" }}>{k}</th>
              <td>{renderHtml(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <span>{String(obj)}</span>;
  }
}

export default function JsonToHtml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    setError(null);
    try {
      const obj = JSON.parse(input);
      setOutput(obj);
    } catch (e: any) {
      setError("Invalid JSON.");
      setOutput(null);
    }
  };

  return (
      <div className={styles.toolPage}>
    <h1>JSON to HTML</h1>
    <div className={styles.formRow}>
      <div className={styles.inputColumn}>
          <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
              className={styles.inputArea}
              placeholder="Paste your JSON here..."
          />
      </div>
      <div className={styles.inputColumn}>
          <div className={styles.outputArea}>
            {output ? renderHtml(output) : <span style={{color: '#888'}}>HTML will appear here</span>}
          </div>
      </div>
    </div>
    <div className={styles.buttonRow}>
      <button onClick={convert} className={styles.actionButton} >Convert</button>
    </div>
    {error && <div className={styles.error}>{error}</div>}
  </div>
);
}

