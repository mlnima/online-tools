"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

// Minimal JSONPath evaluator (dot and bracket notation only)
function evalJsonPath(obj: any, path: string): any {
  if (!path) return obj;
  let segs = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  let res = obj;
  for (let seg of segs) {
    if (res == null) return undefined;
    res = res[seg];
  }
  return res;
}

const JsonPathTester: React.FC = () => {
  const [json, setJson] = useState("");
  const [path, setPath] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = () => {
    setError(null);
    try {
      const obj = JSON.parse(json);
      const val = evalJsonPath(obj, path);
      setResult(val === undefined ? "Not found" : JSON.stringify(val, null, 2));
    } catch {
      setError("Invalid JSON or path");
      setResult(null);
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON Path Tester</h1>
      <p>Test JSONPath expressions (dot/bracket notation only).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input"
            value={json}
            onChange={e => setJson(e.target.value)}
            rows={8}
            className={styles.inputArea}
            placeholder="Paste your JSON here..."
          />
          <label htmlFor="jsonpath-input" className={styles.label}>JSONPath Expression</label>
          <input
            type="text"
            id="jsonpath-input"
            value={path}
            onChange={e => setPath(e.target.value)}
            className={styles.inputField}
            placeholder="Enter JSONPath (e.g. a.b[0].c)"
          />
        </div>
        {/* The output will be in a separate section below buttons */}
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleTest} className={styles.actionButton}>Test</button>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}

      {result && (
        <div className={styles.formRow}> {/* New formRow for the output section */}
          <div className={styles.outputColumn}> {/* Ensure outputColumn takes full width */}
            <label htmlFor="jsonpath-result" className={styles.label}>Result:</label>
            <pre id="jsonpath-result" className={styles.codeBlock}>{result}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonPathTester;

