"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  function handleToDate() {
    setError("");
    try {
      if (!timestamp) throw new Error();
      const ms = parseInt(timestamp, 10) * 1000;
      const d = new Date(ms);
      setDate(d.toISOString());
    } catch {
      setError("Invalid timestamp");
      setDate("");
    }
  }

  function handleToTimestamp() {
    setError("");
    try {
      if (!date) throw new Error();
      const ts = Math.floor(new Date(date).getTime() / 1000);
      setTimestamp(ts.toString());
    } catch {
      setError("Invalid date");
      setTimestamp("");
    }
  }

  return (
    <div className={styles.toolPage}>
      <h1>Unix Timestamp Converter</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="timestamp-input" className={styles.label}>Unix Timestamp (seconds)</label>
          <input
            type="text"
            id="timestamp-input"
            value={timestamp}
            onChange={e => setTimestamp(e.target.value)}
            className={styles.inputField}
            placeholder="e.g., 1678886400"
          />
        </div>
        <div className={styles.outputColumn}> {/* Using outputColumn for visual separation */}
          <label htmlFor="date-input" className={styles.label}>Date String (ISO or parsable)</label>
          <input
            type="text"
            id="date-input"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={styles.inputField}
            placeholder="e.g., 2023-03-15T12:00:00Z"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleToDate} className={styles.actionButton}>Convert to Date</button>
        <button onClick={handleToTimestamp} className={styles.actionButton}>Convert to Timestamp</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
