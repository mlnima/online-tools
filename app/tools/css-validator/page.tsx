"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const isValidCss = (css: string): boolean => {
  // Simple validation: check for balanced braces and at least one semicolon in each block
  const stack: string[] = [];
  let inBlock = false;
  let hasSemicolon = false;
  for (const char of css) {
    if (char === '{') {
      stack.push('{');
      inBlock = true;
      hasSemicolon = false;
    } else if (char === '}') {
      if (!inBlock || stack.length === 0) return false;
      if (!hasSemicolon) return false;
      stack.pop();
      inBlock = false;
    } else if (char === ';' && inBlock) {
      hasSemicolon = true;
    }
  }
  return stack.length === 0;
};

const CssValidator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleValidate = () => {
    if (isValidCss(input)) {
      setResult("Valid CSS");
    } else {
      setResult("Invalid CSS");
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Validator</h1>
      <p>Check if your CSS is valid (basic validation).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="css-input" className={styles.label}>CSS Input</label>
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
          {result && (
            <>
              <label className={styles.label}>Validation Result:</label>
              <p className={result === "Valid CSS" ? styles.successText : styles.error}>{result}</p>
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleValidate} className={styles.actionButton}>Validate</button>
      </div>
    </div>
  );
};

export default CssValidator;

