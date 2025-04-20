"use client";import React from "react";

import toolsStyles from "../../styles/Tools.module.scss";

function hexToString(hex: string) {
  hex = hex.replace(/^0x/, "").replace(/\s+/g, "");
  if (hex.length % 2 !== 0) throw new Error("Hex string must have even length");
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    if (isNaN(code)) throw new Error("Invalid hex digit");
    str += String.fromCharCode(code);
  }
  return str;
}

export default function HexToString() {
  const [hex, setHex] = React.useState("");
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!hex) throw new Error("Hex string required");
      setResult(hexToString(hex));
    } catch (e) {
      setError((e as Error).message || "Error");
      setResult("");
    }
  }
  function handleCopy() {
    if (result) navigator.clipboard.writeText(result);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>Hex to String</h1>
      <textarea
        value={hex}
        onChange={e => setHex(e.target.value)}
        className={toolsStyles.inputArea}
        placeholder="68656c6c6f20776f726c64"
        rows={3}
        style={{ width: 320, marginBottom: 8 }}
      />
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <textarea
        value={result}
        readOnly
        className={toolsStyles.outputArea}
        rows={3}
        style={{ width: 320, textAlign: 'left', fontFamily: 'monospace', fontSize: 16 }}
        placeholder="String output"
      />
      {result && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
