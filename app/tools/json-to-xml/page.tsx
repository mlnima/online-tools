import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to XML Converter | WebWizKit',
  description: 'Convert JSON data structures to XML format. An online data transformation tool by WebWizKit.',
  keywords: ['JSON to XML', 'JSON Converter', 'XML Converter', 'Data Transformation', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonToXml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function escapeXmlText(text: unknown): string {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeTagName(key: string): string {
    if (!key || String(key).trim() === "") return "item";
    let tagName = String(key).replace(/[^a-zA-Z0-9_.-]+/g, '_');
    if (/^([0-9.-]|xml)/i.test(tagName)) {
      tagName = '_' + tagName;
    }
    if (tagName.length === 0 || /^([_.-]*|[0-9.-]+)$/.test(tagName) && tagName !== "_" && tagName !== "-" && tagName !== ".") {
      return "item";
    }
    return tagName;
  }

  function toXml(obj: any, tag = "root"): string {
    const validTag = sanitizeTagName(tag);

    if (Array.isArray(obj)) {
      return obj.map(item => toXml(item, validTag)).join(""); // Using parent's sanitized tag for array items
    } else if (typeof obj === 'object' && obj !== null) {
      const children = Object.entries(obj)
        .map(([k, v]) => toXml(v, k)) // Key 'k' will be sanitized in the recursive call
        .join("");
      return `<${validTag}>${children}</${validTag}>`;
    } else {
      return `<${validTag}>${escapeXmlText(obj)}</${validTag}>`;
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
    <div className={styles.toolPage}>
      <h1>JSON to XML</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            rows={10} // Default rows
            placeholder="Enter JSON..."
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="xml-output" className={styles.label}>XML Output</label>
          <textarea
            id="xml-output"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={10} // Default rows
            placeholder="XML output..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={() => navigator.clipboard.writeText(output)} className={styles.actionButton} disabled={!output}>Copy Output</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
