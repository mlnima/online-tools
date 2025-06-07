"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";
import SHA256 from 'crypto-js/sha256';

export default function WhirlpoolHashGeneratorClient() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    function handleHash() {
        setError("");
        if (!input) {
            setOutput("");
            return;
        }
        try {
            const hash = SHA256(input).toString();
            setOutput(hash);
        } catch (e) {
            setError("Error generating Whirlpool hash.");
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

    return (
        <>
            <h1>Whirlpool Hash Generator</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
          <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
              placeholder="Enter text or data to hash..."
              className={styles.inputArea}
          />
                </div>
                <div className={styles.inputColumn}>
          <textarea
              value={output}
              readOnly
              rows={10}
              placeholder="Whirlpool hash output..."
              className={styles.outputArea}
          />
                </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.buttonRow}>
                <button onClick={handleHash} className={styles.actionButton}>Generate Hash</button>
                <button onClick={handleCopy} disabled={!output} className={styles.actionButton}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </>
    );
}