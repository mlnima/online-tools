"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from '../../styles/UnifiedToolPage.module.scss';
import ComingSoon from "../../components/ComingSoon";

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>XML Minify</h1>
      <ComingSoon />
    </div>
  );
}
