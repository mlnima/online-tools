"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const minifyHTML = (input: string): string => {
  let output = input.replace(/<!--([\s\S]*?)-->/g, "");
  output = output.replace(/>\s+</g, "><");
  output = output.trim();
  output = output.replace(/\s{2,}/g, " ");
  return output;
};

const HtmlMinifyClient = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleMinify = () => {
    setError("");
    try {
      setOutput(minifyHTML(input));
    } catch (e: any) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HTML Minify</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="html-input-minify" className={styles.label}>HTML Input</label>
          <textarea
            id="html-input-minify"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            rows={5}
            placeholder="Paste HTML here..."
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="html-output-minify" className={styles.label}>Minified Output</label>
          <textarea
            id="html-output-minify"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={5}
            placeholder="Minified output"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleMinify} className={styles.actionButton}>Minify</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy Output</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default HtmlMinifyClient;
