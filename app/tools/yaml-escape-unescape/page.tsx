import React, { useState } from "react";

export default function YamlEscapeUnescape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleEscape() {
    setError("");
    try {
      // Escape quotes, backslashes, and newlines
      const escaped = input
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/\"/g, '\\"')
        .replace(/\'/g, "\\'");
      setOutput(escaped);
    } catch (e) {
      setError("Error escaping YAML.");
      setOutput("");
    }
  }

  function handleUnescape() {
    setError("");
    try {
      const unescaped = input
        .replace(/\\n/g, "\n")
        .replace(/\\'/g, "'")
        .replace(/\\\"/g, '"')
        .replace(/\\\\/g, "\\");
      setOutput(unescaped);
    } catch (e) {
      setError("Error unescaping YAML.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>YAML Escape/Unescape</h1>
      <p>Coming Soon</p>
    </div>
  );
}
