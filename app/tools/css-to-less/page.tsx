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
                      <textarea
                          value={input}
                          onChange={e => setInput(e.target.value)}
                          rows={10}
                          placeholder="Paste your CSS here..."
                      />
            </div>
            {output && (
                <div className={styles.inputColumn}>
                    <h3>LESS Output:</h3>
                    <textarea
                        value={output}
                        readOnly
                        rows={10}

                    />
                    <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
                </div>
            )}


        </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      </div>

    </div>
  );
};

export default CssToLess;

