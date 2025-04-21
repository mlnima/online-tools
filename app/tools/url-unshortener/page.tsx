"use client";
"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../unifiedToolPageStyles/UnifiedToolPage.module.scss";


export default function UrlUnshortener() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUnshorten() {
    setError("");
    setOutput("");
    setLoading(true);
    try {
      // Use fetch to follow redirects
      const response = await fetch(input, { method: 'HEAD', redirect: 'follow' });
      setOutput(response.url);
    } catch (e) {
      setError("Error unshortening URL (CORS or invalid URL).");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>URL Unshortener</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={2}
        placeholder="Paste short URL here..."
        className={unifiedToolPageStyles.inputArea}
      />
      <button onClick={handleUnshorten} className={unifiedToolPageStyles.actionButton} disabled={loading}>
        {loading ? 'Unshortening...' : 'Unshorten'}
      </button>
      <div className={unifiedToolPageStyles.warning}>
        Note: This tool uses fetch() and may not work for all URLs due to CORS restrictions.
      </div>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={2}
        placeholder="Unshortened URL output..."
        className={unifiedToolPageStyles.outputArea}
      />
    </div>
  );
}
