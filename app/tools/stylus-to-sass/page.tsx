"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

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
    <div className={unifiedToolPageStyles.centeredBox}>
      <h1>Stylus to SASS</h1>
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
        placeholder="SASS output..."
        className={`${unifiedToolPageStyles.outputArea} ${unifiedToolPageStyles.marginTop12}`}
      />
      {output && (
        <button onClick={handleCopy} className={`${unifiedToolPageStyles.actionButton} ${unifiedToolPageStyles.marginTop8}`}>Copy</button>
      )}
    </div>
  );
}
