"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Utf8ToAsciiClient() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    function utf8ToAscii(str: string): string {
        try {
            return Array.from(str).map(c => c.charCodeAt(0) < 128 ? c : '?').join("");
        } catch {
            return "Invalid UTF-8 input";
        }
    }

    function handleConvert() {
        setOutput(utf8ToAscii(input));
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
        }
    }, [input]);

    return (
        <>
            <h1>UTF-8 to ASCII Converter</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
          <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
              placeholder="Paste your UTF-8 string here..."
              className={styles.inputArea}
          />
                </div>
                <div className={styles.inputColumn}>
          <textarea
              value={output}
              readOnly
              rows={10}
              placeholder="ASCII output will appear here..."
              className={styles.outputArea}
          />
                </div>
            </div>
            <div className={styles.buttonRow}>
                <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
                <button onClick={handleCopy} disabled={!output} className={styles.actionButton}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </>
    );
}