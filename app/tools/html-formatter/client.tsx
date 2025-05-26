"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const formatHtml = (html: string): string => {
  let formatted = '';
  let indent = '';
  html.split(/(?=<)/g).forEach(line => {
    if (/^<\//.test(line)) indent = indent.slice(2);
    formatted += indent + line.trim() + '\n';
    if (/^<[^!/][^>]*[^/]?>/.test(line)) indent += '  ';
  });
  return formatted.trim();
};

const HtmlFormatterClient = () => {
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
    <div className={styles.toolPage}>
      <h1>HTML Formatter</h1>
      <p>Format and pretty-print your HTML code.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="html-input-format" className={styles.label}>HTML Input</label>
          <textarea
            id="html-input-format"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className={styles.inputArea}
            placeholder="Paste HTML here..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="html-output-format" className={styles.label}>Formatted HTML:</label>
              <textarea
                id="html-output-format"
                value={output}
                readOnly
                rows={10}
                className={styles.outputArea}
                placeholder="Formatted HTML will appear here..."
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleFormat} className={styles.actionButton}>Format</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default HtmlFormatterClient;
