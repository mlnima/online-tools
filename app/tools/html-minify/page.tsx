import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTML Minify | HTML Minifier | WebWizKit',
  description: 'Minify your HTML code to reduce file size and improve website performance. An online HTML minifier tool by WebWizKit.',
  keywords: ['HTML Minify', 'HTML Minifier', 'Compress HTML', 'Optimize HTML', 'Online Tool', 'WebWizKit', 'Frontend']
};

"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function minifyHTML(input: string): string {
  // Remove comments
  let output = input.replace(/<!--([\s\S]*?)-->/g, "");
  // Remove whitespace between tags
  output = output.replace(/>\s+</g, "><");
  // Remove leading/trailing whitespace
  output = output.trim();
  // Collapse multiple spaces
  output = output.replace(/\s{2,}/g, " ");
  return output;
}

export default function HtmlMinify() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleMinify() {
    setError("");
    try {
      setOutput(minifyHTML(input));
    } catch (e) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  }
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage}> {/* Added toolPage class */}
      <h1>HTML Minify</h1>
      <div className={styles.formRow}> {/* Changed from responsiveRow */}
        <div className={styles.inputColumn}>
          <label htmlFor="html-input-minify" className={styles.label}>HTML Input</label>
          <textarea
            id="html-input-minify"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            rows={5}
            placeholder="Paste HTML here..."
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="html-output-minify" className={styles.label}>Minified Output</label>
          <textarea
            id="html-output-minify"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={5}
            placeholder="Minified output"
          />
        </div>
      </div>
      <div className={styles.buttonRow}> {/* Changed div to buttonRow */}
        <button onClick={handleMinify} className={styles.actionButton}>Minify</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy Output</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>} {/* Removed inline style */}
    </div>
  );
}
