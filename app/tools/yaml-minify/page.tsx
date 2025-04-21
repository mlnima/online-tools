"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

import ComingSoon from "../../components/ComingSoon";

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
    <div className={styles.toolPage}>
      <h1>YAML Minify</h1>
      <ComingSoon />
    </div>
  );
}
