"use client";
import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import styles from "../../styles/ToolPage.module.scss";

export default function JSONBeautifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const beautifyJson = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

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
      <button onClick={beautifyJson} style={{ padding: "8px 24px", fontSize: 16 }}>Beautify</button>
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
