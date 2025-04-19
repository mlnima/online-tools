"use client";
import React, { useState } from "react";

export default function JsonUrlDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleDecode() {
    setError("");
    try {
      const decoded = decodeURIComponent(input);
      const obj = JSON.parse(decoded);
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setError("Invalid URL-encoded JSON.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON URL Decode</h1>
      <p>Coming Soon</p>
    </div>
  );
}
