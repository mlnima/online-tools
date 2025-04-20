"use client";
import React from "react";

import toolsStyles from "../../styles/Tools.module.scss";

function encodeBase64(str: string) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return "";
  }
}

export default function JavascriptToBase64Alt() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    if (!input.trim()) {
      setError("Input cannot be empty");
      setOutput("");
      return;
    }
    try {
      const encoded = encodeBase64(input);
      if (!encoded) throw new Error("Encoding failed");
      setOutput(encoded);
    } catch (e) {
      setError((e as Error).message || "Encoding failed");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>Javascript to Base64 (Alt)</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        className={toolsStyles.inputArea}
        rows={6}
        style={{ width: 340, fontFamily: 'monospace', fontSize: 13, background: 'var(--color-bg-secondary)' }}
        placeholder="Paste your JavaScript code here"
      />
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16, marginTop: 8 }}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        className={toolsStyles.outputArea}
        rows={4}
        style={{ width: 340, fontFamily: 'monospace', fontSize: 13, background: 'var(--color-bg-secondary)' }}
        placeholder="Base64 output will appear here"
      />
      {output && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
