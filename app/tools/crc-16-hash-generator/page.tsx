"use client";
import React from "react";
import toolsStyles from "../../styles/Tools.module.scss";

function crc16ccitt(str: string) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export default function Crc16HashGenerator() {
  const [input, setInput] = React.useState("");
  const [hash, setHash] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!input) throw new Error("Input cannot be empty.");
      setHash(crc16ccitt(input));
    } catch (e) {
      setError((e as Error).message || "Error calculating CRC-16.");
      setHash("");
    }
  }

  function handleCopy() {
    if (hash) navigator.clipboard.writeText(hash);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>CRC-16 Hash Generator</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text..."
        className={toolsStyles.inputArea}
        style={{ width: '100%' }}
      />
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Generate</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <input
        value={hash}
        readOnly
        className={toolsStyles.outputArea}
        style={{ width: 180, marginTop: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 20 }}
        placeholder="CRC-16 Hash"
      />
      {hash && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
