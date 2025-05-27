"use client";
import React, {useState} from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function YAMLToBase64() {
    const [yaml, setYaml] = useState("");
    const [base64, setBase64] = useState("");

    function handleConvert() {
        try {
            const encoded = btoa(unescape(encodeURIComponent(yaml)));
            setBase64(encoded);
        } catch (e) {
            setBase64("Invalid YAML input");
        }
    }

    function handleCopy() {
        if (base64) navigator.clipboard.writeText(base64);
    }

    return (
        <div className={styles.toolPage}>
            <h1>YAML to Base64</h1>
            <div className={styles.formRow}>
                <div className={styles.inputColumn}>
                    <label>Encode YAML text to Base64 (UTF-8 encoded).</label>
                    <textarea
                        rows={4}
                        className={styles.inputArea}
                        placeholder="Paste YAML text..."
                        value={yaml}
                        onChange={e => setYaml(e.target.value)}
                    />
                </div>
                <div className={styles.inputColumn}>
                    <label>Base64 Output:</label>
                    <textarea
                        rows={3}
                        className={styles.outputArea}
                        value={base64}
                        readOnly
                    />
                </div>
            </div>
            <div className={styles.buttonRow}>
                <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
                <button onClick={handleCopy} disabled={!base64} className={styles.actionButton}>Copy</button>
            </div>
        </div>
    );
}

