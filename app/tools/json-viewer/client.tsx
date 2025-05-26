"use client";
import React, { useState, FC } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

interface TreeClientProps {
  data: any;
  level?: number;
}

const TreeClient: FC<TreeClientProps> = ({ data, level = 0 }) => {
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      return (
        <ul style={{ marginLeft: level * 16, listStyleType: 'none', paddingLeft: '0' }}>
          {data.map((item, idx) => (
            <li key={idx}><TreeClient data={item} level={level + 1} /></li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul style={{ marginLeft: level * 16, listStyleType: 'none', paddingLeft: '0' }}>
          {Object.entries(data).map(([k, v]) => (
            <li key={k}><strong className={styles.jsonKey}>{k}:</strong> <TreeClient data={v} level={level + 1} /></li>
          ))}
        </ul>
      );
    }
  }
  return <span className={styles.jsonValue}>{String(data)}</span>;
};

const JsonViewerClient = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [parsed, setParsed] = useState<any | null>(null);

  const handleParse = () => {
    setError("");
    setParsed(null);
    if (!input.trim()) {
        setError("JSON input cannot be empty.");
        return;
    }
    try {
      const obj = JSON.parse(input);
      setParsed(obj);
    } catch (e: any) {
      setError(e.message || "Invalid JSON.");
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON Viewer</h1>
      <p>Paste your JSON below to view it in a structured tree format.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumnFull}>
          <label htmlFor="json-input-viewer" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input-viewer"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className={styles.inputArea}
            placeholder="Paste your JSON here..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleParse} className={styles.actionButton}>View JSON Tree</button>
      </div>
      {error && <div className={`${styles.error} ${styles.fullWidthMessage}`}>{error}</div>}
      {parsed && !error && (
        <div className={`${styles.outputColumnFull} ${styles.jsonTreeContainer}`}>
          <label className={styles.label}>JSON Tree View:</label>
          <div className={styles.treeViewWrapper}>
             <TreeClient data={parsed} />
          </div>
        </div>
      )}
    </div>
  );
};
export default JsonViewerClient;
