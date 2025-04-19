"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

const beautifyCss = (css: string): string => {
  // Simple CSS beautification: add indentation and line breaks
  try {
    let formatted = css
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/\n\s*\n/g, '\n');
    // Remove trailing whitespace and extra indentation
    formatted = formatted.replace(/\n\s+}/g, '\n}');
    return formatted.trim();
  } catch {
    throw new Error("Invalid CSS input or formatting error.");
  }
};

const CssBeautifier: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleBeautify = () => {
    setError(null);
    try {
      setOutput(beautifyCss(input));
    } catch (e: any) {
      setError(e.message || "Formatting error.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>CSS Beautifier</h1>
      <p>Format and beautify your CSS code.</p>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your CSS here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleBeautify} className={styles.actionButton}>Beautify</button>
      </div>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Beautified CSS:</h3>
          <textarea
            value={output}
            readOnly
            rows={10}
            style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
          />
          <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default CssBeautifier;

