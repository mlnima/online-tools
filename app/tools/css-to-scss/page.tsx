import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS to SCSS Converter | WebWizKit',
  description: 'Convert your CSS code to SCSS syntax. Since CSS is valid SCSS, this tool helps you transition or manage stylesheets with SCSS. An online tool by WebWizKit.',
  keywords: ['CSS to SCSS', 'CSS Converter', 'SCSS', 'SASS', 'CSS Preprocessor', 'Stylesheet Converter', 'Online Tool', 'WebWizKit']
};

"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CssToScss: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    setOutput(input); // CSS is valid SCSS
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS to SCSS</h1>
      <p>Paste your CSS to convert it to SCSS (CSS is valid SCSS).</p>
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
              <label htmlFor="scss-output" className={styles.label}>SCSS Output</label>
              <textarea
                id="scss-output"
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
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
    </div>
  );
};

export default CssToScss;

