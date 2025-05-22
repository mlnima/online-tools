"use client";
import React, { useState } from "react";

function Tree({ data, level = 0 }: { data: any; level?: number }) {
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      return (
        <ul style={{ marginLeft: level * 16 }}>
          {data.map((item, idx) => (
            <li key={idx}><Tree data={item} level={level + 1} /></li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul style={{ marginLeft: level * 16 }}>
          {Object.entries(data).map(([k, v]) => (
            <li key={k}><b>{k}:</b> <Tree data={v} level={level + 1} /></li>
          ))}
        </ul>
      );
    }
  }
  return <span>{String(data)}</span>;
}

export default function JsonViewer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [parsed, setParsed] = useState<any | null>(null);

  function syntaxHighlight(json: string) {
    return json.replace(/(&quot;|\")([^\"]+)\1(?=:)/g, '<span style="color:#a31515">$&</span>')
      .replace(/: ("[^"]*"|'[^']*')/g, ': <span style="color:#0451a5">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span style="color:#008000">$1</span>')
      .replace(/\b(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)\b/g, '<span style="color:#098658">$1</span>');
  }

  function handleView() {
    setError("");
    try {
      const obj = JSON.parse(input);
      const pretty = JSON.stringify(obj, null, 2);
      setOutput(syntaxHighlight(pretty));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }

  function handleParse() {
    setError("");
    setParsed(null);
    try {
      const obj = JSON.parse(input);
      setParsed(obj);
    } catch (e: any) {
      setError(e.message || "Invalid JSON.");
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>JSON Viewer</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your JSON here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleParse}  >View</button>
      </div>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {parsed && (
        <div style={{ marginTop: 24, textAlign: "left", background: "#fafafa", padding: 16, borderRadius: 4, overflowX: "auto" }}>
          <Tree data={parsed} />
        </div>
      )}
    </div>
  );
}

