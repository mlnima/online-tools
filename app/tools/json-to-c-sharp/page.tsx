"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

export default function JsonToCSharp() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) throw new Error();
      let result = "public class RootObject\n{";
      for (const key in obj) {
        let jsType = typeof obj[key];
        let csType = "object";
        if (Array.isArray(obj[key])) csType = "List<object>";
        else if (jsType === "number") csType = Number.isInteger(obj[key]) ? "int" : "double";
        else if (jsType === "boolean") csType = "bool";
        else if (jsType === "object") csType = "object";
        else if (jsType === "string") csType = "string";
        result += `\n    public ${csType} ${capitalize(key)} { get; set; }`;
      }
      result += "\n}";
      setOutput(result);
    } catch {
      setError("Invalid JSON object.");
      setOutput("");
    }
  }
  return (
    <div className={toolsStyles.toolPage}>
      <h1>JSON to C#</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste JSON object here..."
        className={toolsStyles.inputArea}
        style={{ width: '100%' }}
      />
      <button onClick={handleConvert} className={toolsStyles.actionButton}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={8}
        placeholder="C# class output..."
        className={toolsStyles.outputArea}
        style={{ width: '100%' }}
      />
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)} className={toolsStyles.actionButton}>Copy</button>
      )}
    </div>
  );
}
