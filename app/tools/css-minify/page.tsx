"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const minifyCss = (css: string): string => {
  try {
    // Remove comments
    let minified = css.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, "");
    // Remove whitespace around symbols
    minified = minified.replace(/\s*([{}:;,])\s*/g, "$1");
    // Remove extra spaces, tabs, and newlines
    minified = minified.replace(/\s+/g, " ");
    // Remove unnecessary semicolons and spaces
    minified = minified.replace(/;}/g, "}");
    return minified.trim();
  } catch {
    throw new Error("Invalid CSS input or minification error.");
  }
};

const CssMinify: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleMinify = () => {
    setError(null);
    try {
      setOutput(minifyCss(input));
    } catch (e: any) {
      setError(e.message || "Minification error.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Minify</h1>
      <p>Minify and compress your CSS code for faster websites.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="css-input" className={styles.label}>Input CSS</label>
          <textarea
            id="css-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className={styles.inputArea}
            placeholder="Paste your CSS here..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="css-output" className={styles.label}>Minified CSS</label>
              <textarea
                id="css-output"
                value={output}
                readOnly
                rows={10}
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleMinify} className={styles.actionButton}>Minify</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default CssMinify;

