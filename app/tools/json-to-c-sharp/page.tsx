import React, { useState } from "react";

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
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to C#</h1>
      <p>Coming Soon</p>
    </div>
  );
}
