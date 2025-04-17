"use client";
import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import styles from "../../styles/ToolPage.module.scss";

export default function Base64EncodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleEncode() {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch (e) {
      setOutput("Invalid input");
    }
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 Encode</h1>
      <p>Encode text to Base64 format.</p>
      <MonacoEditor
        height="120px"
        defaultLanguage="plaintext"
        value={input}
        onChange={v => setInput(v || "")}
        theme="vs-dark"
        options={{ minimap: { enabled: false }, fontSize: 16 }}
      />
      <button className={styles.actionButton} onClick={handleEncode}>Encode</button>
      <label>Output:</label>
      <MonacoEditor
        height="120px"
        defaultLanguage="plaintext"
        value={output}
        options={{ readOnly: true, minimap: { enabled: false }, fontSize: 16 }}
        theme="vs-dark"
      />
    </div>
  );
}
