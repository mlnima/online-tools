"use client";
import React, { useState } from "react";

const minifyCss = (css: string): string => {
  try {
    // Remove comments
    let minified = css.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, "");
    // Remove whitespace around symbols
    minified = minified.replace(/\s*([{}:;,])\s*/g, "$1");
    // Remove extra spaces, tabs, and newlines
    minified = minified.replace(/\s+/g, " ");
    // Remove unnecessary semicolons and spaces
    minified = minified.replace(/;}/g, "}");
    return minified.trim();
  } catch {
    throw new Error("Invalid CSS input or minification error.");
  }
};

const CssMinify: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleMinify = () => {
    setError(null);
    try {
      setOutput(minifyCss(input));
    } catch (e: any) {
      setError(e.message || "Minification error.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>CSS Minify</h1>
      <p>Minify and compress your CSS code for faster websites.</p>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your CSS here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleMinify} style={{ padding: "8px 24px", fontSize: 16 }}>Minify</button>
      </div>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Minified CSS:</h3>
          <textarea
            value={output}
            readOnly
            rows={10}
            style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
          />
          <button onClick={handleCopy} style={{ marginTop: 8 }}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default CssMinify;

