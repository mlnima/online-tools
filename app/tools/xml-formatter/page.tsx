"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>XML Formatter</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={8}
        placeholder="Paste XML here..."
        className={unifiedToolPageStyles.inputArea}
      />
      <button onClick={handleFormat} className={unifiedToolPageStyles.actionButton}>Format</button>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={8}
        placeholder="Formatted XML output..."
        className={unifiedToolPageStyles.outputArea}
      />
    </div>
  );
}
