"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function StylusToCssClient() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    function stylusToCss(stylus: string): string {
        let lines = stylus.split(/\r?\n/);
        let result = [];
        let indentStack: number[] = [0];

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            const currentIndent = line.match(/^\s*/)?.[0].length || 0;
            let lastIndent = indentStack[indentStack.length - 1];

            while (currentIndent < lastIndent) {
                result.push(' '.repeat(indentStack.pop() ?? 0) + '}');
                lastIndent = indentStack[indentStack.length - 1];
            }

            if (currentIndent > lastIndent) {
                const selector = lines[result.length - 1] || '';
                // @ts-expect-error: it's fine
                const previousLine = result.pop() || '';
                result.push(previousLine.replace(/;$/, ' {'));
                indentStack.push(currentIndent);
            }

            if (trimmed.includes(':')) {
                result.push(' '.repeat(currentIndent) + `  ${trimmed};`);
            } else {
                result.push(' '.repeat(currentIndent) + trimmed);
            }
        }

        while (indentStack.length > 1) {
            result.push(' '.repeat(indentStack.pop() ?? 0) + '}');
        }

        return result.join('\n').replace(/}\n\s*\}/g, '}\n}').replace(/\{\n\s*(\S)/g, '{\n  $1').replace(/;\n\s*}/g, ';\n}');
    }

    function handleConvert() {
        setError("");
        if (!input.trim()) {
            setOutput("");
            return;
        }
        try {
            setOutput(stylusToCss(input));
        } catch (e) {
            setError("Error converting Stylus to CSS.");
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
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <>
            <h1>Stylus to CSS Converter</h1>
            <p>A basic tool to convert simple, indentation-based Stylus syntax into standard CSS.</p>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
          <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
              placeholder="Paste your Stylus code here..."
              className={styles.inputArea}
          />
                </div>
                <div className={styles.inputColumn}>
          <textarea
              value={output}
              readOnly
              rows={10}
              placeholder="CSS output will appear here..."
              className={styles.outputArea}
          />
                </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.buttonRow}>
                <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
                <button onClick={handleCopy} disabled={!output} className={styles.actionButton}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </>
    );
}