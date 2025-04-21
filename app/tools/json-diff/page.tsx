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
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 32 }}>
      <h1>JSON Diff</h1>
      <p>Compare two JSON objects and see the differences.</p>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <textarea
          value={inputA}
          onChange={e => setInputA(e.target.value)}
          rows={10}
          style={{ width: "50%", fontFamily: "monospace", fontSize: 16 }}
          placeholder="First JSON..."
        />
        <textarea
          value={inputB}
          onChange={e => setInputB(e.target.value)}
          rows={10}
          style={{ width: "50%", fontFamily: "monospace", fontSize: 16 }}
          placeholder="Second JSON..."
        />
      </div>
      <button onClick={handleCompare} className={styles.actionButton}>Compare</button>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {diffs.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3>Differences:</h3>
          <ul style={{ textAlign: "left", fontFamily: "monospace", fontSize: 16 }}>
            {diffs.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      )}
      {diffs.length === 0 && !error && (
        <div style={{ marginTop: 24, color: "green" }}>No differences found.</div>
      )}
    </div>
  );
};

export default JsonDiff;

