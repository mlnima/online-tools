import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Escape | Escape HTML Characters | WebWizKit',
  description: "Escape special HTML characters (like <, >, &, \", ') to their corresponding entities. Secure your HTML content. An online tool by WebWizKit.",
  keywords: ['HTML Escape', 'Escape HTML', 'HTML Entities', 'Security', 'Sanitize HTML', 'Online Tool', 'WebWizKit', 'Developer Tools']
};

"use client";
import React, { useState } from "react"; // Consolidated useState import
import styles from "../../styles/UnifiedToolPage.module.scss"; // Added styles import

function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}

export default function HtmlEscape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null); // Added error state

  const handleEscape = () => {
    setError(null); // Clear previous error
    try {
      setOutput(escapeHtml(input));
    } catch (e) {
      setError("Error during HTML escaping.");
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
      <h1>HTML Escape</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="html-escape-input" className={styles.label}>Input Text</label>
          <textarea
            id="html-escape-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            className={styles.inputArea}
            placeholder="Enter text to escape..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="html-escape-output" className={styles.label}>Escaped HTML:</label>
              <textarea 
                id="html-escape-output"
                value={output} 
                readOnly 
                rows={4} // Matched input rows
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleEscape} className={styles.actionButton}>Escape</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy Output</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>} {/* Added error display */}
    </div>
  );
}

