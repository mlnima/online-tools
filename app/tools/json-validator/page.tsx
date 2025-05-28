"use client";
import React, {useState} from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonValidator() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    function handleValidate() {
        setError(null);
        try {
            JSON.parse(input);
            setResult("Valid JSON");
        } catch (e: any) {
            setResult(null);
            setError("Invalid JSON: " + e.message);
        }
    }

    return (
        <div className={styles.toolPage}>
            <h1>JSON Validator</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
              <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={10}
                  className={styles.inputArea}
                  placeholder="Paste your JSON here..."
              />
                </div>
                <div className={styles.inputColumn}>
              <textarea
                  value={result ? result : error || ''}
                  readOnly
                  rows={10}
                  className={styles.outputArea}
                  placeholder="Validation result..."
                  style={{color: result === 'Valid JSON' ? 'green' : 'red'}}
              />
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', margin: '24px 0 0 0'}}>
                <button onClick={handleValidate} className={styles.actionButton}
                        style={{minWidth: 140, fontSize: 17}}>Validate
                </button>
            </div>
        </div>
    );
}

