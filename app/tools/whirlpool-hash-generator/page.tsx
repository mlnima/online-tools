
"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function WhirlpoolHashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleHash() {
    setError("");
    try {
      // Real Whirlpool hash requires a crypto library.
      // Placeholder: output a fake hash for demo.
      setOutput("[Whirlpool hash would appear here - requires crypto library]");
    } catch (e) {
      setError("Error generating hash.");
      setOutput("");
    }
  }
  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Whirlpool Hash Generator</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text to hash..."
        className={unifiedToolPageStyles.inputArea}

      />
      <button onClick={handleHash} className={unifiedToolPageStyles.actionButton}>Generate Hash</button>
      <div className={unifiedToolPageStyles.warning}>
        This is a placeholder. Real Whirlpool hash requires an external crypto library.
      </div>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="Whirlpool hash output..."
        className={unifiedToolPageStyles.outputArea}

      />
    </div>
  );
}
