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
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>JSON Path Tester</h1>
      <p>Test JSONPath expressions (dot/bracket notation only).</p>
      <textarea
        value={json}
        onChange={e => setJson(e.target.value)}
        rows={8}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your JSON here..."
      />
      <div style={{ margin: "16px 0" }}>
        <input
          type="text"
          value={path}
          onChange={e => setPath(e.target.value)}
          style={{ fontSize: 16, width: 400, fontFamily: "monospace" }}
          placeholder="Enter JSONPath (e.g. a.b[0].c)"
        />
        <button onClick={handleTest} className={styles.actionButton} style={{ marginLeft: 16 }}>Test</button>
      </div>
      {result && (
        <div style={{ marginTop: 24 }}>
          <h3>Result:</h3>
          <pre style={{ background: "#f8f8f8", padding: 16, borderRadius: 8 }}>{result}</pre>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default JsonPathTester;

