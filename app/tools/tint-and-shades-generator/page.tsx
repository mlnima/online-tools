"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

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
    <div className={unifiedToolPageStyles.centeredBox}>
      <h1>Tint and Shades Generator</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="#3498db"
        className={`${unifiedToolPageStyles.inputArea} ${unifiedToolPageStyles.swatchInput}`}
        maxLength={7}
      />
      <button onClick={handleGenerate} className={`${unifiedToolPageStyles.actionButton} ${unifiedToolPageStyles.marginLeft8}`}>Generate</button>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      {tints.length > 0 && (
        <div className={unifiedToolPageStyles.marginTop24}>
          <h2 className={unifiedToolPageStyles.heading18}>Tints</h2>
          <div className={unifiedToolPageStyles.flexRowGap}>
            {tints.map(hex => (
              <div key={hex} className={unifiedToolPageStyles.textCenter}>
                <div className={unifiedToolPageStyles.colorSwatch} style={{ background: hex }} />
                <div className={unifiedToolPageStyles.font13}>{hex}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {shades.length > 0 && (
        <div className={unifiedToolPageStyles.marginTop24}>
          <h2 className={unifiedToolPageStyles.heading18}>Shades</h2>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            {shades.map(hex => (
              <div key={hex} className={unifiedToolPageStyles.textCenter}>
                <div className={unifiedToolPageStyles.colorSwatch} style={{ background: hex }} />
                <div className={unifiedToolPageStyles.font13}>{hex}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
