"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const JsonEscapeUnescapeClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEscape = () => {
    setError(null);
    setOutput("");
    if (!input) {
      // setError("Input cannot be empty for escaping."); // Optional: error for empty input
      return;
    }
    try {
      // JSON.stringify will quote the string and escape necessary characters.
      // We then slice off the outer quotes it adds.
      setOutput(JSON.stringify(input).slice(1, -1));
    } catch (e: any) {
      console.error("Escape error:", e);
      setError("Failed to escape the input string. Error: " + e.message);
    }
  };

  const handleUnescape = () => {
    setError(null);
    setOutput("");
    if (!input) {
      // setError("Input cannot be empty for unescaping."); // Optional: error for empty input
      return;
    }
    try {
      // To correctly parse a string that was part of a JSON, it needs to be wrapped in quotes.
      // The input is expected to be the content of a JSON string, so we add quotes.
      // Example: if input is "hello\\nworld", we parse "\"hello\\nworld\""
      setOutput(JSON.parse(`"${input}"`));
    } catch (e: any) {
      console.error("Unescape error:", e);
      setError("Failed to unescape the input string. It might not be a valid JSON escaped string. Error: " + e.message);
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
      <h1>JSON Escape/Unescape</h1>
      <p>Escape or unescape text for JSON string usage.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-escape-input" className={styles.label}>Input Text</label>
          <textarea
            id="json-escape-input"
            value={input}
            onChange={e => {
              setInput(e.target.value);
              setError(null); // Clear error on input change
              setOutput(""); // Clear output on input change
            }}
            rows={6}
            className={styles.inputArea}
            placeholder="Enter text to escape/unescape..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="json-escape-output" className={styles.label}>Result:</label>
              <textarea
                id="json-escape-output"
                value={output}
                readOnly
                rows={6}
                className={styles.outputArea}
                placeholder="Result will appear here..."
              />
            </>
          )}
          {/* Display error in output column if no output */}
          {error && !output && (
             <div className={styles.error} style={{whiteSpace: 'pre-wrap'}}>{error}</div>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleEscape} className={styles.actionButton} disabled={!input.trim()}>Escape</button>
        <button onClick={handleUnescape} className={styles.actionButton} disabled={!input.trim()}>Unescape</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {/* Display error below buttons if it's a general error or if output is also present */}
      {error && output && <div className={styles.error} style={{whiteSpace: 'pre-wrap', marginTop: '1rem'}}>{error}</div>}
    </div>
  );
};

export default JsonEscapeUnescapeClient;
