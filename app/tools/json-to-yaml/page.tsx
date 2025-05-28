"use client";
import React, {useState} from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function jsonToYaml(obj: any, indent = 0): string {
    if (typeof obj !== "object" || obj === null) return JSON.stringify(obj);
    if (Array.isArray(obj)) {
        return obj.map(v => `${"  ".repeat(indent)}- ${jsonToYaml(v, indent + 1)}`).join("\n");
    }
    return Object.entries(obj)
        .map(([k, v]) => {
            if (typeof v === "object" && v !== null)
                return `${"  ".repeat(indent)}${k}:\n${jsonToYaml(v, indent + 1)}`;
            return `${"  ".repeat(indent)}${k}: ${jsonToYaml(v, 0)}`;
        })
        .join("\n");
}

const JsonToYaml: React.FC = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const handleConvert = () => {
        setError("");
        try {
            const obj = JSON.parse(input);
            setOutput(jsonToYaml(obj));
        } catch {
            setError("Invalid JSON");
            setOutput("");
        }
    };

    const handleCopy = () => {
        if (output) navigator.clipboard.writeText(output);
    };

    return (
        <div className={styles.toolPage}>
            <h1>JSON to YAML</h1>
            <div className={styles.formRow}>
                <div className={styles.outputColumn}>
                    <p>Convert JSON to YAML format (basic, no anchors/refs).</p>
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        rows={10}
                        className={styles.inputArea}
                        placeholder="Paste your JSON here..."
                    />
                </div>
                <div className={styles.outputColumn}>
                    <h3>YAML Output:</h3>
                    <textarea
                        value={output || ''}
                        readOnly
                        rows={10}
                        className={styles.outputArea}
                    />
                </div>
                {error && <div style={{color: "red", marginTop: 16}}>{error}</div>}
            </div>
            <div className={styles.buttonRow}>
                <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
                <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
            </div>
        </div>
    );
};

export default JsonToYaml;
