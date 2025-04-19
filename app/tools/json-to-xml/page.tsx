import React, { useState } from "react";

export default function JsonToXml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function toXml(obj: any, tag = "root"): string {
    if (Array.isArray(obj)) {
      return obj.map(item => toXml(item, tag)).join("");
    } else if (typeof obj === 'object' && obj !== null) {
      return `<${tag}>` + Object.entries(obj).map(([k, v]) => toXml(v, k)).join("") + `</${tag}>`;
    } else {
      return `<${tag}>${String(obj)}</${tag}>`;
    }
  }

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(toXml(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to XML</h1>
      <p>Coming Soon</p>
    </div>
  );
}
