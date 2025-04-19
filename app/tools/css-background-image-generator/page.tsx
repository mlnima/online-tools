"use client"
import React from "react";
import styles from "../../styles/ToolPage.module.scss";

import { useState } from "react";

export default function CssBackgroundImageGenerator() {
  const [url, setUrl] = useState("");
  const [repeat, setRepeat] = useState("no-repeat");
  const [size, setSize] = useState("cover");
  const [position, setPosition] = useState("center center");
  const [output, setOutput] = useState("");

  const generate = () => {
    if (!url) return setOutput("");
    setOutput(`background-image: url('${url}');\nbackground-repeat: ${repeat};\nbackground-size: ${size};\nbackground-position: ${position};`);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32 }}>
      <h1>CSS Background Image Generator</h1>
      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Image URL"
        style={{ width: "100%", fontSize: 16, marginBottom: 12, padding: 8 }}
      />
      <div style={{ margin: "12px 0" }}>
        <label>Repeat:
          <select value={repeat} onChange={e => setRepeat(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="no-repeat">no-repeat</option>
            <option value="repeat">repeat</option>
            <option value="repeat-x">repeat-x</option>
            <option value="repeat-y">repeat-y</option>
          </select>
        </label>
        <label style={{ marginLeft: 16 }}>Size:
          <select value={size} onChange={e => setSize(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="cover">cover</option>
            <option value="contain">contain</option>
            <option value="auto">auto</option>
          </select>
        </label>
        <label style={{ marginLeft: 16 }}>Position:
          <select value={position} onChange={e => setPosition(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="center center">center center</option>
            <option value="top left">top left</option>
            <option value="top right">top right</option>
            <option value="bottom left">bottom left</option>
            <option value="bottom right">bottom right</option>
          </select>
        </label>
      </div>
      <div style={{ marginTop: 16 }}>
        <button onClick={generate} className={styles.actionButton}>Generate</button>
      </div>
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>CSS Output:</h3>
          <textarea value={output} readOnly rows={4} style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }} />
        </div>
      )}
    </div>
  );
}

