"use client";
import { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function hexToRgb(hex: string) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export default function ColorConverterClient() {
  const [hex, setHex] = useState("#3baaff");
  const rgb = hexToRgb(hex);

  return (
    <div className={styles.toolPage}>
      <h1>Color Converter</h1>
      <p>Convert HEX color to RGB.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hex-color-input" className={styles.label}>HEX Color</label>
          <input 
            type="color" 
            id="hex-color-input-picker" 
            value={hex} 
            onChange={e => setHex(e.target.value)} 
            className={styles.inputColor} 
          />
          <input 
            type="text" 
            id="hex-color-input" 
            value={hex} 
            onChange={e => setHex(e.target.value)} 
            maxLength={7} 
            className={styles.inputField}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="rgb-output-display" className={styles.label}>RGB Output</label>
          <input 
            type="text" 
            id="rgb-output-display" 
            readOnly 
            value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} 
            className={styles.inputField} 
          />
          <span className={styles.colorSwatch} style={{ background: hex }} /> 
        </div>
      </div>
    </div>
  );
}
