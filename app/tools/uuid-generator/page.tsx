"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

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
    <div className={styles.toolPage}>
      <h1>UUID Generator</h1>
      <button onClick={handleGenerate} className={styles.actionButton}>Generate UUID</button>
      <input
        type="text"
        value={uuid}
        readOnly
        className={styles.outputArea}
        style={{ marginTop: 16, width: "100%", fontSize: 18 }}
        placeholder="UUID will appear here..."
      />
    </div>
  );
}
