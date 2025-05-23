"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CssToLess: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    setOutput(input); // CSS is valid LESS
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage} >
      <h1>CSS to LESS</h1>
      <p>Paste your CSS to convert it to LESS (CSS is valid LESS).</p>
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
                        <label htmlFor="less-output" className={styles.label}>LESS Output</label>
                        <textarea
                            id="less-output"
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

export default CssToLess;

