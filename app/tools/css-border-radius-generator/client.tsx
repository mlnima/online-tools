"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CssBorderRadiusGeneratorClient: React.FC = () => {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);

  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Border Radius Generator</h1>
      <p>Adjust each corner's radius, preview the result, and copy the CSS!</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="tl-radius" className={styles.label}>Top Left Radius (px):</label>
          <input
            type="number"
            id="tl-radius"
            min={0}
            max={128}
            value={tl}
            onChange={e => setTl(Number(e.target.value))}
            className={styles.inputField}
          />
          <label htmlFor="tr-radius" className={styles.label}>Top Right Radius (px):</label>
          <input
            type="number"
            id="tr-radius"
            min={0}
            max={128}
            value={tr}
            onChange={e => setTr(Number(e.target.value))}
            className={styles.inputField}
          />
          <label htmlFor="br-radius" className={styles.label}>Bottom Right Radius (px):</label>
          <input
            type="number"
            id="br-radius"
            min={0}
            max={128}
            value={br}
            onChange={e => setBr(Number(e.target.value))}
            className={styles.inputField}
          />
          <label htmlFor="bl-radius" className={styles.label}>Bottom Left Radius (px):</label>
          <input
            type="number"
            id="bl-radius"
            min={0}
            max={128}
            value={bl}
            onChange={e => setBl(Number(e.target.value))}
            className={styles.inputField}
          />
        </div>
        <div className={styles.outputColumn}>
          <label className={styles.label}>Preview:</label>
          <div
            className={styles.borderRadiusPreview}
            style={{
              borderRadius: `${tl}px ${tr}px ${br}px ${bl}px`,
            }}
          />
          <label htmlFor="css-output" className={styles.label}>Generated CSS:</label>
          <textarea
            id="css-output"
            value={css}
            readOnly
            rows={3}
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleCopy} className={styles.actionButton}>Copy CSS</button>
      </div>
    </div>
  );
};
export default CssBorderRadiusGeneratorClient;
