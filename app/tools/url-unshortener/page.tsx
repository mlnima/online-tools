"use client";
import React, { useState } from "react";

export default function UrlUnshortener() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUnshorten() {
    setError("");
    setOutput("");
    setLoading(true);
    try {
      // Use fetch to follow redirects
      const response = await fetch(input, { method: 'HEAD', redirect: 'follow' });
      setOutput(response.url);
    } catch (e) {
      setError("Error unshortening URL (CORS or invalid URL).");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>URL Unshortener</h1>
      <p>Coming Soon</p>
    </div>
  );
}
