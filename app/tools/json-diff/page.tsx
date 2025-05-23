"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function diffJson(a: any, b: any, path = ""): string[] {
  let diffs: string[] = [];
  if (typeof a !== typeof b) {
    diffs.push(`${path || "root"} (type mismatch)`);
    return diffs;
  }
  if (typeof a !== "object" || a === null || b === null) {
    if (a !== b) diffs.push(`${path || "root"}: ${JSON.stringify(a)} !== ${JSON.stringify(b)}`);
    return diffs;
  }
  const aKeys = new Set(Object.keys(a));
  const bKeys = new Set(Object.keys(b));
  for (const key of aKeys) {
    if (!bKeys.has(key)) diffs.push(`${path}${path ? "." : ""}${key} (removed)`);
    else diffs = diffs.concat(diffJson(a[key], b[key], `${path}${path ? "." : ""}${key}`));
  }
  for (const key of bKeys) {
    if (!aKeys.has(key)) diffs.push(`${path}${path ? "." : ""}${key} (added)`);
  }
  return diffs;
}

const JsonDiff: React.FC = () => {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [diffs, setDiffs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = () => {
    setError(null);
    try {
      const a = JSON.parse(inputA);
      const b = JSON.parse(inputB);
      setDiffs(diffJson(a, b));
    } catch {
      setError("Invalid JSON input");
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
            onChange={e => setInputA(e.target.value)}
            rows={10}
            className={styles.inputArea}
            placeholder="First JSON..."
          />
        </div>
        <div className={styles.outputColumn}> {/* Using outputColumn for the second input area */}
          <label htmlFor="json-input-b" className={styles.label}>Second JSON</label>
          <textarea
            id="json-input-b"
            value={inputB}
            onChange={e => setInputB(e.target.value)}
            rows={10}
            className={styles.inputArea} // Still an input for the user
            placeholder="Second JSON..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleCompare} className={styles.actionButton}>Compare</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {diffs.length > 0 && (
        <div className={styles.formRow}> {/* New formRow for the output */}
            <div className={styles.outputColumn}> {/* Output column spans full width */}
            <label htmlFor="diff-output" className={styles.label}>Differences:</label>
            <textarea
                id="diff-output"
                value={diffs.join("\\n")}
                readOnly
                rows={8}
                className={styles.outputArea}
            />
            </div>
        </div>
      )}
      {diffs.length === 0 && !error && inputA && inputB && ( // Show only if comparison has been run
        <div className={styles.formRow}>
            <div className={styles.outputColumn}>
                <p>No differences found.</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default JsonDiff;

