import React, { useState } from "react";

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
      const ts = Math.floor(new Date(date).getTime() / 1000).toString();
      setTimestamp(ts);
    } catch {
      setError("Invalid date");
      setTimestamp("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Unix Timestamp Converter</h1>
      <p>Coming Soon</p>
    </div>
  );
}
