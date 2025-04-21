"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function htmlEscape(input: string) {
  const txt = document.createElement("textarea");
  txt.textContent = input;
  return txt.innerHTML;
}
function htmlUnescape(input: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
}

export default function HtmlEscapeUnescape() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleEscape() {
    setError("");
    try {
      setOutput(htmlEscape(input));
    } catch (e) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  }
  function handleUnescape() {
    setError("");
    try {
      setOutput(htmlUnescape(input));
    } catch (e) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  }
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage}>
      <h1>HTML Escape/Unescape</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        className={styles.inputField}
        placeholder="<div>Hello &amp; welcome!</div>"
        rows={3}
        style={{ width: 320, marginBottom: 8, background: 'var(--color-bg-secondary)' }}
      />
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, justifyContent: 'center' }}>
        <button onClick={handleEscape} className={styles.actionButton}>Escape</button>
        <button onClick={handleUnescape} className={styles.actionButton}>Unescape</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        className={styles.outputArea}
        rows={3}
        style={{ width: 320, textAlign: 'left', fontFamily: 'monospace', fontSize: 16, background: 'var(--color-bg-secondary)' }}
        placeholder="Output"
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
