"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const beautifyCss = (css: string): string => {
  // Simple CSS beautification: add indentation and line breaks
  try {
    let formatted = css
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/\n\s*\n/g, '\n');
    // Remove trailing whitespace and extra indentation
    formatted = formatted.replace(/\n\s+}/g, '\n}');
    return formatted.trim();
  } catch {
    throw new Error("Invalid CSS input or formatting error.");
  }
};

const CssBeautifier: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleBeautify = () => {
    setError(null);
    try {
      setOutput(beautifyCss(input));
    } catch (e: any) {
      setError(e.message || "Formatting error.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Beautifier</h1>
      <p>Format and beautify your CSS code.</p>
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
              <label htmlFor="css-output" className={styles.label}>Beautified CSS</label>
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
        <button onClick={handleBeautify} className={styles.actionButton}>Beautify</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default CssBeautifier;

