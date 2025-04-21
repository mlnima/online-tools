"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

function generateUUIDv4() {
  // RFC4122 version 4 compliant
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState("");

  function handleGenerate() {
    setUuid(generateUUIDv4());
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>UUID Generator</h1>
      <button onClick={handleGenerate} className={unifiedToolPageStyles.actionButton}>Generate UUID</button>
      <input
        type="text"
        value={uuid}
        readOnly
        className={unifiedToolPageStyles.outputField}
        placeholder="UUID will appear here..."
      />
    </div>
  );
}
