"use client";
import React, { useState } from "react";

const isValidCss = (css: string): boolean => {
  // Simple validation: check for balanced braces and at least one semicolon in each block
  const stack: string[] = [];
  let inBlock = false;
  let hasSemicolon = false;
  for (const char of css) {
    if (char === '{') {
      stack.push('{');
      inBlock = true;
      hasSemicolon = false;
    } else if (char === '}') {
      if (!inBlock || stack.length === 0) return false;
      if (!hasSemicolon) return false;
      stack.pop();
      inBlock = false;
    } else if (char === ';' && inBlock) {
      hasSemicolon = true;
    }
  }
  return stack.length === 0;
};

const CssValidator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleValidate = () => {
    if (isValidCss(input)) {
      setResult("Valid CSS");
    } else {
      setResult("Invalid CSS");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>CSS Validator</h1>
      <p>Check if your CSS is valid (basic validation).</p>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder="Paste your CSS here..."
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleValidate} style={{ padding: "8px 24px", fontSize: 16 }}>Validate</button>
      </div>
      {result && (
        <div style={{ marginTop: 24, color: result === "Valid CSS" ? "green" : "red" }}>{result}</div>
      )}
    </div>
  );
};

export default CssValidator;

