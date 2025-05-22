"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function decodeJWT(token: string): string {
  const parts = token.split('.');
  if (parts.length < 2) throw new Error("Invalid JWT format");
  let payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  // Pad with = for base64
  while (payload.length % 4 !== 0) payload += '=';
  const decoded = atob(payload);
  try {
    return JSON.stringify(JSON.parse(decoded), null, 2);
  } catch (e) {
    throw new Error("Invalid JWT payload JSON");
  }
}

export default function JwtDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleDecode() {
    setError("");
    try {
      if (!input) {
        setError("Please enter a JWT.");
        setOutput("");
        return;
      }
      setOutput(decodeJWT(input));
    } catch (e: any) {
      setError(e.message || "Error decoding JWT.");
      setOutput("");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JWT Decode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste JWT here..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleDecode} className={styles.actionButton} >Decode</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        placeholder="Decoded JWT payload..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton}  >Copy</button>
      )}
      <div style={{ fontSize: 13, color: 'var(--color-warning)', marginTop: 16 }}>
        Note: This tool does not verify the JWT signature, it only decodes the payload.
      </div>
    </div>
  );
}
