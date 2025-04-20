"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

export default function JsonToXml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function toXml(obj: any, tag = "root"): string {
    if (Array.isArray(obj)) {
      return obj.map(item => toXml(item, tag)).join("");
    } else if (typeof obj === 'object' && obj !== null) {
      return `<${tag}>` + Object.entries(obj).map(([k, v]) => toXml(v, k)).join("") + `</${tag}>`;
    } else {
      return `<${tag}>${String(obj)}</${tag}>`;
    }
  }

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(toXml(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div className={toolsStyles.toolPage} style={{ width: '100%', maxWidth: 'none', margin: '0 auto', padding: 0 }}>
      <h1>JSON to XML</h1>
      <div className={toolsStyles.formRow} style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-start', justifyContent: 'center', width: '100%', maxWidth: 1900, margin: '0 auto', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 380, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label htmlFor="json-input" style={{ fontWeight: 600, marginBottom: 6 }}>JSON Input</label>
          <textarea
            id="json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={toolsStyles.inputArea}
            style={{ width: '100%', minHeight: 380, fontSize: 18, resize: 'vertical' }}
            placeholder="Enter JSON..."
          />
        </div>
        <div style={{ flex: 1, minWidth: 380, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label htmlFor="xml-output" style={{ fontWeight: 600, marginBottom: 6 }}>XML Output</label>
          <textarea
            id="xml-output"
            value={output}
            readOnly
            className={toolsStyles.outputArea}
            style={{ width: '100%', minHeight: 380, fontSize: 18, resize: 'vertical' }}
            placeholder="XML output..."
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ minWidth: 140, fontSize: 17, marginRight: 16 }}>Convert</button>
        <button onClick={() => navigator.clipboard.writeText(output)} className={toolsStyles.actionButton} style={{ minWidth: 100, fontSize: 16 }} disabled={!output}>Copy Output</button>
      </div>
      {error && <div className={toolsStyles.error} style={{ marginTop: 16, textAlign: 'center' }}>{error}</div>}
    </div>
  );
}
