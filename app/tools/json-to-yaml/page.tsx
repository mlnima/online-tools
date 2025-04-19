import React, { useState } from "react";
import yaml from "js-yaml";

export default function JsonToYaml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(yaml.dump(obj));
    } catch {
      setError("Invalid JSON or YAML conversion error.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to YAML</h1>
      <p>Coming Soon</p>
    </div>
  );
}
