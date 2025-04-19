"use client";
import React, { useState } from "react";

export default function YamlMinify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleMinify() {
    setError("");
    try {
      // Remove comments and extra whitespace
      const minified = input
        .split('\n')
        .map(line => line.replace(/#.*/, "").trim())
        .filter(line => line.length > 0)
        .join('\n');
      setOutput(minified);
    } catch (e) {
      setError("Error minifying YAML.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>YAML Minify</h1>
      <p>Coming Soon</p>
    </div>
  );
}
