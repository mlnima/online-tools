"use client";

import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function XmlFormatterClient() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    function formatXml(xml: string) {
        let formatted = '';
        const reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\n$2$3');
        let pad = 0;
        xml.split('\n').forEach((node) => {
            let indent = 0;
            if (node.match(/.+<\/.+>$/)) {
                indent = 0;
            } else if (node.match(/^<\//)) {
                if (pad !== 0) pad -= 2;
            } else if (node.match(/^<([^!?]+)>$/)) {
                indent = 2;
            } else {
                indent = 0;
            }
            formatted += ' '.repeat(pad) + node + '\n';
            pad += indent;
        });
        return formatted.trim();
    }

    function handleFormat() {
        setError("");
        if (!input.trim()) {
            setOutput("");
            return;
        }
        try {
            const formatted = formatXml(input);
            setOutput(formatted);
        } catch (e) {
            setError("Invalid XML. Please check your input.");
            setOutput("");
        }
    }

    return (
        <>
            <h1>XML Formatter</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
                      <textarea
                          value={input}
                          onChange={e => setInput(e.target.value)}
                          rows={10}
                          placeholder="Paste your XML code here..."
                          className={styles.inputArea}
                      />
                </div>
                <div className={styles.inputColumn}>
                    <textarea
                        value={output}
                        readOnly
                        rows={10}
                        placeholder="Formatted XML will appear here..."
                        className={styles.outputArea}
                    />
                </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.buttonRow}>
                <button onClick={handleFormat} className={styles.actionButton}>Format XML</button>
            </div>
        </>
    );
}