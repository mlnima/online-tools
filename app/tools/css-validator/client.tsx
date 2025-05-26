"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CssValidatorClient: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async () => {
    if (!input.trim()) {
      setResult("CSS input is empty.");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const formData = new URLSearchParams();
      formData.append('text', input);
      formData.append('output', 'json');

      const response = await fetch("https://jigsaw.w3.org/css-validator/validator", {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let detail = errorText;
        try {
            const errorJson = JSON.parse(errorText);
            if (errorJson && errorJson.error) {
                detail = errorJson.error.message || errorText;
            }
        } catch(e) { /* ignore if errorText is not JSON */ }
        throw new Error(`Validation service error: ${response.status} ${response.statusText}. Detail: ${detail}`);
      }

      const data = await response.json();

      if (data.cssvalidation.validity) {
        setResult("Valid CSS");
      } else {
        const errors = data.cssvalidation.errors;
        const warnings = data.cssvalidation.warnings;

        let formattedMessages = "Invalid CSS:\n"; 
        if (errors && errors.length > 0) {
          formattedMessages += errors.map((err: any) => `- Error: ${err.message} (line ${err.line})`).join("\n");
        }
        if (warnings && warnings.length > 0) {
          if (errors && errors.length > 0) formattedMessages += "\n\n";
          formattedMessages += "Warnings:\n" + warnings.map((warn: any) => `- Warning: ${warn.message} (line ${warn.line})`).join("\n");
        }
        
        if ((!errors || errors.length === 0) && (!warnings || warnings.length === 0)) {
            setResult("Invalid CSS (No specific errors or warnings provided by validator).");
        } else {
            setResult(formattedMessages);
        }
      }
    } catch (e: any) { 
      setResult((e as Error).message || "An unexpected error occurred during validation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Validator</h1>
      <p>Validate your CSS using the W3C CSS Validation Service.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="css-input-validator" className={styles.label}>CSS Input</label>
          <textarea
            id="css-input-validator"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className={styles.inputArea}
            placeholder="Paste your CSS here..."
            disabled={loading}
          />
        </div>
        <div className={styles.outputColumn}>
          {(result || loading) && (
            <>
              <label className={styles.label}>Validation Result:</label>
              {loading && <p>Validating...</p>}
              {result && (
                <pre className={`${styles.codeBlock} ${result === "Valid CSS" ? styles.successText : styles.error}`}>
                  {result}
                </pre>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleValidate} className={styles.actionButton} disabled={loading}>
          {loading ? "Validating..." : "Validate CSS"}
        </button>
      </div>
    </div>
  );
};
export default CssValidatorClient;
