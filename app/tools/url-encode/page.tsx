"use client";
import React from "react";

import { useState } from "react";

export default function UrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
  };

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>URL Encode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        className={unifiedToolPageStyles.inputArea}
        placeholder="Enter text to encode..."
      />
      <div className={unifiedToolPageStyles.flexRow}>
        <button onClick={handleEncode} className={unifiedToolPageStyles.actionButton}>Encode</button>
      </div>
      {output && (
        <div className={unifiedToolPageStyles.outputArea}>
          <h3>Encoded Result:</h3>
          <textarea value={output} readOnly rows={2} className={unifiedToolPageStyles.outputArea} />
        </div>
      )}
    </div>
  );
}

