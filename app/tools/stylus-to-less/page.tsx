"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

function stylusToLess(stylus: string): string {
  // Naive conversion: indentation to braces, add semicolons
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

export default function StylusToLess() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      setOutput(stylusToLess(input));
    } catch (e) {
      setError("Error converting Stylus to LESS.");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className={unifiedToolPageStyles.centeredBox}>
      <h1>Stylus to LESS</h1>
      <div className={unifiedToolPageStyles.warningText}>
        Note: This is a naive converter. Only basic indentation and property syntax are handled.
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={8}
        placeholder="Paste Stylus code here..."
        className={unifiedToolPageStyles.inputArea}
      />
      <button onClick={handleConvert} className={`${unifiedToolPageStyles.actionButton} ${unifiedToolPageStyles.marginBottom16}`}>Convert</button>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={8}
        placeholder="LESS output..."
        className={`${unifiedToolPageStyles.outputArea} ${unifiedToolPageStyles.marginTop12}`}
      />
      {output && (
        <button onClick={handleCopy} className={`${unifiedToolPageStyles.actionButton} ${unifiedToolPageStyles.marginTop8}`}>Copy</button>
      )}
    </div>
  );
}
