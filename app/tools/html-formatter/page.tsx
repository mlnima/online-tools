"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

function formatHtml(html: string): string {
  let formatted = '', indent = '';
  html.split(/(?=<)/g).forEach(line => {
    if (/^<\//.test(line)) indent = indent.slice(2);
    formatted += indent + line.trim() + '\n';
    if (/^<[^!/][^>]*[^/]?>/.test(line)) indent += '  ';
  });
  return formatted.trim();
}

const HtmlFormatter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    setError(null);
    try {
      setOutput(formatHtml(input));
    } catch (e: any) {
      setError("Formatting error");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>HTML Formatter</h1>
      <p>Format and pretty-print your HTML code.</p>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your HTML here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleFormat} className={styles.actionButton}>Format</button>
      </div>
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Formatted HTML:</h3>
          <textarea
            value={output}
            readOnly
            rows={10}
            style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
          />
          <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default HtmlFormatter;

