"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

const CssBorderRadiusGenerator: React.FC = () => {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);

  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
  };

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>CSS Border Radius Generator</h1>
      <p>Adjust each corner's radius, preview the result, and copy the CSS!</p>
      <div className={unifiedToolPageStyles.flexRow}>
        <div>
          <label>Top Left:</label>
          <input
            type="number"
            min={0}
            max={128}
            value={tl}
            onChange={e => setTl(Number(e.target.value))}
            className={unifiedToolPageStyles.inputArea}
          /> px
        </div>
        <div>
          <label>Top Right:</label>
          <input
            type="number"
            min={0}
            max={128}
            value={tr}
            onChange={e => setTr(Number(e.target.value))}
            className={unifiedToolPageStyles.inputArea}
          /> px
        </div>
        <div>
          <label>Bottom Right:</label>
          <input
            type="number"
            min={0}
            max={128}
            value={br}
            onChange={e => setBr(Number(e.target.value))}
            className={unifiedToolPageStyles.inputArea}
          /> px
        </div>
        <div>
          <label>Bottom Left:</label>
          <input
            type="number"
            min={0}
            max={128}
            value={bl}
            onChange={e => setBl(Number(e.target.value))}
            className={unifiedToolPageStyles.inputArea}
          /> px
        </div>
      </div>
      <div className={unifiedToolPageStyles.previewBox}>
        <div
          className={unifiedToolPageStyles.previewInner}
          style={{
            borderRadius: `${tl}px ${tr}px ${br}px ${bl}px`,
          }}
        />
      </div>
      <div className={unifiedToolPageStyles.marginTop24}>
        <h3>Generated CSS:</h3>
        <textarea
          value={css}
          readOnly
          rows={2}
          className={unifiedToolPageStyles.outputArea}
        />
        <button onClick={handleCopy} className={unifiedToolPageStyles.actionButton}>Copy</button>
      </div>
    </div>
  );
};

export default CssBorderRadiusGenerator;

