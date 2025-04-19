import React, { useState } from "react";

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function formatXml(xml: string) {
    // Basic pretty-print for XML
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\n$2$3');
    let pad = 0;
    xml.split('\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/.+>$/)) {
        indent = 0;
      } else if (node.match(/^<\//)) {
        if (pad !== 0) pad -= 2;
      } else if (node.match(/^<([^!?]+)>$/)) {
        indent = 2;
      } else {
        indent = 0;
      }
      formatted += ' '.repeat(pad) + node + '\n';
      pad += indent;
    });
    return formatted.trim();
  }

  function handleFormat() {
    setError("");
    try {
      const formatted = formatXml(input);
      setOutput(formatted);
    } catch (e) {
      setError("Error formatting XML.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>XML Formatter</h1>
      <p>Coming Soon</p>
    </div>
  );
}
