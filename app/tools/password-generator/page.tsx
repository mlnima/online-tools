import React from "react";

import { useState } from "react";

function generatePassword(length: number, opts: { upper: boolean; lower: boolean; number: boolean; symbol: boolean; }) {
  let chars = "";
  if (opts.upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (opts.lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (opts.number) chars += "0123456789";
  if (opts.symbol) chars += "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
  if (!chars) return "";
  let pwd = "";
  for (let i = 0; i < length; ++i) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  return pwd;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");

  const handleGenerate = () => {
    setPassword(generatePassword(length, { upper, lower, number, symbol }));
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 32 }}>
      <h1>Password Generator</h1>
      <div style={{ margin: "16px 0" }}>
        <label>
          Length:
          <input type="number" min={4} max={64} value={length} onChange={e => setLength(Number(e.target.value))} style={{ width: 60, marginLeft: 8 }} />
        </label>
      </div>
      <div style={{ margin: "8px 0" }}>
        <label><input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} /> Uppercase</label>
        <label style={{ marginLeft: 16 }}><input type="checkbox" checked={lower} onChange={e => setLower(e.target.checked)} /> Lowercase</label>
        <label style={{ marginLeft: 16 }}><input type="checkbox" checked={number} onChange={e => setNumber(e.target.checked)} /> Numbers</label>
        <label style={{ marginLeft: 16 }}><input type="checkbox" checked={symbol} onChange={e => setSymbol(e.target.checked)} /> Symbols</label>
      </div>
      <div style={{ margin: "16px 0" }}>
        <button onClick={handleGenerate} style={{ padding: "8px 24px", fontSize: 16 }}>Generate</button>
      </div>
      {password && (
        <div style={{ marginTop: 24 }}>
          <h3>Password:</h3>
          <input value={password} readOnly style={{ width: "100%", fontFamily: "monospace", fontSize: 18, padding: 8 }} />
        </div>
      )}
    </div>
  );
}

