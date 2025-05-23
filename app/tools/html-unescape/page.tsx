import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Unescape | Unescape HTML Entities | WebWizKit',
  description: 'Unescape HTML entities to their original characters. Paste your escaped text to get the plain HTML version. An online tool by WebWizKit.',
  keywords: ['HTML Unescape', 'Unescape HTML', 'HTML Entities', 'Decode HTML', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

"use client";
import React, { useState } from "react"; // Consolidated useState import
import styles from "../../styles/UnifiedToolPage.module.scss"; 

function unescapeHtml(input: string): string { // Changed function signature
  try {
    const txt = document.createElement("textarea");
    txt.innerHTML = input;
    return txt.value;
  } catch (e) {
    console.error("Error in unescapeHtml:", e);
    return input; 
  }
}

export default function HtmlUnescape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null); // Added error state

  const handleUnescape = () => {
    setError(null); // Clear previous error
    try {
      setOutput(unescapeHtml(input));
    } catch (e) {
      setError("Error during HTML unescaping.");
      setOutput("");
    }
  };

  // Added handleCopy function
  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>HTML Unescape</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="html-unescape-input" className={styles.label}>Input Text</label>
          <textarea
            id="html-unescape-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            className={styles.inputArea}
            placeholder="Enter HTML to unescape..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="html-unescape-output" className={styles.label}>Unescaped Result:</label>
              <textarea 
                id="html-unescape-output"
                value={output} 
                readOnly 
                rows={4} /* Matched input rows */
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleUnescape} className={styles.actionButton}>Unescape</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy Output</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>} {/* Added error display */}
    </div>
  );
}

