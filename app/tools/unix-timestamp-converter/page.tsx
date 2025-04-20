"use client";
import React, { useState } from "react";
import styles from '../../styles/Tools.module.scss';

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
      {/* UI implementation here, unchanged for now */}
    </div>
  );
}
