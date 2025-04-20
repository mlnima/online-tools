"use client";
import React from "react";
import toolsStyles from "../../styles/Tools.module.scss";
import * as pako from "pako";

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64.replace(/\s+/g, ""));
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export default function GzipDecompressOnline() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");
  const [filename, setFilename] = React.useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    setError("");
    const reader = new FileReader();
    reader.onload = function(ev) {
      try {
        const bytes = new Uint8Array(ev.target?.result as ArrayBuffer);
        const result = pako.ungzip(bytes, { to: "string" });
        setOutput(result);
      } catch (e) {
        setError("Failed to decompress file.");
        setOutput("");
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function handleConvert() {
    setError("");
    try {
      if (!input) throw new Error("Input cannot be empty.");
      const bytes = base64ToUint8Array(input);
      const result = pako.ungzip(bytes, { to: "string" });
      setOutput(result);
    } catch (e) {
      setError("Failed to decompress input. Make sure it is Base64-encoded GZip.");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>GZip Decompress Online</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Paste Base64-encoded GZip string or upload a .gz file"
        className={toolsStyles.inputArea}
        style={{ width: '100%' }}
      />
      <div style={{ margin: '12px 0' }}>
        <input type="file" accept=".gz" onChange={handleFile} className={toolsStyles.inputArea} />
        {filename && <div style={{ fontSize: 13, marginTop: 4 }}>File: {filename}</div>}
      </div>
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Decompress</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        className={toolsStyles.outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
        placeholder="Decompressed output"
      />
      {output && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
