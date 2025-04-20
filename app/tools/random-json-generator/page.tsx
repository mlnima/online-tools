"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

function randomValue(depth: number, maxDepth: number): any {
  if (depth > maxDepth) return null;
  const types = ["string", "number", "boolean", "object", "array", "null"];
  const type = types[Math.floor(Math.random() * types.length)];
  switch (type) {
    case "string": return Math.random().toString(36).substring(2, 8);
    case "number": return Math.floor(Math.random() * 10000);
    case "boolean": return Math.random() > 0.5;
    case "object": {
      if (depth === maxDepth) return null;
      const obj: any = {};
      const keys = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < keys; i++) {
        obj[Math.random().toString(36).substring(2, 6)] = randomValue(depth + 1, maxDepth);
      }
      return obj;
    }
    case "array": {
      if (depth === maxDepth) return [];
      const arr = [];
      const len = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < len; i++) {
        arr.push(randomValue(depth + 1, maxDepth));
      }
      return arr;
    }
    case "null": return null;
  }
}

function generateRandomJson(count: number, maxDepth: number): any[] {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(randomValue(0, maxDepth));
  }
  return arr;
}

export default function RandomJsonGenerator() {
  const [count, setCount] = useState(3);
  const [maxDepth, setMaxDepth] = useState(2);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleGenerate() {
    setError("");
    if (count < 1 || count > 100) {
      setError("Count must be between 1 and 100.");
      setOutput("");
      return;
    }
    if (maxDepth < 1 || maxDepth > 6) {
      setError("Max depth must be between 1 and 6.");
      setOutput("");
      return;
    }
    try {
      const json = generateRandomJson(count, maxDepth);
      setOutput(JSON.stringify(json, null, 2));
    } catch (e) {
      setError("Error generating random JSON.");
      setOutput("");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Random JSON Generator</h1>
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 10 }}>
          Objects:
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            style={{ width: 60, marginLeft: 6 }}
          />
        </label>
        <label style={{ marginLeft: 10 }}>
          Max Depth:
          <input
            type="number"
            min={1}
            max={6}
            value={maxDepth}
            onChange={e => setMaxDepth(Number(e.target.value))}
            style={{ width: 60, marginLeft: 6 }}
          />
        </label>
      </div>
      <button onClick={handleGenerate} className={styles.actionButton} style={{ marginBottom: 16 }}>Generate</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={10}
        placeholder="Random JSON output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
