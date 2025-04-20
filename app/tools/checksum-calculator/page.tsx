"use client";
import React from "react";

import toolsStyles from "../../styles/Tools.module.scss";

export default function ChecksumCalculator() {
  const [input, setInput] = React.useState("");
  const [checksum, setChecksum] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!input) throw new Error("Input cannot be empty.");
      // Simple checksum: sum of char codes
      const sum = Array.from(input).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      setChecksum(sum.toString());
    } catch (e) {
      setError((e as Error).message || "Error calculating checksum.");
      setChecksum("");
    }
  }

  function handleCopy() {
    if (checksum) navigator.clipboard.writeText(checksum);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>Checksum Calculator</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text..."
        className={toolsStyles.inputArea}
        style={{ width: '100%' }}
      />
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Calculate</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <input
        value={checksum}
        readOnly
        className={toolsStyles.outputArea}
        style={{ width: 180, marginTop: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 20 }}
        placeholder="Checksum"
      />
      {checksum && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
