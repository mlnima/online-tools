"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

export default function UserAgentParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ browser: string; os: string; device: string } | null>(null);
  const [error, setError] = useState("");

  function handleParse() {
    setError("");
    try {
      const ua = input;
      let browser = "Unknown", os = "Unknown", device = "Unknown";
      if (/chrome|crios|crmo/i.test(ua)) browser = "Chrome";
      else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
      else if (/safari/i.test(ua)) browser = "Safari";
      else if (/edge|edg/i.test(ua)) browser = "Edge";
      else if (/opera|opr/i.test(ua)) browser = "Opera";
      if (/windows/i.test(ua)) os = "Windows";
      else if (/macintosh|mac os x/i.test(ua)) os = "Mac OS";
      else if (/linux/i.test(ua)) os = "Linux";
      else if (/android/i.test(ua)) os = "Android";
      else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
      if (/mobile/i.test(ua)) device = "Mobile";
      else if (/tablet/i.test(ua)) device = "Tablet";
      else device = "Desktop";
      setOutput({ browser, os, device });
    } catch (e) {
      setError("Error parsing user agent.");
      setOutput(null);
    }
  }

  return (
    <div className={styles.toolPage}>
      <h1>User Agent Parser</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste user agent string here..."
        className={styles.inputArea}
      />
      <button onClick={handleParse} className={styles.actionButton}>Parse</button>
      {error && <div className={styles.error}>{error}</div>}
      {output && (
        <div className={styles.resultArea} style={{ marginTop: 16 }}>
          <div><strong>Browser:</strong> {output.browser}</div>
          <div><strong>OS:</strong> {output.os}</div>
          <div><strong>Device:</strong> {output.device}</div>
        </div>
      )}
    </div>
  );
}
