"use client";
import React, { useState } from "react";

export default function XmlEscapeUnescape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleEscape() {
    setError("");
    try {
      const escaped = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
      setOutput(escaped);
    } catch (e) {
      setError("Error escaping XML.");
      setOutput("");
    }
  }

  function handleUnescape() {
    setError("");
    try {
      const unescaped = input
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&amp;/g, "&");
      setOutput(unescaped);
    } catch (e) {
      setError("Error unescaping XML.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>XML Escape/Unescape</h1>
      <p>Coming Soon</p>
    </div>
  );
}
