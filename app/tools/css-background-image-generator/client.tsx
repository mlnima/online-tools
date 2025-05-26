"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CssBackgroundImageGeneratorClient = () => {
  const [url, setUrl] = useState("");
  const [repeat, setRepeat] = useState("no-repeat");
  const [size, setSize] = useState("cover");
  const [position, setPosition] = useState("center center");
  const [output, setOutput] = useState("");

  const generate = () => {
    if (!url) {
      setOutput("");
      return;
    }
    setOutput(`background-image: url('${url}');\nbackground-repeat: ${repeat};\nbackground-size: ${size};\nbackground-position: ${position};`);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Background Image Generator</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="bg-image-url" className={styles.label}>Image URL</label>
          <input
            type="text"
            id="bg-image-url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter image URL..."
            className={styles.inputField} 
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputColumnHalf}>
          <label htmlFor="bg-repeat-select" className={styles.label}>Repeat:</label>
          <select id="bg-repeat-select" value={repeat} onChange={e => setRepeat(e.target.value)} className={styles.primarySelect}>
            <option value="no-repeat">no-repeat</option>
            <option value="repeat">repeat</option>
            <option value="repeat-x">repeat-x</option>
            <option value="repeat-y">repeat-y</option>
          </select>
        </div>
        <div className={styles.inputColumnHalf}>
          <label htmlFor="bg-size-select" className={styles.label}>Size:</label>
          <select id="bg-size-select" value={size} onChange={e => setSize(e.target.value)} className={styles.primarySelect}>
            <option value="cover">cover</option>
            <option value="contain">contain</option>
            <option value="auto">auto</option>
          </select>
        </div>
        <div className={styles.inputColumnHalf}>
          <label htmlFor="bg-position-select" className={styles.label}>Position:</label>
          <select id="bg-position-select" value={position} onChange={e => setPosition(e.target.value)} className={styles.primarySelect}>
            <option value="center center">center center</option>
            <option value="top left">top left</option>
            <option value="top right">top right</option>
            <option value="bottom left">bottom left</option>
            <option value="bottom right">bottom right</option>
          </select>
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={generate} className={styles.actionButton}>Generate CSS</button>
      </div>
      {output && (
        <div className={styles.outputColumn} style={{marginTop: '1rem'}}>
          <label htmlFor="css-output-bg-image" className={styles.label}>Generated CSS Output:</label>
          <textarea 
            id="css-output-bg-image" 
            value={output} 
            readOnly 
            rows={4} 
            className={styles.outputArea} 
          />
        </div>
      )}
    </div>
  );
};
export default CssBackgroundImageGeneratorClient;
