"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";
import {unshortenUrl} from "../../lib/actions/unshortenUrl";

export default function UrlUnshortenerClient() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    async function handleUnshorten() {
        if (!input.trim()) return;

        setError("");
        setOutput("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('url', input);

            const data = await unshortenUrl(formData);

            if (data.error) {
                // throw new Error(data.error);
            }

            if (data?.longUrl){
                setOutput(data.longUrl);
            }


        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
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
            <h1>URL Unshortener</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
          <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
              placeholder="Paste a short URL here (e.g., https://bit.ly/3z1YqYq)..."
              className={styles.inputArea}
          />
                </div>
                <div className={styles.inputColumn}>
          <textarea
              value={output}
              readOnly
              rows={10}
              placeholder="The full, expanded URL will appear here..."
              className={styles.outputArea}
          />
                </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.buttonRow}>
                <button onClick={handleUnshorten} className={styles.actionButton} disabled={loading || !input}>
                    {loading ? 'Expanding...' : 'Expand URL'}
                </button>
                <button onClick={handleCopy} disabled={!output} className={styles.actionButton}>
                    {isCopied ? 'Copied!' : 'Copy Result'}
                </button>
            </div>
        </>
    );
}