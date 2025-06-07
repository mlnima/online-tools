"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function UrlEncoderDecoderClient() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    function handleEncode() {
        setError("");
        if (!input) {
            setOutput("");
            return;
        }
        try {
            setOutput(encodeURI(input));
        } catch (e) {
            setError("Error encoding the input string.");
            setOutput("");
        }
    }

    function handleDecode() {
        setError("");
        if (!input) {
            setOutput("");
            return;
        }
        try {
            setOutput(decodeURI(input));
        } catch (e) {
            setError("Error decoding the input. The string may be malformed.");
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
            <h1>URL Encoder / Decoder</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
          <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
              placeholder="Paste string or URL here to encode or decode..."
              className={styles.inputArea}
          />
                </div>
                <div className={styles.inputColumn}>
          <textarea
              value={output}
              readOnly
              rows={10}
              placeholder="Result will appear here..."
              className={styles.outputArea}
          />
                </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.buttonRow}>
                <button onClick={handleEncode} className={styles.actionButton}>Encode</button>
                <button onClick={handleDecode} className={styles.actionButton}>Decode</button>
                <button onClick={handleCopy} disabled={!output} className={styles.actionButton}>
                    {isCopied ? 'Copied!' : 'Copy Result'}
                </button>
            </div>
        </>
    );
}