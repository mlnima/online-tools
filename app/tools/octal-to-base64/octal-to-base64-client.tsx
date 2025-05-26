"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const octalToBase64 = (octalInput: string): string => {
  const trimmedInput = octalInput.trim();
  if (!trimmedInput) {
    throw new Error("Input cannot be empty.");
  }
  const parts = trimmedInput.split(/\s+/);
  const byteValues = parts.map(part => {
    if (!/^[0-7]+$/.test(part)) {
      throw new Error(`Invalid octal character in '${part}'. Only digits 0-7 allowed.`);
    }
    const val = parseInt(part, 8);
    if (isNaN(val)) {
      throw new Error(`'${part}' is not a valid octal number.`);
    }
    if (val < 0 || val > 0o377) { // Use 0o for octal literal
      throw new Error(`Octal value '${part}' (decimal ${val}) is out of byte range (0-255).`);
    }
    return val;
  });
  const byteString = String.fromCharCode(...byteValues);
  try {
    return btoa(byteString);
  } catch (e: any) {
    // btoa can throw an error if characters are outside Latin1 range after fromCharCode
    // This can happen if an octal value > 0o377 (255) was somehow not caught,
    // or if fromCharCode produces characters that btoa cannot handle.
    console.error("btoa encoding error:", e);
    throw new Error("Failed to encode to Base64. Ensure input represents valid byte values.");
  }
};

const OctalToBase64Client: React.FC = () => {
  const [octal, setOctal] = useState("");
  const [base64, setBase64] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    setBase64("");
    if (!octal.trim()) {
        // Optionally set an error if input is empty, or just return
        // setError("Input cannot be empty.");
        return;
    }
    try {
      setBase64(octalToBase64(octal));
    } catch (e: any) {
      setError(e.message || "An unknown error occurred during conversion.");
    }
  };

  const handleCopy = () => {
    if (base64) {
      navigator.clipboard.writeText(base64)
        .catch(err => {
          console.error("Failed to copy text: ", err);
          setError("Failed to copy text to clipboard.");
        });
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>Octal to Base64</h1>
      <p>Convert octal string (space-separated) to Base64 encoding.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="octal-input" className={styles.label}>Octal Input</label>
          <textarea
            id="octal-input"
            rows={4}
            className={styles.inputArea}
            placeholder="e.g. 141 142 143"
            value={octal}
            onChange={e => {
              setOctal(e.target.value);
              setError(null); // Clear error on input change
              setBase64(""); // Clear output on input change
            }}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output</label>
          <textarea
            id="base64-output"
            rows={4}
            className={styles.outputArea}
            value={base64}
            readOnly
            placeholder="Base64 output..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button 
          onClick={handleConvert} 
          className={styles.actionButton}
          disabled={!octal.trim()} // Disable if input is empty or only whitespace
        >
          Convert
        </button>
        {base64 && (
          <button 
            onClick={handleCopy} 
            className={styles.actionButton} 
            disabled={!base64} // Should always be true if button is visible
          >
            Copy
          </button>
        )}
      </div>
      {error && <div className={styles.error} style={{whiteSpace: 'pre-wrap'}}>{error}</div>}
    </div>
  );
};

export default OctalToBase64Client;
