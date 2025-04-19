"use client";
import React, { useState } from "react";

export default function UrlParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ protocol: string; host: string; pathname: string; search: string; hash: string } | null>(null);
  const [error, setError] = useState("");

  function handleParse() {
    setError("");
    try {
      const url = new URL(input);
      setOutput({
        protocol: url.protocol,
        host: url.host,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      });
    } catch (e) {
      setError("Invalid URL.");
      setOutput(null);
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>URL Parser</h1>
      <p>Coming Soon</p>
    </div>
  );
}
