"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";
import ComingSoon from "../../components/ComingSoon";

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>YAML Formatter</h1>
      <ComingSoon />
    </div>
  );
}
