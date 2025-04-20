"use client";
"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function formatXml(xml: string) {
    // Basic pretty-print for XML
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\n$2$3');
    let pad = 0;
    xml.split('\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/.+>$/)) {
        indent = 0;
      } else if (node.match(/^<\//)) {
        if (pad !== 0) pad -= 2;
      } else if (node.match(/^<([^!?]+)>$/)) {
        indent = 2;
      } else {
        indent = 0;
      }
      formatted += ' '.repeat(pad) + node + '\n';
      pad += indent;
    });
    return formatted.trim();
  }

  function handleFormat() {
    setError("");
    try {
      const formatted = formatXml(input);
      setOutput(formatted);
    } catch (e) {
      setError("Error formatting XML.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>XML Formatter</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={8}
        placeholder="Paste XML here..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleFormat} className={styles.actionButton} style={{ marginBottom: 16 }}>Format</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={8}
        placeholder="Formatted XML output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
    </div>
  );
}
