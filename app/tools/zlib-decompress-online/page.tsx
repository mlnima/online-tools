import React, { useState } from "react";

export default function ZlibDecompressOnline() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleDecompress() {
    setError("");
    try {
      // Use pako for zlib decompression
      // @ts-ignore
      const pako = window.pako;
      if (!pako) throw new Error("pako (zlib library) not loaded");
      const compressedBytes = Uint8Array.from(atob(input), c => c.charCodeAt(0));
      const decompressed = pako.inflate(compressedBytes, { to: 'string' });
      setOutput(decompressed);
    } catch (e) {
      setError("Invalid zlib-compressed Base64 string or decompression error.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>zLib Decompress Online</h1>
      <div style={{ maxWidth: 500, margin: '32px auto', textAlign: 'left' }}>
        <label htmlFor="zlibinput" style={{ fontWeight: 500 }}>Compressed (Base64) Input</label>
        <textarea id="zlibinput" style={{ width: '100%', minHeight: 80, margin: '8px 0', padding: 8, fontSize: 16 }} placeholder="Paste zlib-compressed Base64 string here..." value={input} onChange={e => setInput(e.target.value)} />
        <button style={{ margin: '8px 0', padding: '8px 16px', fontSize: 16 }} onClick={handleDecompress}>Decompress</button>
        <div style={{ marginTop: 16 }}>
          <label style={{ fontWeight: 500 }}>Decompressed Output</label>
          <textarea style={{ width: '100%', minHeight: 80, margin: '8px 0', padding: 8, fontSize: 16 }} value={output} readOnly />
        </div>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </div>
    </div>
  );
}
