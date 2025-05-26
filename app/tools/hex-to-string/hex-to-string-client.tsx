"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const hexToString = (hex: string) => {
  hex = hex.replace(/^0x/, "").replace(/\s+/g, "");
  if (hex.length % 2 !== 0) throw new Error("Hex string must have even length");
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    if (isNaN(code)) throw new Error("Invalid hex digit");
    str += String.fromCharCode(code);
  }
  return str;
};

const HexToStringClient = () => {
  const [hex, setHex] = React.useState("");
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");

  const handleConvert = () => {
    setError("");
    try {
      if (!hex) throw new Error("Hex string required");
      setResult(hexToString(hex));
    } catch (e) {
      setError((e as Error).message || "Error");
      setResult("");
    }
  };

  const handleCopy = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Hex to String</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hex-input" className={styles.label}>Hex Input</label>
          <textarea
            id="hex-input"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className={styles.inputArea}
            placeholder="68656c6c6f20776f726c64"
            rows={3}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="string-output" className={styles.label}>String Output</label>
          <textarea
            id="string-output"
            value={result}
            readOnly
            className={styles.outputArea}
            rows={3}
            placeholder="String output"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {result && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default HexToStringClient;
