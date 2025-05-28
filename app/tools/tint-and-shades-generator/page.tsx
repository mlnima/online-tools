"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function generateTintsAndShades(hex: string) {
  // Validate hex
  let color = hex.trim();
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) throw new Error("Invalid hex color");
  if (color.length === 4) color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
  const rgb = [1, 3, 5].map(i => parseInt(color.substr(i, 2), 16));
  // Generate tints (mix with white)
  const tints = Array.from({length: 5}, (_, i) => {
    const ratio = (i + 1) / 6;
    const tint = rgb.map(c => Math.round(c + (255 - c) * ratio));
    return rgbToHex(tint[0], tint[1], tint[2]);
  });
  // Generate shades (mix with black)
  const shades = Array.from({length: 5}, (_, i) => {
    const ratio = (i + 1) / 6;
    const shade = rgb.map(c => Math.round(c * (1 - ratio)));
    return rgbToHex(shade[0], shade[1], shade[2]);
  });
  return { tints, shades };
}
function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export default function TintAndShadesGenerator() {
  const [input, setInput] = useState("");
  const [tints, setTints] = useState<string[]>([]);
  const [shades, setShades] = useState<string[]>([]);
  const [error, setError] = useState("");

  function handleGenerate() {
    setError("");
    setTints([]);
    setShades([]);
    try {
      const { tints, shades } = generateTintsAndShades(input);
      setTints(tints);
      setShades(shades);
    } catch (e: any) {
      setError(e.message || "Invalid color input");
    }
  }

  return (
    <div className={styles.toolPage}> {/* Changed class */}
      <h1>Tint and Shades Generator</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn} style={{flexGrow: 0}}> {/* Prevent input column from taking too much space */}
          <label htmlFor="hex-input" className={styles.label}>Base Color (HEX)</label>
          <input
            id="hex-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="#3498db"
            className={styles.inputField} // Changed from inputArea, removed swatchInput
            maxLength={7}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.outputColumn}>
        {(tints.length > 0 || shades.length > 0) && (
            <div  className={styles.outputArea}>
              {tints.length > 0 && (
                  <>
                    <h3 className={styles.label}>Tints</h3> {/* Using label class for subheading style */}
                    <div className={styles.swatchContainer}> {/* Added a wrapper for swatches */}
                      {tints.map(hexColor => (
                          <div key={"tint-" + hexColor} className={styles.swatchItem}>
                            <div className={styles.colorSwatch} style={{ background: hexColor }} />
                            <div>{hexColor}</div>
                          </div>
                      ))}
                    </div>
                  </>
              )}
              {shades.length > 0 && (
                  <>
                    <h3 className={styles.label}>Shades</h3> {/* Using label class for subheading style */}
                    <div className={styles.swatchContainer}> {/* Added a wrapper for swatches */}
                      {shades.map(hexColor => (
                          <div key={"shade-" + hexColor} className={styles.swatchItem}>
                            <div className={styles.colorSwatch} style={{ background: hexColor }} />
                            <div>{hexColor}</div>
                          </div>
                      ))}
                    </div>
                  </>
              )}
            </div>
        )}
      </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleGenerate} className={styles.actionButton}>Generate</button>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}


    </div>
  );
}
