"use client";
import React, { useState } from "react";

export default function JsonToTextConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to Text Converter</h1>
      <p>Coming Soon</p>
    </div>
  );
}
