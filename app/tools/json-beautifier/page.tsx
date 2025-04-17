"use client";
import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import styles from "../../styles/ToolPage.module.scss";

export default function JSONBeautifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleBeautify() {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
    } catch (e) {
      setOutput("Invalid JSON");
    }
  }

  return (
    <div className={styles.toolPage}>
      <h1>JSON Beautifier</h1>
      <p>Format and beautify your JSON data.</p>
      <MonacoEditor
        height="120px"
        defaultLanguage="json"
        value={input}
        onChange={v => setInput(v || "")}
        theme="vs-dark"
        options={{ minimap: { enabled: false }, fontSize: 16 }}
      />
      <button className={styles.actionButton} onClick={handleBeautify}>Beautify</button>
      <label>Output:</label>
      <MonacoEditor
        height="120px"
        defaultLanguage="json"
        value={output}
        options={{ readOnly: true, minimap: { enabled: false }, fontSize: 16 }}
        theme="vs-dark"
      />
    </div>
  );
}
