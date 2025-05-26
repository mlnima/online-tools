"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const diffJson = (a: any, b: any, path = ""): string[] => {
  let diffs: string[] = [];
  if (typeof a !== typeof b) {
    diffs.push(`${path || "root"}: Type mismatch (${typeof a} vs ${typeof b})`);
    return diffs;
  }
  if (typeof a !== "object" || a === null || b === null) {
    if (a !== b) {
      diffs.push(`${path || "root"}: Value changed from ${JSON.stringify(a)} to ${JSON.stringify(b)}`);
    }
    return diffs;
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    const maxLength = Math.max(a.length, b.length);
    for (let i = 0; i < maxLength; i++) {
      const itemPath = `${path || "root"}[${i}]`;
      if (i >= a.length) {
        diffs.push(`${itemPath}: Added ${JSON.stringify(b[i])}`);
      } else if (i >= b.length) {
        diffs.push(`${itemPath}: Removed ${JSON.stringify(a[i])}`);
      } else {
        diffs = diffs.concat(diffJson(a[i], b[i], itemPath));
      }
    }
    return diffs;
  }
  if (Array.isArray(a) || Array.isArray(b)) { // One is array, other is not (already caught by type mismatch earlier, but good for clarity)
    diffs.push(`${path || "root"}: Type mismatch (array vs object)`);
    return diffs;
  }

  // Handle objects
  const aKeys = new Set(Object.keys(a));
  const bKeys = new Set(Object.keys(b));

  for (const key of aKeys) {
    const currentPath = `${path}${path ? "." : ""}${key}`;
    if (!bKeys.has(key)) {
      diffs.push(`${currentPath}: Removed (value was ${JSON.stringify(a[key])})`);
    } else {
      diffs = diffs.concat(diffJson(a[key], b[key], currentPath));
      bKeys.delete(key); // Remove common keys to find added keys later
    }
  }

  for (const key of bKeys) { // Remaining keys in bKeys are added
    const currentPath = `${path}${path ? "." : ""}${key}`;
    diffs.push(`${currentPath}: Added (value is ${JSON.stringify(b[key])})`);
  }
  return diffs;
};


const JsonDiffClient: React.FC = () => {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [diffs, setDiffs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [comparisonDone, setComparisonDone] = useState(false);


  const handleCompare = () => {
    setError(null);
    setDiffs([]);
    setComparisonDone(false);
    if (!inputA.trim() || !inputB.trim()) {
      setError("Both JSON inputs are required.");
      return;
    }
    try {
      const a = JSON.parse(inputA);
      const b = JSON.parse(inputB);
      setDiffs(diffJson(a, b));
      setComparisonDone(true);
    } catch (e: any) {
      setError(`Invalid JSON input: ${e.message}`);
      setDiffs([]);
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON Diff</h1>
      <p>Compare two JSON objects and see the differences.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input-a" className={styles.label}>First JSON</label>
          <textarea
            id="json-input-a"
            value={inputA}
            onChange={e => {setInputA(e.target.value); setComparisonDone(false);}}
            rows={10}
            className={styles.inputArea}
            placeholder="Enter first JSON object here..."
          />
        </div>
        <div className={styles.outputColumn}> {/* Using outputColumn for the second input area */}
          <label htmlFor="json-input-b" className={styles.label}>Second JSON</label>
          <textarea
            id="json-input-b"
            value={inputB}
            onChange={e => {setInputB(e.target.value); setComparisonDone(false);}}
            rows={10}
            className={styles.inputArea} 
            placeholder="Enter second JSON object here..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleCompare} className={styles.actionButton}>Compare</button>
      </div>
      {error && <div className={styles.error} style={{whiteSpace: 'pre-wrap'}}>{error}</div>}
      
      {comparisonDone && diffs.length > 0 && (
        <div className={styles.formRow} style={{marginTop: '1rem'}}>
            <div className={styles.outputColumn}>
            <label htmlFor="diff-output" className={styles.label}>Differences:</label>
            <textarea
                id="diff-output"
                value={diffs.join("\n")}
                readOnly
                rows={8}
                className={styles.outputArea}
                placeholder="Differences will be shown here..."
            />
            </div>
        </div>
      )}
      {comparisonDone && diffs.length === 0 && !error && (
        <div className={styles.formRow} style={{marginTop: '1rem'}}>
            <div className={styles.outputColumn}>
                <p className={styles.successText}>No differences found.</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default JsonDiffClient;
