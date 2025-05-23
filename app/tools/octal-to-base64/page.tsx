import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Octal to Base64 Converter | WebWizKit',
  description: 'Convert octal strings (space-separated) to Base64 encoding. An online number system and encoding tool by WebWizKit.',
  keywords: ['Octal to Base64', 'Octal Converter', 'Base64 Encode', 'Number System', 'Encoding', 'Online Tool', 'WebWizKit']
};

"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss"; // Added import

function octalToBase64(octalInput: string): string {
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
    if (val < 0 || val > 0377) { 
      throw new Error(`Octal value '${part}' (decimal ${val}) is out of byte range (0-255).`);
    }
    return val;
  });
  const byteString = String.fromCharCode(...byteValues);
  return btoa(byteString);
}

export default function OctalToBase64() {
  const [octal, setOctal] = useState("");
  const [base64, setBase64] = useState("");
  const [error, setError] = useState<string | null>(null); // Added error state

  function handleConvert() {
    setError(null); // Clear previous error
    setBase64("");   // Clear previous output
    try {
      setBase64(octalToBase64(octal));
    } catch (e) {
      setError((e as Error).message || "An unknown error occurred.");
    }
  }

  function handleCopy() {
    if (base64) { // Removed check for "Invalid octal input"
      navigator.clipboard.writeText(base64);
    }
  }

  return (
    <div className={styles.toolPage}>
      <h1>Octal to Base64</h1>
      <p>Convert octal string (space-separated) to Base64 encoding.</p> {/* Updated placeholder description */}
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="octal-input" className={styles.label}>Octal Input</label>
          <textarea
            id="octal-input"
            rows={4}
            className={styles.inputArea}
            placeholder="e.g. 141 142 143" // Updated placeholder
            value={octal}
            onChange={e => setOctal(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output</label>
          <textarea
            id="base64-output"
            rows={4} // Matched input rows
            className={styles.outputArea}
            value={base64}
            readOnly
            placeholder="Base64 output..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {base64 && (
          <button onClick={handleCopy} className={styles.actionButton} disabled={!base64}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

