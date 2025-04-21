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

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#3baaff");
  const rgb = hexToRgb(hex);

  return (
    <div className={styles.toolPage}>
      <h1>Color Converter</h1>
      <p>Convert HEX color to RGB.</p>
      <div className={styles.formRow}>
        <label>HEX:</label>
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} />
        <input type="text" value={hex} onChange={e => setHex(e.target.value)} maxLength={7} />
      </div>
      <div className={styles.result}>
        <span>RGB: <b>{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</b></span>
        <span className={styles.colorSwatch} style={{ background: hex }} />
      </div>
    </div>
  );
}
