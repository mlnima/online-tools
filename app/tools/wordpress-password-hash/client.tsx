"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";
import md5 from 'crypto-js/md5';

import Latin1 from 'crypto-js/enc-latin1';

export default function WordpressPasswordHashClient() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    function generateWordPressHash(password: string): string {
        const itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const countLog2 = 8;

        function getRandomBytes(count: number): string {
            let result = '';
            for (let i = 0; i < count; i++) {
                result += itoa64.charAt(Math.floor(Math.random() * 64));
            }
            return result;
        }

        function encode64(input: any, count: number): string {
            let output = '';
            let i = 0;
            const words = input.words;

            do {
                let value = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                output += itoa64.charAt(value & 0x3f);
                if (++i >= count) break;

                value |= ((words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff) << 8;
                output += itoa64.charAt((value >> 6) & 0x3f);
                if (++i >= count) break;

                value |= ((words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff) << 16;
                output += itoa64.charAt((value >> 12) & 0x3f);
                if (++i >= count) break;

                output += itoa64.charAt((value >> 18) & 0x3f);
            } while (++i < count);

            return output;
        }

        const salt = getRandomBytes(8);
        const passwordBytes = Latin1.parse(password);
        let hash = md5(Latin1.parse(salt).concat(passwordBytes));

        for (let i = 0; i < (1 << countLog2); i++) {
            hash = md5(hash.concat(passwordBytes));
        }

        const prefix = '$P$';
        const outputHash = encode64(hash, 16);
        return prefix + itoa64.charAt(countLog2) + salt + outputHash;
    }

    async function handleHash() {
        setError("");
        if (!input) {
            setOutput("");
            return;
        }
        try {
            await new Promise(resolve => setTimeout(resolve, 10));
            const hashedPassword = generateWordPressHash(input);
            setOutput(hashedPassword);
        } catch (e) {
            setError("Error hashing password.");
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
            <h1>WordPress Password Hash Generator</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
          <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={10}
              placeholder="Enter password to hash..."
              className={styles.inputArea}
          />
                </div>
                <div className={styles.inputColumn}>
          <textarea
              value={output}
              readOnly
              rows={10}
              placeholder="WordPress (PHPass) hash output..."
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