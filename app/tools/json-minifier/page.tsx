"use client";
import { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const minifyJson = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32 }}>
      <h1>JSON Minifier</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your JSON here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={minifyJson} className={styles.actionButton}>Minify</button>
      </div>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Minified JSON:</h3>
          <textarea value={output} readOnly rows={6} style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }} />
        </div>
      )}
    </div>
  );
}
