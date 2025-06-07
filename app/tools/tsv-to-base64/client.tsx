"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function TsvToBase64Client() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    function handleConvert() {
        setError("");
        if (!input.trim()) {
            setOutput("");
            return;
        }
        try {
            const encoded = btoa(unescape(encodeURIComponent(input)));
            setOutput(encoded);
        } catch (e) {
            setError("Invalid input. Could not convert to Base64.");
            setOutput("");
        }
    }

    function handleCopy() {
        if (output) {
            navigator.clipboard.writeText(output);
            setIsCopied(true);
        }
    }

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    useEffect(() => {
        if (input === "") {
            setOutput("");
            setError("");
        }
    }, [input]);

    return (
        <>
            <h1>TSV to Base64 Converter</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
          <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
              placeholder="Paste your TSV data here..."
              className={styles.inputArea}
          />
                </div>
                <div className={styles.inputColumn}>
          <textarea
              value={output}
              readOnly
              rows={10}
              placeholder="Base64 output will appear here..."
              className={styles.outputArea}
          />
                </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.buttonRow}>
                <button onClick={handleConvert} className={styles.actionButton}>Convert to Base64</button>
                <button onClick={handleCopy} disabled={!output} className={styles.actionButton}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </>
    );
}