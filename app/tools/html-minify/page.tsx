"use client";
import React from "react";
import toolsStyles from "../../styles/Tools.module.scss";

function minifyHTML(input: string): string {
  // Remove comments
  let output = input.replace(/<!--([\s\S]*?)-->/g, "");
  // Remove whitespace between tags
  output = output.replace(/>\s+</g, "><");
  // Remove leading/trailing whitespace
  output = output.trim();
  // Collapse multiple spaces
  output = output.replace(/\s{2,}/g, " ");
  return output;
}

export default function HtmlMinify() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleMinify() {
    setError("");
    try {
      setOutput(minifyHTML(input));
    } catch (e) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  }
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div>
      <h1>HTML Minify</h1>
      <div className={toolsStyles.responsiveRow}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className={toolsStyles.inputArea}
          rows={5}
          placeholder="Paste HTML here..."
        />
        <textarea
          value={output}
          readOnly
          className={toolsStyles.outputArea}
          rows={5}
          placeholder="Minified output"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleMinify} className={toolsStyles.actionButton} style={{ minWidth: 140, fontSize: 17 }}>Minify</button>
        {output && (
          <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ minWidth: 100, fontSize: 16, marginLeft: 16 }}>Copy Output</button>
        )}
      </div>
      {error && <div className={toolsStyles.error} style={{ marginTop: 16, textAlign: 'center' }}>{error}</div>}
    </div>
  );
}
