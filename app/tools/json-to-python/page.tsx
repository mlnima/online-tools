"use client";
import React, { useState } from "react";

export default function JsonToPython() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function toPython(val: any): string {
    if (Array.isArray(val)) {
      return '[' + val.map(toPython).join(', ') + ']';
    } else if (typeof val === 'object' && val !== null) {
      return '{' + Object.entries(val).map(([k, v]) => `'${k}': ${toPython(v)}`).join(', ') + '}';
    } else if (typeof val === 'string') {
      return `'${val.replace(/'/g, "\\'")}'`;
    } else if (val === null) {
      return 'None';
    } else if (typeof val === 'boolean') {
      return val ? 'True' : 'False';
    } else {
      return String(val);
    }
  }

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(toPython(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to Python</h1>
      <p>Coming Soon</p>
    </div>
  );
}
