"use client";
import React, { useState } from "react";

export default function XmlMinify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleMinify() {
    setError("");
    try {
      // Remove whitespace between tags and newlines
      const minified = input.replace(/>\s+</g, "><").replace(/\n/g, "");
      setOutput(minified);
    } catch (e) {
      setError("Error minifying XML.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>XML Minify</h1>
      <p>Coming Soon</p>
    </div>
  );
}
