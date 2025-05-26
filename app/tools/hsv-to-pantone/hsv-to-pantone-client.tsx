"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const pantoneTable = [
  { name: "Pantone Yellow", code: "PMS 107", hex: "#FEDD00" },
  { name: "Pantone Red", code: "PMS 186", hex: "#C8102E" },
  { name: "Pantone Green", code: "PMS 354", hex: "#00B140" },
  { name: "Pantone Blue", code: "PMS 285", hex: "#0072CE" },
  { name: "Pantone Orange", code: "PMS 151", hex: "#FF8200" },
  { name: "Pantone Purple", code: "PMS 2685", hex: "#330072" },
  { name: "Pantone Black", code: "PMS Black", hex: "#2D2926" },
  { name: "Pantone White", code: "PMS White", hex: "#FFFFFF" },
  { name: "Pantone Cool Gray 7", code: "PMS Cool Gray 7", hex: "#97999B" },
];

const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
  s /= 100;
  v /= 100;
  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};

const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(x => x + x).join('');
  const num = parseInt(h, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const colorDistance = (a: [number, number, number], b: [number, number, number]): number => {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
    Math.pow(a[1] - b[1], 2) +
    Math.pow(a[2] - b[2], 2)
  );
};

const findClosestPantone = (rgb: [number, number, number]) => {
  let minDist = Infinity;
  let closest = pantoneTable[0];
  for (const p of pantoneTable) {
    const pRgb = hexToRgb(p.hex);
    const dist = colorDistance(rgb, pRgb);
    if (dist < minDist) {
      minDist = dist;
      closest = p;
    }
  }
  return closest;
};

const HsvToPantoneClient = () => {
  const [h, setH] = React.useState(0);
  const [s, setS] = React.useState(0);
  const [v, setV] = React.useState(0);
  const [pantone, setPantone] = React.useState<{name: string, code: string, hex: string} | null>(null);
  const [error, setError] = React.useState("");

  const handleConvert = () => {
    setError("");
    setPantone(null);
    if (isNaN(h) || isNaN(s) || isNaN(v)) {
        setError("Please enter valid numbers for H, S, and V.");
        return;
    }
    if (h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) {
      setError("Invalid range. H: 0-360, S/V: 0-100.");
      return;
    }
    try {
      const rgb = hsvToRgb(h, s, v);
      setPantone(findClosestPantone(rgb));
    } catch (e) {
      setError((e as Error).message || "Error finding Pantone color.");
    }
  };

  const handleCopy = () => {
    if (pantone) navigator.clipboard.writeText(`${pantone.name} (${pantone.code}): ${pantone.hex}`);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HSV to Pantone</h1>
      <div className={styles.hsvInputContainer}>
        <input type="number" min={0} max={360} value={h} onChange={e => setH(Number(e.target.value))} className={`${styles.inputField} ${styles.hsvInput}`} placeholder="H (0-360)" />
        <input type="number" min={0} max={100} value={s} onChange={e => setS(Number(e.target.value))} className={`${styles.inputField} ${styles.hsvInput}`} placeholder="S (0-100)" />
        <input type="number" min={0} max={100} value={v} onChange={e => setV(Number(e.target.value))} className={`${styles.inputField} ${styles.hsvInput}`} placeholder="V (0-100)" />
      </div>
      <button onClick={handleConvert} className={`${styles.actionButton} ${styles.convertButtonMargin}`}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      {pantone && (
        <div className={styles.pantoneResultContainer}>
          <div className={styles.pantoneColorInfo}>
            <div className={styles.pantoneColorPreview} style={{ background: pantone.hex }} />
            <div className={styles.pantoneDetails}>
              <div className={styles.pantoneName}>{pantone.name}</div>
              <div className={styles.pantoneCode}>{pantone.code}</div>
              <div className={styles.pantoneHexValue}>{pantone.hex}</div>
            </div>
          </div>
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default HsvToPantoneClient;
