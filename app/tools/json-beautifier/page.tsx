"use client";
import { useState } from "react";
import styles from "../../styles/Tools.module.scss";


export default function JSONBeautifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const beautifyJson = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON Beautifier</h1>
      <p>Format and beautify your JSON data.</p>
      <div className={styles.responsiveRow} style={{maxWidth: 1600, margin: '0 auto'}}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className={styles.inputArea}
          rows={18}
          placeholder="Paste your JSON here..."
          style={{ fontFamily: 'monospace', fontSize: 16, resize: 'vertical', flex: 1, minWidth: 400 }}
        />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minWidth: 120}}>
          <button
            onClick={beautifyJson}
            style={{
              background: '#f90',
              color: '#111',
              fontSize: '1.15rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '0.5em',
              padding: '0.85em 2.1em',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#ffb733')}
            onMouseOut={e => (e.currentTarget.style.background = '#f90')}
            onMouseDown={e => (e.currentTarget.style.background = '#e68a00')}
            onMouseUp={e => (e.currentTarget.style.background = '#ffb733')}
          >
            Beautify
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          className={styles.outputArea}
          rows={18}
          placeholder="Beautified JSON will appear here..."
          style={{ fontFamily: 'monospace', fontSize: 16, resize: 'vertical', flex: 1, minWidth: 400 }}
        />
      </div>
      {error && <div className={styles.error} style={{ marginTop: 24 }}>{error}</div>}
      <style jsx>{`
        @media (max-width: 900px) {
          div[style*='flex-direction: row'] {
            flex-direction: column !important;
            gap: 20px !important;
          }
          div[style*='minWidth: 120'] {
            min-width: 0 !important;
            justify-content: stretch !important;
            margin: 18px 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
