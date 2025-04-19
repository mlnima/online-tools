"use client";
import React, { useState } from "react";

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      const arr = JSON.parse(input);
      if (!Array.isArray(arr) || arr.length === 0 || typeof arr[0] !== 'object') {
        throw new Error();
      }
      const keys = Object.keys(arr[0]);
      const csv = [keys.join(",")].concat(
        arr.map((row: any) => keys.map(k => JSON.stringify(row[k] ?? "")).join(","))
      ).join("\n");
      setOutput(csv);
    } catch {
      setError("Invalid JSON array of objects.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to CSV</h1>
      <p>Coming Soon</p>
    </div>
  );
}
