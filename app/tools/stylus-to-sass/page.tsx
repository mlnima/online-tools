"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

function stylusToSass(stylus: string): string {
  // Naive conversion: flatten braces, remove semicolons, keep indentation
  let lines = stylus.split(/\r?\n/);
  let result = [];
  let indentStack: number[] = [];
  let prevIndent = 0;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let indent = line.match(/^\s*/)?.[0].length || 0;
    let trimmed = line.trim();
    if (!trimmed) continue;
    // Close blocks if indentation decreases
    while (indent < prevIndent) {
      prevIndent = indentStack.pop() ?? 0;
    }
    // Remove braces/semicolons from property lines
    let converted = trimmed.replace(/[;{}]/g, "");
    result.push(" ".repeat(indent) + converted);
    if (trimmed.endsWith(':')) {
      indentStack.push(indent);
      prevIndent = indent;
    } else {
      prevIndent = indent;
    }
  }
  return result.join('\n');
}

export default function StylusToSass() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      setOutput(stylusToSass(input));
    } catch (e) {
      setError("Error converting Stylus to SASS.");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Stylus to SASS</h1>
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
        Note: This is a naive converter. Only basic indentation and property syntax are handled.
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={8}
        placeholder="Paste Stylus code here..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleConvert} className={styles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={8}
        placeholder="SASS output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
