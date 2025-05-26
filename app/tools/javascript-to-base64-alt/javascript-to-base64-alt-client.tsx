"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const encodeBase64 = (str: string): string => {
  try {
    // For UTF-8 characters, btoa can fail. This handles it.
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    console.error("Base64 encoding error:", e);
    return ""; // Return empty string or throw error as appropriate
  }
};

const JavascriptToBase64AltClient = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  const handleConvert = () => {
    setError("");
    if (!input.trim()) {
      setError("Input cannot be empty.");
      setOutput("");
      return;
    }
    try {
      const encoded = encodeBase64(input);
      if (encoded === "") { 
        // Check if encoding returned empty, which might indicate an issue handled in encodeBase64
        throw new Error("Encoding failed, possibly due to invalid characters.");
      }
      setOutput(encoded);
    } catch (e) {
      setError((e as Error).message || "An unexpected error occurred during encoding.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output)
        .catch(err => {
          console.error("Failed to copy text: ", err);
          setError("Failed to copy text to clipboard.");
        });
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>Javascript to Base64 (Alt)</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        className={`${styles.inputArea} ${styles.jsBase64Textarea}`}
        rows={6}
        placeholder="Paste your JavaScript code here"
      />
      <button 
        onClick={handleConvert} 
        className={`${styles.actionButton} ${styles.jsBase64ConvertButton}`}
      >
        Convert
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        className={`${styles.outputArea} ${styles.jsBase64Textarea}`}
        rows={4}
        placeholder="Base64 output will appear here"
      />
      {output && (
        <button 
          onClick={handleCopy} 
          className={`${styles.actionButton} ${styles.jsBase64CopyButton}`}
        >
          Copy
        </button>
      )}
    </div>
  );
};

export default JavascriptToBase64AltClient;
