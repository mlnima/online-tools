"use client";
import React, { useState } from "react";

export default function JsonUrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleEncode() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(encodeURIComponent(JSON.stringify(obj)));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON URL Encode</h1>
      <p>Coming Soon</p>
    </div>
  );
}
