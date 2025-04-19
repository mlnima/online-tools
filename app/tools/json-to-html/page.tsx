import React, { useState } from "react";

function renderHtml(obj: any): JSX.Element {
  if (Array.isArray(obj)) {
    return (
      <ol>
        {obj.map((item, i) => (
          <li key={i}>{renderHtml(item)}</li>
        ))}
      </ol>
    );
  } else if (obj && typeof obj === "object") {
    return (
      <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", margin: "8px 0" }}>
        <tbody>
          {Object.entries(obj).map(([k, v]) => (
            <tr key={k}>
              <th style={{ textAlign: "left", background: "#f8f8f8" }}>{k}</th>
              <td>{renderHtml(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <span>{String(obj)}</span>;
  }
}

export default function JsonToHtml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    setError(null);
    try {
      const obj = JSON.parse(input);
      setOutput(obj);
    } catch (e: any) {
      setError("Invalid JSON.");
      setOutput(null);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>JSON to HTML</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your JSON here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={convert} style={{ padding: "8px 24px", fontSize: 16 }}>Convert</button>
      </div>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>HTML Output:</h3>
          <div style={{ background: "#fafafa", padding: 16, borderRadius: 4, overflowX: "auto" }}>{renderHtml(output)}</div>
        </div>
      )}
    </div>
  );
}

