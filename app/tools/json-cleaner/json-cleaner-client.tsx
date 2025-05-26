"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const cleanJson = (input: string): string => {
  // Remove comments (// and /* */)
  let cleaned = input.replace(/\/\*.*?\*\//gs, "").replace(/\/\/.*$/gm, "");
  // Remove trailing commas
  cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");
  // Attempt to remove extra commas between elements in an array or properties in an object
  // This is a bit more aggressive and might need refinement for complex cases.
  // Example: [1,,2] -> [1,2] or {"a":1,, "b":2} -> {"a":1, "b":2}
  cleaned = cleaned.replace(/,(?=\s*,)/g, ""); // Remove comma if followed by another comma (with optional whitespace)
  // Remove leading commas in arrays/objects if they are the first non-whitespace char after [ or {
  cleaned = cleaned.replace(/([\[{]\s*),+/g, "$1");


  // Remove whitespace from the beginning and end of the string
  cleaned = cleaned.trim();

  // Specific cases that might break JSON.parse if not handled carefully or if regex is too broad
  // For example, ensure it doesn't break strings with commas or comment-like sequences.
  // The current regexes are generally safe for typical JSON structures.

  return cleaned;
};

const JsonCleanerClient = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClean = () => {
    setError(null); // Clear previous errors
    if (!input.trim()) {
      setError("Input JSON cannot be empty.");
      setOutput("");
      return;
    }
    try {
      const cleaned = cleanJson(input);
      // Validate if it's parseable before setting output
      const obj = JSON.parse(cleaned); 
      setOutput(JSON.stringify(obj, null, 2));
    } catch (e: any) {
      // Provide a more specific error if cleaning results in invalid JSON
      setError(`Error parsing cleaned JSON: ${e.message}. Please check for structural issues like mismatched brackets/braces or invalid values after cleaning.`);
      setOutput(""); // Clear output on error
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON Cleaner</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className={styles.inputArea}
            placeholder="Paste your JSON here (with comments, trailing commas, etc.)..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="cleaned-json-output" className={styles.label}>Cleaned JSON:</label>
              <textarea 
                id="cleaned-json-output" 
                value={output} 
                readOnly 
                rows={10}
                className={styles.outputArea}
                placeholder="Cleaned and formatted JSON output..."
              />
            </>
          )}
          {/* Display error in output column if no output, for better visibility */}
          {error && !output && (
             <div className={styles.error} style={{whiteSpace: 'pre-wrap'}}>{error}</div>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleClean} className={styles.actionButton}>Clean JSON</button>
      </div>
      {/* Display error below button if it's a general error or if output is also present */}
      {error && output && <div className={styles.error} style={{whiteSpace: 'pre-wrap', marginTop: '1rem'}}>{error}</div>}
    </div>
  );
};

export default JsonCleanerClient;
