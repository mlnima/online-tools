"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

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
  <div>
    <h1>HTML Formatter</h1>
      <p>Format and pretty-print your HTML code.</p>
      <div className={styles.responsiveRow}>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        className={styles.inputArea}
        placeholder="Paste HTML here..."
      />
      {output && (
        <div>
          <h3>Formatted HTML:</h3>
          <textarea
            value={output}
            readOnly
            rows={10}
            className={styles.outputArea}
            placeholder="Formatted HTML will appear here..."
          />
          <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
        </div>
      )}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
      <button onClick={handleFormat} className={styles.actionButton} style={{ minWidth: 140, fontSize: 17 }}>Format</button>
    </div>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default HtmlFormatter;

