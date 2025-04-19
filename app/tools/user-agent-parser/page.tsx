"use client";
import React, { useState } from "react";

export default function UserAgentParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ browser: string; os: string; device: string } | null>(null);
  const [error, setError] = useState("");

  function handleParse() {
    setError("");
    try {
      // Very basic regex-based parsing for demo
      const ua = input;
      let browser = "Unknown", os = "Unknown", device = "Unknown";
      if (/chrome|crios|crmo/i.test(ua)) browser = "Chrome";
      else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
      else if (/safari/i.test(ua)) browser = "Safari";
      else if (/edg/i.test(ua)) browser = "Edge";
      else if (/opr|opera/i.test(ua)) browser = "Opera";
      else if (/msie|trident/i.test(ua)) browser = "Internet Explorer";
      if (/windows/i.test(ua)) os = "Windows";
      else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
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
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>User Agent Parser</h1>
      <p>Coming Soon</p>
    </div>
  );
}
