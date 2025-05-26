"use client";
import React, { useState, useMemo } from "react"; // Added useMemo
import styles from "../../styles/UnifiedToolPage.module.scss";

const JsonEditorClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    setError(null);
    setFormatted(""); // Clear previous formatted output
    if (!input.trim()) {
        setError("Input JSON cannot be empty.");
        return;
    }
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      // setFormatted(""); // Already cleared
    }
  };

  const handleCopy = () => {
    if (formatted) {
      navigator.clipboard.writeText(formatted)
        .catch(err => {
          console.error("Failed to copy text: ", err);
          setError("Failed to copy text to clipboard.");
        });
    }
  };

  // Use useMemo to avoid re-calculating on every render, only when input changes
  const isValid = useMemo(() => {
    if (!input.trim()) return false; // Consider empty or whitespace-only as invalid for formatting
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  }, [input]);

  const validationMessage = useMemo(() => {
    if (!input.trim() && !error) return ""; // No message if input is empty and no explicit error
    if (error && error.startsWith("Invalid JSON")) return "Invalid JSON"; // Show generic if specific parse error
    if (isValid) return "Valid JSON";
    return "Invalid JSON"; // Default to invalid if not explicitly valid
  }, [input, isValid, error]);


  return (
    <div className={styles.toolPage}>
      <h1>JSON Editor</h1>
      <p>Edit and validate JSON. Pretty-print and copy!</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input-editor" className={styles.label}>JSON Input/Editor</label>
          <textarea
            id="json-input-editor"
            value={input}
            onChange={e => {
              setInput(e.target.value);
              setError(null); // Clear error on input change
              setFormatted(""); // Clear formatted output on input change
            }}
            rows={10}
            className={styles.inputArea}
            placeholder="Paste or write your JSON here..."
          />
          {input.trim() && ( // Only show validation message if input is not empty
            <span className={isValid ? styles.successText : styles.error} style={{ marginTop: '0.5rem', display: 'inline-block' }}>
              {validationMessage}
            </span>
          )}
        </div>
        <div className={styles.outputColumn}>
          {formatted && (
            <>
              <label htmlFor="formatted-json-output" className={styles.label}>Formatted JSON:</label>
              <textarea
                id="formatted-json-output"
                value={formatted}
                readOnly
                rows={10}
                className={styles.outputArea}
                placeholder="Formatted JSON will appear here..."
              />
            </>
          )}
          {/* Show general error here if no formatted output */}
          {error && !formatted && (
            <div className={styles.error} style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{error}</div>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button 
          onClick={handleFormat} 
          className={styles.actionButton} 
          disabled={!isValid || !input.trim()} // Also disable if input is just whitespace
        >
          Pretty Print
        </button>
        {formatted && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {/* Show error related to copy action or if there's formatted output but still an error (less likely) */}
      {error && formatted && <div className={styles.error} style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{error}</div>}
    </div>
  );
};

export default JsonEditorClient;
