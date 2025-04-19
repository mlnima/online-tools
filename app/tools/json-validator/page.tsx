import React, { useState } from "react";

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleValidate() {
    setError(null);
    try {
      JSON.parse(input);
      setResult("Valid JSON");
    } catch (e: any) {
      setResult(null);
      setError("Invalid JSON: " + e.message);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32 }}>
      <h1>JSON Validator</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your JSON here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleValidate} style={{ padding: "8px 24px", fontSize: 16 }}>Validate</button>
      </div>
      {result && (
        <div style={{ marginTop: 24, color: result === "Valid JSON" ? "green" : "red" }}>{result}</div>
      )}
    </div>
  );
}

