"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function StylusCompiler() {
  const [input, setInput] = useState("");
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Stylus Compiler</h1>
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginBottom: 12 }}>
        Real Stylus compiling is not supported in-browser. This is a placeholder tool. Implementing a full compiler requires a backend or WASM module.
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={8}
        placeholder="Paste Stylus code here..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button className={styles.actionButton} style={{ marginBottom: 16 }} disabled>Compile</button>
      <textarea
        value={"(Output not available in browser)"}
        readOnly
        rows={8}
        placeholder="CSS output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
        disabled
      />
    </div>
  );
}
