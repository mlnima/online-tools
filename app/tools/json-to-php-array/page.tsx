import React, { useState } from "react";

export default function JsonToPhpArray() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function jsonToPhp(val: any): string {
    if (Array.isArray(val)) {
      return 'array(' + val.map(jsonToPhp).join(', ') + ')';
    } else if (typeof val === 'object' && val !== null) {
      return 'array(' + Object.entries(val).map(([k, v]) => `'${k}' => ${jsonToPhp(v)}`).join(', ') + ')';
    } else if (typeof val === 'string') {
      return `'${val.replace(/'/g, "\\'")}'`;
    } else if (val === null) {
      return 'null';
    } else {
      return String(val);
    }
  }

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(jsonToPhp(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to PHP Array</h1>
      <p>Coming Soon</p>
    </div>
  );
}
