"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function stylusToScss(stylus: string): string {
  // Naive conversion: indentation to braces, add semicolons, colons, etc.
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
      result.push('}'.repeat(indentStack.length ? 1 : 0));
      prevIndent = indentStack.pop() ?? 0;
    }
    // Open block for selectors
    if (trimmed.endsWith(':')) {
      result.push(trimmed.replace(/:$/, ' {'));
      indentStack.push(indent);
      prevIndent = indent;
      continue;
    }
    // Property line
    if (trimmed.includes(' ')) {
      let [prop, ...rest] = trimmed.split(' ');
      let val = rest.join(' ');
      result.push(`${prop}: ${val};`);
    } else {
      result.push(trimmed);
    }
    prevIndent = indent;
  }
  // Close remaining blocks
  while (indentStack.length) {
    result.push('}');
    indentStack.pop();
  }
  return result.join('\n');
}

export default function StylusToScss() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      setOutput(stylusToScss(input));
    } catch (e) {
      setError("Error converting Stylus to SCSS.");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage}> {/* Changed from centeredBox */}
      <h1>Stylus to SCSS</h1>
      <p className={styles.warningText}> {/* Used p for semantic warning text */}
        Note: This is a naive converter. Only basic indentation and property syntax are handled.
      </p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="stylus-input" className={styles.label}>Stylus Input</label>
          <textarea
            id="stylus-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={8}
            placeholder="Paste Stylus code here..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="scss-output" className={styles.label}>SCSS Output</label>
          <textarea
            id="scss-output"
            value={output}
            readOnly
            rows={8}
            placeholder="SCSS output..."
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
