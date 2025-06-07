"use client";

import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function XmlEscapeUnescapeClient() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    function handleEscape() {
        setError("");
        if (!input.trim()) {
            setOutput("");
            return;
        }
        try {
            const escaped = input
                .replace(/&/g, "&")
                .replace(/</g, "<")
                .replace(/>/g, ">")
                .replace(/"/g, "\"")
                .replace(/'/g, "'");
            setOutput(escaped);
        } catch (e) {
            setError("An error occurred during escaping.");
            setOutput("");
        }
    }

    function handleUnescape() {
        setError("");
        if (!input.trim()) {
            setOutput("");
            return;
        }
        try {
            const unescaped = input
                .replace(/'/g, "'")
                .replace(/"/g, '"')
                .replace(/>/g, ">")
                .replace(/</g, "<")
                .replace(/&/g, "&");
            setOutput(unescaped);
        } catch (e) {
            setError("An error occurred during unescaping. Check for invalid entities.");
            setOutput("");
        }
    }

    return (
        <>
            <h1>XML Escape / Unescape</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
          <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
              placeholder="Paste text or XML here..."
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
                <button onClick={handleEscape} className={styles.actionButton}>Escape</button>
                <button onClick={handleUnescape} className={styles.actionButton}>Unescape</button>
            </div>
        </>
    );
}