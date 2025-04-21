"use client";
import React from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";
import ComingSoon from "../../components/ComingSoon";

export default function YamlEscapeUnescape() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>YAML Escape/Unescape</h1>
      <ComingSoon />
    </div>
  );
}
