"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function htmlDecode(input: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
}

export default function HtmlDecode() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      setOutput(htmlDecode(input));
    } catch (e) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  }
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage} style={{ width: '100%', maxWidth: 'none', margin: '0 auto', padding: 0 }}>
      <h1>HTML Decode</h1>
      <div className={styles.formRow} style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-start', justifyContent: 'center', width: '100%', maxWidth: 1900, margin: '0 auto', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 380, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label htmlFor="html-input" style={{ fontWeight: 600, marginBottom: 6 }}>HTML Input</label>
          <textarea
            id="html-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            placeholder="<div>Hello</div>"
            style={{ width: '100%', minHeight: 380, fontSize: 18, resize: 'vertical' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 380, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label htmlFor="html-output" style={{ fontWeight: 600, marginBottom: 6 }}>Decoded Output</label>
          <textarea
            id="html-output"
            value={output}
            readOnly
            className={styles.outputArea}
            style={{ width: '100%', minHeight: 380, fontSize: 18, fontFamily: 'monospace', resize: 'vertical' }}
            placeholder="Decoded output"
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleConvert} className={styles.actionButton} >Decode</button>
        <button onClick={handleCopy} className={styles.actionButton}  disabled={!output}>Copy Output</button>
      </div>
      {error && <div className={styles.error} style={{ marginTop: 16, textAlign: 'center' }}>{error}</div>}
    </div>
  );
}
