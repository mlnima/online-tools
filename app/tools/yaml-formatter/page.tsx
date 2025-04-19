"use client";
import React, { useState } from "react";

export default function YamlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleFormat() {
    setError("");
    try {
      // Use js-yaml for parsing and dumping
      // @ts-ignore
      const jsyaml = window.jsyaml;
      if (!jsyaml) throw new Error("js-yaml library not loaded");
      const obj = jsyaml.load(input);
      const formatted = jsyaml.dump(obj, { indent: 2 });
      setOutput(formatted);
    } catch (e) {
      setError("Invalid YAML input or formatting error.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>YAML Formatter</h1>
      <p>Coming Soon</p>
    </div>
  );
}
